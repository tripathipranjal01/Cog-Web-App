import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';
import { IServiceReminder, IServiceReminderPagination } from '../interfaces';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent implements OnInit, OnDestroy {
  store = inject(Store);
  serviceReminders: Array<IServiceReminder>;
  pagination: IServiceReminderPagination;

  private serviceReminderPaginationSub$: Subscription;
  private serviceReminderSub$: Subscription;

  ngOnInit(): void {
    this.serviceReminderSub$ = this.store
      .select(fromStore.selectServiceReminders)
      .subscribe(data => {
        this.serviceReminders = data;
      });
    this.serviceReminderPaginationSub$ = this.store
      .select(fromStore.selectServiceReminderPagination)
      .subscribe(pagination => {
        this.pagination = pagination;
      });
    this.store.dispatch(
      fromStore.getServiceReminderStart({
        statuses: ['upcoming'],
      })
    );
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.store.dispatch(
      fromStore.updateServiceReminderPagination({
        pageSize: pageEvent.pageSize,
        pageNumber: pageEvent.pageIndex + 1,
      })
    );
    this.store.dispatch(
      fromStore.getServiceReminderStart({
        statuses: ['upcoming'],
      })
    );
  }

  ngOnDestroy(): void {
    if (this.serviceReminderSub$) {
      this.serviceReminderSub$.unsubscribe();
    }
    if (this.serviceReminderPaginationSub$) {
      this.serviceReminderPaginationSub$.unsubscribe();
    }
  }
}
