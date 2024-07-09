import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor(private http: HttpClient) {}

  getAllSites(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/site/`);
  }

  getSiteById(siteId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/site/${siteId}`);
  }

  updateSite(siteId: any, siteData: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/site/`, siteData);
  }

  createSite(newSite: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/site/`, newSite);
  }

  deleteSite(siteId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/site/${siteId}`);
  }
}
