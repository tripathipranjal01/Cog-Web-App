import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  autoAuthenticate,
} from '../actions';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {
  action$ = inject(Actions);
  authService = inject(AuthService);
  router = inject(Router);

  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loginStart),
      exhaustMap(action => {
        return this.authService
          .login({
            email: action.email,
            password: action.password,
            companyName: action.companyName,
          })
          .pipe(
            map(data => {
              const user = this.authService.handleLogin(data);
              return loginSuccess({ user });
            }),
            catchError(error => {
              return of(loginFailure({ error: error.message }));
            })
          );
      })
    );
  });

  autoAuthenticate$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(autoAuthenticate),
        map(() => {
          const user = this.authService.getAuthDataFromLocalStorage();
          if (user && user._expiration && user._expiration > new Date()) {
            this.authService.onSuccessfulAuthentication(user._expiration);
          }
          return;
        })
      );
    },
    { dispatch: false }
  );

  loginRedirect$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(loginSuccess),
        map(() => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
}
