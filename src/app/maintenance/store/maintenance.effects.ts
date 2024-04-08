import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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
      ofType(fromStore.loadServiceReminders),
      switchMap(action => {
        return this.maintenanceService
          .getServiceReminders(
            action.pageNumber,
            action.pageSize,
            action.statuses
          )
          .pipe(
            map(data => {
              return fromStore.serviceReminderSuccess({
                serviceReminders: data.data,
                totalElements: data.totalElements,
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

/* concatLatestFrom(() =>
  this.store.select(fromStore.selectServiceReminderPagination)
), */
