import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ProductionService } from '../services';

import * as fromStore from '.';
@Injectable()
export class ProductionEffects {
  action$ = inject(Actions);
  store = inject(Store);
  productionService = inject(ProductionService);

  loadModules$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromStore.getProductionModules),
      switchMap(() => {
        return this.productionService.getProductionModules().pipe(
          map(data => fromStore.getProductionModulesSuccess({ modules: data })),
          catchError(error => {
            return of(error);
          })
        );
      })
    );
  });

  setProductionModulePreference$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromStore.setProductionModulePreference),
      switchMap(action => {
        return this.productionService
          .updateSubModulePreference(action.subModules)
          .pipe(
            map(data => {
              return fromStore.setProductionModulePreferenceSuccess({
                status: data['message'],
                subModules: action.subModules,
              });
            }),
            catchError(error => {
              return of(
                fromStore.setProductionModulePreferenceFailure({
                  error: error.error.message,
                })
              );
            })
          );
      })
    );
  });
}
