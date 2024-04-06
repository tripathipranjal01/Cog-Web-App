import { createAction, props } from '@ngrx/store';
import {
  MaintenanceActionViewTypes,
  IMaintenanceModuleResponse,
} from '../interfaces';

const SET_MAINTENANCE_ACTION_VIEW = '[Maintenance] Set Maintenance Action View';

const GET_MAINTENANCE_MODULES_START =
  '[Maintenance] Get Maintenance Modules Start';

const GET_MAINTENANCE_MODULES_SUCCESS =
  '[Maintenance] Get Maintenance Modules Success';

const SET_MAINTENANCE_MODULE_PREFERENCE =
  '[Maintenance] Set Maintenance Module Preference';

export const setMaintenanceActionView = createAction(
  SET_MAINTENANCE_ACTION_VIEW,
  props<{ selectedView: MaintenanceActionViewTypes }>()
);

export const getMaintenanceModules = createAction(
  GET_MAINTENANCE_MODULES_START
);

export const getMaintenanceModulesSuccess = createAction(
  GET_MAINTENANCE_MODULES_SUCCESS,
  props<{ modules: IMaintenanceModuleResponse[] }>()
);

export const setMaintenanceModulePreference = createAction(
  SET_MAINTENANCE_MODULE_PREFERENCE,
  props<{ moduleId: number }>()
);
