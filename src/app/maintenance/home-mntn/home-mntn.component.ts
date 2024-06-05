import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromStore from '../store';
import {
  IMaintenanceModuleResponse,
  MaintenanceActionViewTypes,
} from '../interfaces';
import { IChartData } from 'src/app/shared/chart-card/chart.interface';

@Component({
  selector: 'app-home-mntn',
  templateUrl: './home-mntn.component.html',
  styleUrls: ['./home-mntn.component.scss'],
})
export class HomeMntnComponent implements OnInit, OnDestroy {
  store = inject(Store);

  isAsideVisible = false;
  viewTypes: MaintenanceActionViewTypes[] = ['home', 'map', 'side'];
  currentSelectedView: MaintenanceActionViewTypes;
  currentSelectedSubModule: number | null;
  modules: Array<IMaintenanceModuleResponse> = [];

  private actionViewSub$: Subscription;
  private activeSubModule$: Subscription;
  private maintenanceModulesSub$: Subscription;

  chartData: IChartData = {
    icon: 'fa-solid fa-screwdriver-wrench',
    heading: 'Maintenance Cost',
    subHeading: 'Sub description',
    totalValue: '17,075',
    precentage: '78',
    currentMonth: '1.81',
    ytd: '1.66',
  };

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
      });
    this.activeSubModule$ = this.store
      .select(fromStore.selectMaintenanceAction)
      .subscribe(action => {
        this.currentSelectedSubModule = action;
      });
    this.store.dispatch(fromStore.getMaintenanceModules());
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

  onChangeActionSelection(moduleId: number) {
    this.store.dispatch(fromStore.setMaintenanceModulePreference({ moduleId }));
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
  }
}
