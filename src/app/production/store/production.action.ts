import { createAction, props } from '@ngrx/store';
import { ISubModuleResponse } from '../interfaces';
import { ISubModulePreferenceRequest } from 'src/app/shared/interfaces';

const SET_PRODUCTION_ASIDE_VISIBILITY =
  '[Production] Set Production Aside Visibility';

const GET_PRODUCTION_MODULES_START =
  '[Production] Get Production Modules Start';

const GET_PRODUCTION_MODULES_SUCCESS =
  '[Production] Get Production Modules Success';

const SET_PRODUCTION_MODULE_PREFERENCE =
  '[Production] Set Production Module Preference';
const SET_PRODUCTION_MODULE_PREFERENCE_SUCCESS =
  '[Production] Set Production Module Preference Success';
const SET_PRODUCTION_MODULE_PREFERENCE_FAILURE =
  '[Production] Set Production Module Preference Failure';
const SET_PRODUCTION_ACTIVE_ACTION = '[Production] Set Active Action';
const RESET_PRODUCTION_MESSAGE_STATUS = '[Production] Reset message status';

export const setProductionAside = createAction(
  SET_PRODUCTION_ASIDE_VISIBILITY,
  props<{ isAsideVisible: boolean }>()
);

export const getProductionModules = createAction(GET_PRODUCTION_MODULES_START);

export const getProductionModulesSuccess = createAction(
  GET_PRODUCTION_MODULES_SUCCESS,
  props<{ modules: ISubModuleResponse[] }>()
);

export const setProductionModulePreference = createAction(
  SET_PRODUCTION_MODULE_PREFERENCE,
  props<{ subModules: ISubModulePreferenceRequest[] }>()
);

export const setProductionModulePreferenceSuccess = createAction(
  SET_PRODUCTION_MODULE_PREFERENCE_SUCCESS,
  props<{ status: string; subModules: ISubModulePreferenceRequest[] }>()
);

export const setProductionModulePreferenceFailure = createAction(
  SET_PRODUCTION_MODULE_PREFERENCE_FAILURE,
  props<{ error: string }>()
);

export const setProductionActiveAction = createAction(
  SET_PRODUCTION_ACTIVE_ACTION,
  props<{ moduleId: number }>()
);

export const resetMessageStatus = createAction(RESET_PRODUCTION_MESSAGE_STATUS);
