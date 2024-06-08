import { createAction, props } from '@ngrx/store';
import {
  ISubModuleResponse,
  REMINDER_STATUS,
  IServiceReminder,
} from '../interfaces';
import { ISubModulePreferenceRequest } from 'src/app/shared/interfaces';

const SET_MAINTENANCE_ASIDE_VISIBILITY =
  '[Maintenance] Set Maintenance Aside Visibility';

const GET_MAINTENANCE_MODULES_START =
  '[Maintenance] Get Maintenance Modules Start';

const GET_MAINTENANCE_MODULES_SUCCESS =
  '[Maintenance] Get Maintenance Modules Success';

const SET_MAINTENANCE_MODULE_PREFERENCE =
  '[Maintenance] Set Maintenance Module Preference';
const SET_MAINTENANCE_MODULE_PREFERENCE_SUCCESS =
  '[Maintenance] Set Maintenance Module Preference Success';
const SET_MAINTENANCE_MODULE_PREFERENCE_FAILURE =
  '[Maintenance] Set Maintenance Module Preference Failure';
const LOAD_SERVICE_REMINDERS = '[Maintenance] Get Service Reminder Start';
const SERVICE_REMINDER_SUCCESS = '[Maintenance] Get Service Reminder Success';
const SET_MAINTENANCE_ACTIVE_ACTION = '[Maintenance] Set Active Action';
const RESET_MAINTENANCE_MESSAGE_STATUS = '[Maintenance] Reset message status';

export const setMaintenanceAside = createAction(
  SET_MAINTENANCE_ASIDE_VISIBILITY,
  props<{ isAsideVisible: boolean }>()
);

export const getMaintenanceModules = createAction(
  GET_MAINTENANCE_MODULES_START
);

export const getMaintenanceModulesSuccess = createAction(
  GET_MAINTENANCE_MODULES_SUCCESS,
  props<{ modules: ISubModuleResponse[] }>()
);

export const setMaintenanceModulePreference = createAction(
  SET_MAINTENANCE_MODULE_PREFERENCE,
  props<{ subModules: ISubModulePreferenceRequest[] }>()
);

export const setMaintenanceModulePreferenceSuccess = createAction(
  SET_MAINTENANCE_MODULE_PREFERENCE_SUCCESS,
  props<{ status: string; subModules: ISubModulePreferenceRequest[] }>()
);

export const setMaintenanceModulePreferenceFailure = createAction(
  SET_MAINTENANCE_MODULE_PREFERENCE_FAILURE,
  props<{ error: string }>()
);

export const setMaintenanceActiveAction = createAction(
  SET_MAINTENANCE_ACTIVE_ACTION,
  props<{ moduleId: number }>()
);

export const loadServiceReminders = createAction(
  LOAD_SERVICE_REMINDERS,
  props<{
    pageSize: number;
    pageNumber: number;
    statuses: Array<REMINDER_STATUS>;
  }>()
);

export const serviceReminderSuccess = createAction(
  SERVICE_REMINDER_SUCCESS,
  props<{
    serviceReminders: IServiceReminder[];
    totalElements: number;
  }>()
);

export const resetMessageStatus = createAction(
  RESET_MAINTENANCE_MESSAGE_STATUS
);
