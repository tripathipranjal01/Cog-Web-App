import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromStore from '../store';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubModulePreferenceRequest } from 'src/app/shared/interfaces';
import { FuelActionViewTypes, ISubModuleResponse } from '../interfaces';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdjustTankComponent } from '../refuel/adjust-tank/adjust-tank.component';

@Component({
  selector: 'app-home-fuel',
  templateUrl: './home-fuel.component.html',
  styleUrls: ['./home-fuel.component.scss'],
})
export class HomeFuelComponent implements OnInit, OnDestroy {
  store = inject(Store);

  isAsideVisible = false;
  viewTypes: FuelActionViewTypes[] = ['home', 'map', 'side'];
  currentSelectedView: FuelActionViewTypes;
  currentSelectedSubModule: number | null;
  modules: Array<ISubModuleResponse> = [];

  ref: DynamicDialogRef | undefined;

  private actionViewSub$: Subscription;
  private activeSubModule$: Subscription;
  private fuelModulesSub$: Subscription;
  private activeErrorMessage$: Subscription;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.actionViewSub$ = this.store
      .select(fromStore.selectIsAsideVisible)
      .subscribe(value => {
        this.isAsideVisible = value;
      });
    this.fuelModulesSub$ = this.store
      .select(fromStore.selectFuelModules)
      .subscribe(modules => {
        this.modules = modules;
        this.onDirectSubModuleChange();
      });
    this.store.dispatch(fromStore.getFuelModules());

    this.activeSubModule$ = this.store
      .select(fromStore.selectFuelAction)
      .subscribe(action => {
        this.currentSelectedSubModule = action;
        const currentSubModuleData = this.modules.find(
          subModule => subModule.subModuleId === this.currentSelectedSubModule
        );
        if (currentSubModuleData) {
          if (!currentSubModuleData.popup) {
            this.router.navigate([currentSubModuleData.subModulePath], {
              relativeTo: this.route,
            });
          } else {
            switch (currentSubModuleData.subModulePath) {
              case 'adjust-tank':
                this.openAdjustTankBalance();
            }
          }
        }
      });

    this.activeErrorMessage$ = this.store
      .select(fromStore.selectMessageStatus)
      .subscribe(message => {
        if (message) {
          this.messageService.add({
            key: 'br',
            severity: message.type,
            summary: message.type.toUpperCase(),
            detail: message.message.toLowerCase(),
          });
          this.store.dispatch(fromStore.resetMessageStatus());
        }
      });
  }

  onDirectSubModuleChange() {
    const url = this.route.snapshot.firstChild?.url;
    if (url && url.length > 0) {
      const path = url[0].path;
      const currentSubModuleData = this.modules.find(
        subModule => subModule.subModulePath === path
      );
      if (currentSubModuleData) {
        this.onChangeSubModule(currentSubModuleData.subModuleId);
      } else if (!currentSubModuleData && this.modules.length > 0) {
        this.onChangeSubModule(this.modules[0].subModuleId);
      }
    }
  }

  onClickViewChange(event: FuelActionViewTypes) {
    switch (event) {
      case 'side':
        this.store.dispatch(
          fromStore.setFuelAside({
            isAsideVisible: !this.isAsideVisible,
          })
        );
        break;
    }
  }

  onChangeActionSelection(subModule: ISubModulePreferenceRequest) {
    this.store.dispatch(
      fromStore.setFuelModulePreference({ subModules: [subModule] })
    );
  }

  onChangeSubModule(moduleId: number) {
    this.store.dispatch(fromStore.setFuelActiveAction({ moduleId }));
  }

  openAdjustTankBalance() {
    this.ref = this.dialogService.open(AdjustTankComponent, {
      width: '50vw',
      contentStyle: { overflow: 'auto' },
    });

    this.ref.onClose.subscribe();
  }

  ngOnDestroy(): void {
    if (this.actionViewSub$) {
      this.actionViewSub$.unsubscribe();
    }
    if (this.fuelModulesSub$) {
      this.fuelModulesSub$.unsubscribe();
    }
    if (this.activeSubModule$) {
      this.activeSubModule$.unsubscribe();
    }
    if (this.activeErrorMessage$) {
      this.activeErrorMessage$.unsubscribe();
    }
  }
}
