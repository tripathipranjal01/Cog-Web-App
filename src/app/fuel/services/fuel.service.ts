import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  DepartmentLocation,
  FuelAssetData,
  FuelSource,
  RefuelAssetReqObject,
  RefuelRecord,
  RefuelTankReqObject,
} from '../interfaces/fuel.interface';

@Injectable({
  providedIn: 'root',
})
export class FuelService {
  http = inject(HttpClient);

  getFuelSources(siteId: number): Observable<FuelSource[]> {
    const requestUrl = `${environment.baseUrl}/fuel-source/${siteId}`;
    return this.http
      .get<FuelSource[]>(requestUrl)
      .pipe(catchError(this.handleError));
  }

  saveAssetFuelRefillRecord(
    data: RefuelAssetReqObject
  ): Observable<RefuelRecord> {
    const requestUrl = `${environment.baseUrl}/fuel-refill/asset`;
    return this.http
      .post<RefuelRecord>(requestUrl, data)
      .pipe(catchError(this.handleError));
  }

  saveAssetTankRefillRecord(
    data: RefuelTankReqObject
  ): Observable<RefuelRecord> {
    const requestUrl = `${environment.baseUrl}/fuel-refill/tank`;
    return this.http
      .post<RefuelRecord>(requestUrl, data)
      .pipe(catchError(this.handleError));
  }

  getAssetDataGroupedByAssetClassName(
    siteId: number
  ): Observable<{ [assetClassName: string]: FuelAssetData[] }> {
    const requestUrl = `${environment.baseUrl}/fuel-refill/getAssetDataGroupedByAssetClassName/${siteId}`;
    return this.http
      .get<{ [assetClassName: string]: FuelAssetData[] }>(requestUrl)
      .pipe(catchError(this.handleError));
  }

  getDepartmentAndLocations(
    siteId: number
  ): Observable<{ [type: string]: DepartmentLocation[] }> {
    const requestUrl = `${environment.baseUrl}/department-location/${siteId}`;
    return this.http
      .get<{ [type: string]: DepartmentLocation[] }>(requestUrl)
      .pipe(catchError(this.handleError));
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
}
