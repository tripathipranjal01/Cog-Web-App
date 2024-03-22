import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../../interfaces';
import { loginStart, loginSuccess, loginFailure } from '../actions';

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
  on(loginStart, (state): AuthState => ({ ...state, loading: true })),
  on(loginSuccess, (state, action): AuthState => {
    return {
      ...state,
      user: action,
      loaded: true,
      loading: false,
    };
  }),
  on(
    loginFailure,
    (state): AuthState => ({ ...state, loading: false, loaded: false })
  )
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
