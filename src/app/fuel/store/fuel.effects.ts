import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { FuelService } from '../services';

import * as fromStore from '.';
@Injectable()
export class FuelEffects {
  action$ = inject(Actions);
  store = inject(Store);
  fuelService = inject(FuelService);

  loadModules$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromStore.getFuelModules),
      switchMap(() => {
        return this.fuelService.getFuelModules().pipe(
          map(data => fromStore.getFuelModulesSuccess({ modules: data })),
          catchError(error => {
            return of(error);
          })
        );
      })
    );
  });

  setFuelModulePreference$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromStore.setFuelModulePreference),
      switchMap(action => {
        return this.fuelService
          .updateSubModulePreference(action.subModules)
          .pipe(
            map(data => {
              return fromStore.setFuelModulePreferenceSuccess({
                status: data['message'],
                subModules: action.subModules,
              });
            }),
            catchError(error => {
              return of(
                fromStore.setFuelModulePreferenceFailure({
                  error: error.error.message,
                })
              );
            })
          );
      })
    );
  });
}
