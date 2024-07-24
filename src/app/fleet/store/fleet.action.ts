import { createAction, props } from '@ngrx/store';
import {
  ISubModulePreferenceRequest,
  ISubModuleResponse,
} from 'src/app/shared/interfaces';

const SET_FLEET_ASIDE_VISIBILITY = '[Fleet] Set Fleet Aside Visibility';

const GET_FLEET_MODULES_START = '[Fleet] Get Fleet Modules Start';

const GET_FLEET_MODULES_SUCCESS = '[Fleet] Get Fleet Modules Success';

const SET_FLEET_MODULE_PREFERENCE = '[Fleet] Set Fleet Module Preference';
const SET_FLEET_MODULE_PREFERENCE_SUCCESS =
  '[Fleet] Set Fleet Module Preference Success';
const SET_FLEET_MODULE_PREFERENCE_FAILURE =
  '[Fleet] Set Fleet Module Preference Failure';
const SET_FLEET_ACTIVE_ACTION = '[Fleet] Set Active Action';
const RESET_FLEET_MESSAGE_STATUS = '[Fleet] Reset message status';

export const setFleetAside = createAction(
  SET_FLEET_ASIDE_VISIBILITY,
  props<{ isAsideVisible: boolean }>()
);

export const getFleetModules = createAction(GET_FLEET_MODULES_START);

export const getFleetModulesSuccess = createAction(
  GET_FLEET_MODULES_SUCCESS,
  props<{ modules: ISubModuleResponse[] }>()
);

export const setFleetModulePreference = createAction(
  SET_FLEET_MODULE_PREFERENCE,
  props<{ subModules: ISubModulePreferenceRequest[] }>()
);

export const setFleetModulePreferenceSuccess = createAction(
  SET_FLEET_MODULE_PREFERENCE_SUCCESS,
  props<{ status: string; subModules: ISubModulePreferenceRequest[] }>()
);

export const setFleetModulePreferenceFailure = createAction(
  SET_FLEET_MODULE_PREFERENCE_FAILURE,
  props<{ error: string }>()
);

export const setFleetActiveAction = createAction(
  SET_FLEET_ACTIVE_ACTION,
  props<{ moduleId: number }>()
);

export const resetMessageStatus = createAction(RESET_FLEET_MESSAGE_STATUS);
