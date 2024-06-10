import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { FleetService } from '../services';

import * as fromStore from '.';
@Injectable()
export class FleetEffects {
  action$ = inject(Actions);
  store = inject(Store);
  fleetService = inject(FleetService);

  loadModules$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromStore.getFleetModules),
      switchMap(() => {
        return this.fleetService.getFleetModules().pipe(
          map(data => fromStore.getFleetModulesSuccess({ modules: data })),
          catchError(error => {
            return of(error);
          })
        );
      })
    );
  });

  setFleetModulePreference$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromStore.setFleetModulePreference),
      switchMap(action => {
        return this.fleetService
          .updateSubModulePreference(action.subModules)
          .pipe(
            map(data => {
              return fromStore.setFleetModulePreferenceSuccess({
                status: data['message'],
                subModules: action.subModules,
              });
            }),
            catchError(error => {
              return of(
                fromStore.setFleetModulePreferenceFailure({
                  error: error.error.message,
                })
              );
            })
          );
      })
    );
  });
}
