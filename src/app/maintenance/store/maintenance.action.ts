import { createAction, props } from '@ngrx/store';
import {
  MaintenanceActionViewTypes,
  IMaintenanceModuleResponse,
  REMINDER_STATUS,
  IServiceReminder,
} from '../interfaces';

const SET_MAINTENANCE_ACTION_VIEW = '[Maintenance] Set Maintenance Action View';

const GET_MAINTENANCE_MODULES_START =
  '[Maintenance] Get Maintenance Modules Start';

const GET_MAINTENANCE_MODULES_SUCCESS =
  '[Maintenance] Get Maintenance Modules Success';

const SET_MAINTENANCE_MODULE_PREFERENCE =
  '[Maintenance] Set Maintenance Module Preference';
const LOAD_SERVICE_REMINDERS = '[Maintenance] Get Service Reminder Start';
const SERVICE_REMINDER_SUCCESS = '[Maintenance] Get Service Reminder Success';

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
