import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  getModules() {
    throw new Error('Method not implemented.');
  }
  private isAsideVisibleSubject = new BehaviorSubject<boolean>(false);
  isAsideVisible$: Observable<boolean> =
    this.isAsideVisibleSubject.asObservable();
  apiUrl: any;

  constructor(private http: HttpClient) {}

  setAsideVisible(visible: boolean): void {
    this.isAsideVisibleSubject.next(visible);
  }

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

  getAllShifts(siteId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.baseUrl}/shifts?siteId=${siteId}`
    );
  }

  createShift(shiftData: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/shift/`, shiftData);
  }

  updateShift(shiftId: string, shiftData: any): Observable<any> {
    return this.http.put<any>(
      `${environment.baseUrl}/shifts/${shiftId}`,
      shiftData
    );
  }

  deleteShift(shiftId: string): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/shifts/${shiftId}`);
  }

  getPaginatedSites(page: number, size: number): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/site/?page=${page}&size=${size}`
    );
  }
}
