import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { FuelService } from '../services';

import * as fromStore from '.';
import { Router } from '@angular/router';
@Injectable()
export class FuelEffects {
  action$ = inject(Actions);
  store = inject(Store);
  fuelService = inject(FuelService);
  router = inject(Router);

  loadModules$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromStore.getFuelModules),
      switchMap(() => {
        return this.fuelService.getFuelModules().pipe(
          map(data => {
            const subModuleButtons = data.flatMap(subModule => {
              if (
                subModule.childSubModules &&
                subModule.childSubModules.length > 0
              ) {
                return subModule.childSubModules;
              } else {
                return subModule;
              }
            });
            return fromStore.getFuelModulesSuccess({
              modules: subModuleButtons,
            });
          }),
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

  getFuelSources$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromStore.getFuelSources),
      switchMap(action => {
        return this.fuelService.getFuelSources(action.siteIds).pipe(
          map(data => fromStore.getFuelSourcesSuccess({ fuelSources: data })),
          catchError(error => {
            return of(error);
          })
        );
      })
    );
  });

  saveAssetFuelRefillRecord$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromStore.saveAssetFuelRefillRecord),
      switchMap(data => {
        return this.fuelService.saveAssetRefuelRecord(data).pipe(
          map(data => fromStore.saveRefuelRecordSuccess({ savedRecord: data })),
          catchError(error => {
            return of(
              fromStore.saveRefuelRecordFailure({
                error: error.error.message,
              })
            );
          })
        );
      }),
      tap(() => this.router.navigate(['/fuel/home']))
    );
  });

  saveTankFuelRefillRecord$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromStore.saveTankFuelRefillRecord),
      switchMap(data => {
        return this.fuelService.saveTankRefuelRecord(data).pipe(
          map(data => fromStore.saveRefuelRecordSuccess({ savedRecord: data })),
          catchError(error => {
            return of(
              fromStore.saveRefuelRecordFailure({
                error: error.error.message,
              })
            );
          })
        );
      }),
      tap(() => this.router.navigate(['/fuel/home']))
    );
  });

  getFuelAssets$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromStore.getFuelAssets),
      switchMap(action => {
        return this.fuelService
          .getAssetDataGroupedByAssetClassName(action.siteIds)
          .pipe(
            map(data => fromStore.getFuelAssetsSuccess({ assets: data })),
            catchError(error => {
              return of(error);
            })
          );
      })
    );
  });

  getDepartmentLocations$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromStore.getDepartemntsAndLocations),
      switchMap(action => {
        return this.fuelService.getDepartmentAndLocations(action.siteIds).pipe(
          map(data =>
            fromStore.getDepartemntsAndLocationsSuccess({
              departmentLocationList: data,
            })
          ),
          catchError(error => {
            return of(error);
          })
        );
      })
    );
  });

  adjustTankValues$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromStore.adjustTankValues),
      switchMap(action => {
        return this.fuelService
          .adjustTankValues(action.fuelSourceId, action.data)
          .pipe(
            map(data =>
              fromStore.adjustTankValuesSuccess({ savedFuelSource: data })
            ),
            catchError(error => {
              return of(
                fromStore.adjustTankValuesFailure({
                  error: error.error.message,
                })
              );
            })
          );
      }),
      tap(() => this.router.navigate(['/fuel/home']))
    );
  });
}
