import { createReducer, on, Action } from '@ngrx/store';

import * as fromMaintenanceActions from './maintenance.action';
import {
  IMaintenanceModuleResponse,
  IServiceReminder,
  IServiceReminderPagination,
} from '../interfaces';

export interface MaintenanceState {
  globalActionsView: string;
  modules: Array<IMaintenanceModuleResponse>;
  serviceReminders: Array<IServiceReminder>;
  serviceReminderPagination: IServiceReminderPagination;
}

const initialState: MaintenanceState = {
  globalActionsView: 'home',
  modules: [],
  serviceReminders: [],
  serviceReminderPagination: {
    pageNumber: 1,
    pageSize: 5,
    totalElements: 0,
    totalPages: 0,
  },
};
export const _maintenanceReducer = createReducer(
  initialState,
  on(
    fromMaintenanceActions.setMaintenanceActionView,
    (state, action): MaintenanceState => ({
      ...state,
      globalActionsView: action.selectedView,
    })
  ),
  on(
    fromMaintenanceActions.getMaintenanceModulesSuccess,
    (state, action): MaintenanceState => {
      return {
        ...state,
        modules: action.modules,
      };
    }
  ),
  on(
    fromMaintenanceActions.setMaintenanceModulePreference,
    (state, action): MaintenanceState => {
      return {
        ...state,
        modules: state.modules.map(module => {
          if (module.subModuleId === action.moduleId) {
            return {
              ...module,
              preferred: !module.preferred,
            };
          }
          return module;
        }),
      };
    }
  ),
  on(
    fromMaintenanceActions.serviceReminderSuccess,
    (state, action): MaintenanceState => {
      return {
        ...state,
        serviceReminders: action.serviceReminders,
        serviceReminderPagination: {
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
        },
      };
    }
  ),
  on(
    fromMaintenanceActions.updateServiceReminderPagination,
    (state, action): MaintenanceState => {
      return {
        ...state,
        serviceReminderPagination: {
          ...state.serviceReminderPagination,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
        },
      };
    }
  )
);

export function maintenanceReducer(
  state: MaintenanceState | undefined,
  action: Action
) {
  return _maintenanceReducer(state, action);
}
