import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';
import { IServiceReminder, REMINDER_STATUS } from '../interfaces';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent implements OnInit, OnDestroy {
  store = inject(Store);
  serviceReminders: Array<IServiceReminder>;
  serviceRemindersCount: number;

  private serviceReminderPaginationSub$: Subscription;
  private serviceReminderSub$: Subscription;

  ngOnInit(): void {
    this.serviceReminderSub$ = this.store
      .select(fromStore.selectServiceReminders)
      .subscribe(data => {
        this.serviceReminders = data;
      });
    this.serviceReminderPaginationSub$ = this.store
      .select(fromStore.selectTotalServiceReminders)
      .subscribe(count => {
        this.serviceRemindersCount = count;
      });
    this.loadServiceReminders(1, 5, ['upcoming']);
  }

  handlePageEvent(pageEvent: PageEvent) {
    const { pageSize, pageIndex } = pageEvent;
    this.loadServiceReminders(pageIndex + 1, pageSize, ['upcoming']);
  }

  loadServiceReminders(
    pageNumber: number,
    pageSize: number,
    statuses: Array<REMINDER_STATUS>
  ) {
    this.store.dispatch(
      fromStore.loadServiceReminders({
        pageNumber,
        pageSize,
        statuses,
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
