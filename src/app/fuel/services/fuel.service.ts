import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import {
  FuelSource,
  RefuelAssetReqObject,
  RefuelRecord,
  RefuelTankReqObject,
  FuelAssetData,
  DepartmentLocation,
} from '../interfaces';
import {
  IAllModulesResponse,
  ISubModulePreferenceRequest,
  ISubModuleResponse,
} from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FuelService {
  http = inject(HttpClient);

  getFuelModules(): Observable<ISubModuleResponse[]> {
    return this.http
      .get<{
        sidebar: IAllModulesResponse[];
      }>(`${environment.baseUrl}/auth/modules`)
      .pipe(
        map(data => data.sidebar),
        map(item => item.filter(modules => modules.moduleName === 'Fuel')),
        switchMap(module => {
          return this.http
            .get<{
              button: ISubModuleResponse[];
            }>(`${environment.baseUrl}/auth/modules/${module[0].moduleId}`)
            .pipe(map(data => data.button));
        }),
        catchError(this.handleError)
      );
  }

  updateSubModulePreference(
    modules: ISubModulePreferenceRequest[]
  ): Observable<{ [status: string]: string }> {
    return this.http
      .get<{
        sidebar: IAllModulesResponse[];
      }>(`${environment.baseUrl}/auth/modules`)
      .pipe(
        map(data => data.sidebar),
        map(item => item.filter(modules => modules.moduleName === 'Fuel')),
        switchMap(module => {
          return this.http
            .patch<{
              [status: string]: string;
            }>(
              `${environment.baseUrl}/auth/modules/${module[0].moduleId}/update-submodule-preference`,
              modules
            )
            .pipe(map(data => data));
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(() => error);
  }

  getFuelSources(siteIds?: number[]): Observable<FuelSource[]> {
    const requestUrl = `${environment.baseUrl}/fuel-source/`;
    const params = this.getSiteIdsHttpParams(siteIds);
    return this.http
      .get<FuelSource[]>(requestUrl, { params: params })
      .pipe(catchError(this.handleError));
  }

  saveAssetRefuelRecord(data: RefuelAssetReqObject): Observable<RefuelRecord> {
    const requestUrl = `${environment.baseUrl}/fuel-refill/asset`;
    return this.http
      .post<RefuelRecord>(requestUrl, data)
      .pipe(catchError(this.handleError));
  }

  saveTankRefuelRecord(data: RefuelTankReqObject): Observable<RefuelRecord> {
    const requestUrl = `${environment.baseUrl}/fuel-refill/tank`;
    return this.http
      .post<RefuelRecord>(requestUrl, data)
      .pipe(catchError(this.handleError));
  }

  getAssetDataGroupedByAssetClassName(
    siteIds?: number[]
  ): Observable<{ [assetClassName: string]: FuelAssetData[] }> {
    const requestUrl = `${environment.baseUrl}/fuel-refill/getAssetDataGroupedByAssetClassName`;
    const params = this.getSiteIdsHttpParams(siteIds);
    return this.http
      .get<{
        [assetClassName: string]: FuelAssetData[];
      }>(requestUrl, { params: params })
      .pipe(catchError(this.handleError));
  }

  getDepartmentAndLocations(
    siteIds?: number[]
  ): Observable<{ [type: string]: DepartmentLocation[] }> {
    const requestUrl = `${environment.baseUrl}/department-location/`;
    const params = this.getSiteIdsHttpParams(siteIds);
    return this.http
      .get<{
        [type: string]: DepartmentLocation[];
      }>(requestUrl, { params: params })
      .pipe(catchError(this.handleError));
  }

  adjustTankValues(
    fuelSourceId: number,
    data: { [key: string]: number }
  ): Observable<FuelSource> {
    const requestUrl = `${environment.dataRestUrl}/fuel-source/${fuelSourceId}`;
    return this.http
      .patch<FuelSource>(requestUrl, data)
      .pipe(catchError(this.handleError));
  }

  getSiteIdsHttpParams(siteIds?: number[]): HttpParams {
    const param = new HttpParams();
    if (siteIds === undefined) {
      return param;
    } else {
      return param.set('siteIds', siteIds.toString());
    }
  }
}
