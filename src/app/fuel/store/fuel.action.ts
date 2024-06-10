import { createAction, props } from '@ngrx/store';
import { ISubModuleResponse } from '../interfaces';
import { ISubModulePreferenceRequest } from 'src/app/shared/interfaces';

const SET_FUEL_ASIDE_VISIBILITY = '[Fuel] Set Fuel Aside Visibility';

const GET_FUEL_MODULES_START = '[Fuel] Get Fuel Modules Start';

const GET_FUEL_MODULES_SUCCESS = '[Fuel] Get Fuel Modules Success';

const SET_FUEL_MODULE_PREFERENCE = '[Fuel] Set Fuel Module Preference';
const SET_FUEL_MODULE_PREFERENCE_SUCCESS =
  '[Fuel] Set Fuel Module Preference Success';
const SET_FUEL_MODULE_PREFERENCE_FAILURE =
  '[Fuel] Set Fuel Module Preference Failure';
const SET_FUEL_ACTIVE_ACTION = '[Fuel] Set Active Action';
const RESET_FUEL_MESSAGE_STATUS = '[Fuel] Reset message status';

export const setFuelAside = createAction(
  SET_FUEL_ASIDE_VISIBILITY,
  props<{ isAsideVisible: boolean }>()
);

export const getFuelModules = createAction(GET_FUEL_MODULES_START);

export const getFuelModulesSuccess = createAction(
  GET_FUEL_MODULES_SUCCESS,
  props<{ modules: ISubModuleResponse[] }>()
);

export const setFuelModulePreference = createAction(
  SET_FUEL_MODULE_PREFERENCE,
  props<{ subModules: ISubModulePreferenceRequest[] }>()
);

export const setFuelModulePreferenceSuccess = createAction(
  SET_FUEL_MODULE_PREFERENCE_SUCCESS,
  props<{ status: string; subModules: ISubModulePreferenceRequest[] }>()
);

export const setFuelModulePreferenceFailure = createAction(
  SET_FUEL_MODULE_PREFERENCE_FAILURE,
  props<{ error: string }>()
);

export const setFuelActiveAction = createAction(
  SET_FUEL_ACTIVE_ACTION,
  props<{ moduleId: number }>()
);

export const resetMessageStatus = createAction(RESET_FUEL_MESSAGE_STATUS);
