import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationReqDTO } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import {
  PaginationRes,
  SiteDTO,
  ShiftDTO,
} from '../interfaces/configuration.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor(private http: HttpClient) {}

  getPaginatedSites(pagination: PaginationReqDTO): Observable<PaginationRes> {
    return this.http.post<PaginationRes>(
      `${environment.baseUrl}/site/get-paginated-sites`,
      pagination
    );
  }
  getAllSites(): Observable<SiteDTO[]> {
    return this.http.get<SiteDTO[]>(`${environment.baseUrl}/site/`);
  }
  createSite(newSite: number): Observable<SiteDTO> {
    return this.http.post<SiteDTO>(`${environment.baseUrl}/site/`, newSite);
  }

  deleteSite(siteId: number): Observable<{ [key: string]: string }> {
    return this.http.delete<{ [key: string]: string }>(
      `${environment.baseUrl}/site/${siteId}`
    );
  }
  getSiteById(siteId: number): Observable<SiteDTO> {
    return this.http.get<SiteDTO>(`${environment.baseUrl}/site/${siteId}`);
  }
  updateSite(siteId: number, siteData: any): Observable<SiteDTO> {
    return this.http.put<SiteDTO>(`${environment.baseUrl}/site/`, siteData);
  }
  getAllShifts(siteId: string): Observable<ShiftDTO[]> {
    return this.http.get<ShiftDTO[]>(
      `${environment.baseUrl}/shift/?siteId=${siteId}`
    );
  }
  deleteShift(shiftId: string): Observable<{ [key: string]: string }> {
    return this.http.delete<{ [key: string]: string }>(
      `${environment.baseUrl}/shifts/${shiftId}`
    );
  }
  createShift(shiftData: any): Observable<ShiftDTO> {
    return this.http.post<ShiftDTO>(`${environment.baseUrl}/shift/`, shiftData);
  }

  updateShift(shiftId: number, shiftData: any): Observable<ShiftDTO> {
    return this.http.put<ShiftDTO>(
      `${environment.baseUrl}/shift/${shiftId}`,
      shiftData
    );
  }
}
