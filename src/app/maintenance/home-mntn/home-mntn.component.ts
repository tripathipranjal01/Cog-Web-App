import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromStore from '../store';
import {
  IMaintenanceModuleResponse,
  MaintenanceActionViewTypes,
} from '../interfaces';

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
  modules: Array<IMaintenanceModuleResponse> = [];

  private actionViewSub$: Subscription;
  private maintenanceModulesSub$: Subscription;

  ngOnInit(): void {
    this.actionViewSub$ = this.store
      .select(fromStore.selectMaintenanceActionView)
      .subscribe(view => {
        this.currentSelectedView = view as MaintenanceActionViewTypes;
        this.isAsideVisible = view === 'side';
      });
    this.maintenanceModulesSub$ = this.store
      .select(fromStore.selectMaintenanceModules)
      .subscribe(modules => {
        this.modules = modules;
      });
    this.store.dispatch(fromStore.getMaintenanceModules());
  }

  onClickViewChange(event: MaintenanceActionViewTypes) {
    this.store.dispatch(
      fromStore.setMaintenanceActionView({ selectedView: event })
    );
  }

  onChangeActionSelection(moduleId: number) {
    this.store.dispatch(fromStore.setMaintenanceModulePreference({ moduleId }));
  }

  ngOnDestroy(): void {
    if (this.actionViewSub$) {
      this.actionViewSub$.unsubscribe();
    }
    if (this.maintenanceModulesSub$) {
      this.maintenanceModulesSub$.unsubscribe();
    }
  }
}