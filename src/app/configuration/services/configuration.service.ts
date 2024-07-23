import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationReqDTO } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { PaginationRes, SiteDTO } from '../interfaces/configuration.interface';
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
}
