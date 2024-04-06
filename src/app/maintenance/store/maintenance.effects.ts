import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { MaintenanceService } from '../services';

import * as fromStore from '.';
@Injectable()
export class MaintenanceEffects {
  action$ = inject(Actions);
  store = inject(Store);
  maintenanceService = inject(MaintenanceService);

  loadModules$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromStore.getMaintenanceModules),
      switchMap(() => {
        return this.maintenanceService.getMaintenanceModules().pipe(
          map(data =>
            fromStore.getMaintenanceModulesSuccess({ modules: data })
          ),
          catchError(error => {
            return of(error);
          })
        );
      })
    );
  });

  loadServiceReminder$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromStore.getServiceReminderStart),
      concatLatestFrom(() =>
        this.store.select(fromStore.selectServiceReminderPagination)
      ),
      switchMap(([action, store]) => {
        return this.maintenanceService
          .getServiceReminders(
            store.pageNumber,
            store.pageSize,
            action.statuses
          )
          .pipe(
            map(data => {
              return fromStore.serviceReminderSuccess({
                serviceReminders: data.data,
                totalElements: data.totalElements,
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                totalPages: data.totalPages,
              });
            }),
            catchError(error => {
              return of(error);
            })
          );
      })
    );
  });
}
