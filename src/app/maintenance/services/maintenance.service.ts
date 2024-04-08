import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import {
  IServiceRemindersResponse,
  REMINDER_STATUS,
  IMaintenanceModuleResponse,
  IAllModulesResponse,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  http = inject(HttpClient);

  getServiceReminders(
    pageNumber: number,
    pageSize: number,
    statuses: Array<REMINDER_STATUS>
  ): Observable<IServiceRemindersResponse> {
    return this.http
      .post<IServiceRemindersResponse>(
        `${environment.baseUrl}/service-reminder`,
        {
          pageNumber,
          pageSize,
          statuses,
        }
      )
      .pipe(catchError(this.handleError));
  }

  getMaintenanceModules(): Observable<IMaintenanceModuleResponse[]> {
    return this.http
      .get<{
        sidebar: IAllModulesResponse[];
      }>(`${environment.baseUrl}/auth/modules`)
      .pipe(
        map(data => data.sidebar),
        map(item =>
          item.filter(modules => modules.moduleName === 'Maintenance')
        ),
        switchMap(module => {
          return this.http
            .get<{
              button: IMaintenanceModuleResponse[];
            }>(`${environment.baseUrl}/auth/modules/${module[0].moduleId}`)
            .pipe(map(data => data.button));
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
}
