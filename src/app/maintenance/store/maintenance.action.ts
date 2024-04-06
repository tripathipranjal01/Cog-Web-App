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
const GET_SERVICE_REMINDER_START = '[Maintenance] Get Service Reminder Start';
const SERVICE_REMINDER_SUCCESS = '[Maintenance] Get Service Reminder Success';
const UPDATE_SERVICE_REMINDER_PAGINATION = '[Maintenance] Update Pagination';

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

export const getServiceReminderStart = createAction(
  GET_SERVICE_REMINDER_START,
  props<{
    statuses: Array<REMINDER_STATUS>;
  }>()
);

export const serviceReminderSuccess = createAction(
  SERVICE_REMINDER_SUCCESS,
  props<{
    serviceReminders: IServiceReminder[];
    pageSize: number;
    pageNumber: number;
    totalElements: number;
    totalPages: number;
  }>()
);

export const updateServiceReminderPagination = createAction(
  UPDATE_SERVICE_REMINDER_PAGINATION,
  props<{
    pageSize: number;
    pageNumber: number;
  }>()
);
