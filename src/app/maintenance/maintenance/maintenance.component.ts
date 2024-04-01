import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromStore from '../store';
import { MaintenanceActionViewTypes } from './interfaces/maintenance.interfaces';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent implements OnInit, OnDestroy {
  store = inject(Store);
  private actionViewSub$: Subscription;
  isAsideVisible = false;
  viewTypes: MaintenanceActionViewTypes[] = ['home', 'map', 'side'];
  currentSelectedView: MaintenanceActionViewTypes;

  ngOnInit(): void {
    this.actionViewSub$ = this.store
      .select(fromStore.selectMaintenanceActionView)
      .subscribe(view => {
        this.currentSelectedView = view as MaintenanceActionViewTypes;
        this.isAsideVisible = view === 'side';
      });
  }

  onClickViewChange(event: MaintenanceActionViewTypes) {
    this.store.dispatch(
      fromStore.setMaintenanceActionView({ selectedView: event })
    );
  }

  ngOnDestroy(): void {
    if (this.actionViewSub$) {
      this.actionViewSub$.unsubscribe();
    }
  }
}
