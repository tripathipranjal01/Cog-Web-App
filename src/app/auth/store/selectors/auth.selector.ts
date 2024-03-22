import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuthStore from '../../store';

export const AUTH_STATE_NAME = 'auth';

export const selectAuthState =
  createFeatureSelector<fromAuthStore.AuthState>(AUTH_STATE_NAME);

export const selectIsAuthenticated = createSelector(selectAuthState, state =>
  state.auth.user ? true : false
);
