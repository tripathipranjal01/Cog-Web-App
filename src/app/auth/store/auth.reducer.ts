import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../interfaces';
import * as fromAuthActions from './auth.action';

export interface AuthState {
  user: User | null;
  loaded: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loaded: false,
  loading: false,
};

export const _authReducer = createReducer(
  initialState,
  on(
    fromAuthActions.loginStart,
    (state): AuthState => ({ ...state, loading: true })
  ),
  on(fromAuthActions.loginSuccess, (state, action): AuthState => {
    return {
      ...state,
      user: action,
      loaded: true,
      loading: false,
    };
  }),
  on(
    fromAuthActions.loginFailure,
    (state): AuthState => ({ ...state, loading: false, loaded: false })
  ),
  on(fromAuthActions.logout, (state): AuthState => {
    return {
      ...state,
      user: null,
      loaded: false,
      loading: false,
    };
  })
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
