import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginationReqDTO } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import {
  PaginationRes,
  SiteDTO,
  ShiftDTO,
} from '../interfaces/configuration.interface';
import { ApiErrorService } from 'src/app/core/services/api-error.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor(
    private http: HttpClient,
    private apiErrorService: ApiErrorService
  ) {}

  getPaginatedSites(pagination: PaginationReqDTO): Observable<PaginationRes> {
    return this.http
      .post<PaginationRes>(`${environment.baseUrl}/site`, pagination)
      .pipe(catchError(this.apiErrorService.handleError));
  }

  getAllSites(): Observable<SiteDTO[]> {
    return this.http
      .get<SiteDTO[]>(`${environment.baseUrl}/site/`)
      .pipe(catchError(this.apiErrorService.handleError));
  }

  getSiteById(siteId: number): Observable<SiteDTO> {
    return this.http
      .get<SiteDTO>(`${environment.baseUrl}/site/${siteId}`)
      .pipe(catchError(this.apiErrorService.handleError));
  }

  createSite(newSite: SiteDTO): Observable<SiteDTO> {
    return this.http
      .post<SiteDTO>(`${environment.baseUrl}/site/`, newSite)
      .pipe(catchError(this.apiErrorService.handleError));
  }

  updateSite(siteData: SiteDTO): Observable<SiteDTO> {
    return this.http
      .put<SiteDTO>(`${environment.baseUrl}/site/`, siteData)
      .pipe(catchError(this.apiErrorService.handleError));
  }

  deleteSite(siteId: number): Observable<{ [key: string]: string }> {
    return this.http
      .delete<{
        [key: string]: string;
      }>(`${environment.baseUrl}/site/${siteId}`)
      .pipe(catchError(this.apiErrorService.handleError));
  }

  getAllShifts(siteId: string): Observable<ShiftDTO[]> {
    return this.http
      .get<ShiftDTO[]>(`${environment.baseUrl}/shift/?siteId=${siteId}`)
      .pipe(catchError(this.apiErrorService.handleError));
  }

  deleteShift(shiftId: string): Observable<{ [key: string]: string }> {
    return this.http
      .delete<{
        [key: string]: string;
      }>(`${environment.baseUrl}/shift/${shiftId}`)
      .pipe(catchError(this.apiErrorService.handleError));
  }

  createShift(shiftData: any): Observable<ShiftDTO> {
    return this.http
      .post<ShiftDTO>(`${environment.baseUrl}/shift`, shiftData)
      .pipe(catchError(this.apiErrorService.handleError));
  }

  updateShift(shiftId: number, shiftData: any): Observable<ShiftDTO> {
    return this.http
      .put<ShiftDTO>(`${environment.baseUrl}/shift/${shiftId}`, shiftData)
      .pipe(catchError(this.apiErrorService.handleError));
  }
}
