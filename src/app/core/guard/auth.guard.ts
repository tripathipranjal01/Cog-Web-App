import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../../auth/store';
import { take, map, Observable } from 'rxjs';

export const AuthGuard: CanActivateFn = () => {
  return checkAuth();
};

const checkAuth = (): Observable<boolean> => {
  const state = inject(Store<fromApp.AppState>);
  const router = inject(Router);
  return state.select(fromAuth.selectIsAuthenticated).pipe(
    take(1),
    map((isAuth: boolean) => {
      if (isAuth) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};
