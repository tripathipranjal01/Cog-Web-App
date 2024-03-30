import { createAction, props } from '@ngrx/store';

import { User } from '../interfaces';

/* Get Authentication Information */

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const AUTO_AUTHENTICATE = '[Auth] Auto Authenticate';
export const LOGOUT = '[Auth] Logout';

export const loginStart = createAction(
  LOGIN_START,
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(LOGIN_SUCCESS, props<User>());

export const loginFailure = createAction(
  LOGIN_FAIL,
  props<{ error: string }>()
);

export const autoAuthenticate = createAction(AUTO_AUTHENTICATE);

export const logout = createAction(LOGOUT);
