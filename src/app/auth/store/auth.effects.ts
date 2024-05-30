import { Injectable, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './auth.action';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  action$ = inject(Actions);
  authService = inject(AuthService);
  router = inject(Router);
  location = inject(Location);

  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromActions.loginStart),
      exhaustMap(action => {
        return this.authService
          .login({
            username: action.username,
            password: action.password,
          })
          .pipe(
            map(data => {
              const user = this.authService.handleLogin(data);
              return fromActions.loginSuccess(user);
            }),
            catchError(error => {
              return of(fromActions.loginFailure({ error: error.message }));
            })
          );
      })
    );
  });

  autoAuthenticate$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromActions.autoAuthenticate),
      map(() => {
        const user = this.authService.getAuthDataFromLocalStorage();
        if (user && user._expiration && user._expiration > new Date()) {
          this.authService.onSuccessfulAuthentication(user._expiration);
          return fromActions.loginSuccess(user);
        } else {
          return fromActions.loginFailure({ error: 'Login Failed' });
        }
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(fromActions.logout),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  loginRedirect$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(fromActions.loginSuccess),
        map(() => {
          const currentRoute = this.location.path();
          currentRoute === '/auth'
            ? this.router.navigate(['maintenance', 'home'])
            : this.router.navigate([currentRoute]);
        })
      );
    },
    { dispatch: false }
  );
}
