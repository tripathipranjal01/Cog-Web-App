import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromStore from '../store';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubModulePreferenceRequest } from 'src/app/shared/interfaces';
import { ProductionActionViewTypes, ISubModuleResponse } from '../interfaces';

@Component({
  selector: 'app-home-production',
  templateUrl: './home-production.component.html',
  styleUrls: ['./home-production.component.scss'],
})
export class HomeProductionComponent implements OnInit, OnDestroy {
  store = inject(Store);

  isAsideVisible = false;
  viewTypes: ProductionActionViewTypes[] = ['home', 'map', 'side'];
  currentSelectedView: ProductionActionViewTypes;
  currentSelectedSubModule: number | null;
  modules: Array<ISubModuleResponse> = [];

  private actionViewSub$: Subscription;
  private activeSubModule$: Subscription;
  private productionModulesSub$: Subscription;
  private activeErrorMessage$: Subscription;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actionViewSub$ = this.store
      .select(fromStore.selectIsAsideVisible)
      .subscribe(value => {
        this.isAsideVisible = value;
      });
    this.productionModulesSub$ = this.store
      .select(fromStore.selectProductionModules)
      .subscribe(modules => {
        this.modules = modules;
        this.onDirectSubModuleChange();
      });
    this.store.dispatch(fromStore.getProductionModules());

    this.activeSubModule$ = this.store
      .select(fromStore.selectProductionAction)
      .subscribe(action => {
        this.currentSelectedSubModule = action;
        const currentSubModuleData = this.modules.find(
          subModule => subModule.subModuleId === this.currentSelectedSubModule
        );
        if (currentSubModuleData) {
          this.router.navigate([currentSubModuleData.subModulePath], {
            relativeTo: this.route,
          });
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

  onClickViewChange(event: ProductionActionViewTypes) {
    switch (event) {
      case 'side':
        this.store.dispatch(
          fromStore.setProductionAside({
            isAsideVisible: !this.isAsideVisible,
          })
        );
        break;
    }
  }

  onChangeActionSelection(subModule: ISubModulePreferenceRequest) {
    this.store.dispatch(
      fromStore.setProductionModulePreference({ subModules: [subModule] })
    );
  }

  onChangeSubModule(moduleId: number) {
    this.store.dispatch(fromStore.setProductionActiveAction({ moduleId }));
  }

  ngOnDestroy(): void {
    if (this.actionViewSub$) {
      this.actionViewSub$.unsubscribe();
    }
    if (this.productionModulesSub$) {
      this.productionModulesSub$.unsubscribe();
    }
    if (this.activeSubModule$) {
      this.activeSubModule$.unsubscribe();
    }
    if (this.activeErrorMessage$) {
      this.activeErrorMessage$.unsubscribe();
    }
  }
}
