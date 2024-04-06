import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { MaintenanceService } from '../services';

import * as fromActions from './maintenance.action';
@Injectable()
export class MaintenanceEffects {
  action$ = inject(Actions);
  maintenanceService = inject(MaintenanceService);

  loadModules$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromActions.getMaintenanceModules),
      switchMap(() => {
        return this.maintenanceService.getMaintenanceModules().pipe(
          map(data =>
            fromActions.getMaintenanceModulesSuccess({ modules: data })
          ),
          catchError(error => {
            return of(error);
          })
        );
      })
    );
  });
}
