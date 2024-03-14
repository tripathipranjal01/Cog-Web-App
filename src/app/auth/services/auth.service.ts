import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IAuth, ILogin, User } from '../interfaces';

import { StorageService } from './../../shared/services/storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  localStorageService = inject(StorageService);
  private tokenTimer: NodeJS.Timer;

  login(data: ILogin): Observable<IAuth> {
    return this.http
      .post<IAuth>(`${environment.baseUrl}/auth/login`, data)
      .pipe(catchError(this.handleError));
  }

  handleLogin(data: IAuth): User {
    const expiration = this.calcAuthExpirationDate(data.expiresIn);
    const user = new User(data.role, data.token, expiration);
    this.saveAuthDataToLocalStorage(user);
    this.onSuccessfulAuthentication(expiration);
    return user;
  }

  logout() {
    clearTimeout(this.tokenTimer as unknown as number);
    this.clearAuthDataFromLocalStorage();
  }
  onSuccessfulAuthentication(expiration: Date): void {
    const expiresIn = this.calcAuthExpirationForTimer(expiration);
    this.setAuthTimer(expiresIn);
  }

  getAuthDataFromLocalStorage(): User | null {
    const userData = this.localStorageService.loadAuthInfo();
    if (!userData) {
      return null;
    }
    const userDataString = JSON.parse(userData);
    const user = new User(
      userDataString.role,
      userDataString.token,
      new Date(userDataString.expiration)
    );
    return user;
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }
  private clearAuthDataFromLocalStorage(): void {
    this.localStorageService.clearAuthInfo();
  }
  private saveAuthDataToLocalStorage(user: User): void {
    this.localStorageService.saveAuthInfo(user);
  }

  private calcAuthExpirationDate(millisecsToExpire: number): Date {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + millisecsToExpire);
    return expirationDate;
  }

  private calcAuthExpirationForTimer(expirationDate: Date): number {
    const now = new Date();
    const expiresIn = expirationDate.getTime() - now.getTime();
    return expiresIn;
  }
  private handleError(err: HttpErrorResponse): Observable<never> {
    // just a test ... more could would go here
    return throwError(() => err);
  }
}
