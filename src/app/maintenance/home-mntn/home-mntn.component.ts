import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromStore from '../store';
import { ISubModuleResponse, MaintenanceActionViewTypes } from '../interfaces';
import { IChartData } from 'src/app/shared/chart-card/chart.interface';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubModulePreferenceRequest } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-home-mntn',
  templateUrl: './home-mntn.component.html',
  styleUrls: ['./home-mntn.component.scss'],
})
export class HomeMntnComponent implements OnInit, OnDestroy {
  isAsideVisible = false;
  viewTypes: MaintenanceActionViewTypes[] = ['home', 'map', 'side'];
  currentSelectedView: MaintenanceActionViewTypes;
  currentSelectedSubModule: number | null;
  modules: Array<ISubModuleResponse> = [];

  private actionViewSub$: Subscription;
  private activeSubModule$: Subscription;
  private maintenanceModulesSub$: Subscription;
  private activeErrorMessage$: Subscription;

  chartData: IChartData = {
    icon: 'fa-solid fa-screwdriver-wrench',
    heading: 'Maintenance Cost',
    subHeading: 'Sub description',
    totalValue: '17,075',
    percentage: '78',
    currentMonth: '1.81',
    ytd: '1.66',
  };

  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.actionViewSub$ = this.store
      .select(fromStore.selectIsAsideVisible)
      .subscribe(value => {
        this.isAsideVisible = value;
      });

    this.maintenanceModulesSub$ = this.store
      .select(fromStore.selectMaintenanceModules)
      .subscribe(modules => {
        this.modules = modules;
        this.onDirectSubModuleChange();
      });
    this.store.dispatch(fromStore.getMaintenanceModules());

    this.activeSubModule$ = this.store
      .select(fromStore.selectMaintenanceAction)
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

  onClickViewChange(event: MaintenanceActionViewTypes) {
    switch (event) {
      case 'side':
        this.store.dispatch(
          fromStore.setMaintenanceAside({
            isAsideVisible: !this.isAsideVisible,
          })
        );
        break;
    }
  }

  onChangeActionSelection(subModule: ISubModulePreferenceRequest) {
    this.store.dispatch(
      fromStore.setMaintenanceModulePreference({ subModules: [subModule] })
    );
  }

  onChangeSubModule(moduleId: number) {
    this.store.dispatch(fromStore.setMaintenanceActiveAction({ moduleId }));
  }

  ngOnDestroy(): void {
    if (this.actionViewSub$) {
      this.actionViewSub$.unsubscribe();
    }
    if (this.maintenanceModulesSub$) {
      this.maintenanceModulesSub$.unsubscribe();
    }
    if (this.activeSubModule$) {
      this.activeSubModule$.unsubscribe();
    }
    if (this.activeErrorMessage$) {
      this.activeErrorMessage$.unsubscribe();
    }
  }
}
