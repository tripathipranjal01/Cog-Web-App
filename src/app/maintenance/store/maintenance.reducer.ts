import { createReducer, on, Action } from '@ngrx/store';

import * as fromMaintenanceActions from './maintenance.action';
import { IMaintenanceModuleResponse, IServiceReminder } from '../interfaces';

export interface MaintenanceState {
  isAsideVisible: boolean;
  globalSelectedSubModule: number | null;
  modules: Array<IMaintenanceModuleResponse>;
  serviceReminders: Array<IServiceReminder>;
  serviceRemindersCount: number;
}

const initialState: MaintenanceState = {
  isAsideVisible: false,
  globalSelectedSubModule: null,
  modules: [],
  serviceReminders: [],
  serviceRemindersCount: 0,
};
export const _maintenanceReducer = createReducer(
  initialState,
  on(
    fromMaintenanceActions.setMaintenanceAside,
    (state, action): MaintenanceState => ({
      ...state,
      isAsideVisible: action.isAsideVisible,
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
        serviceRemindersCount: action.totalElements,
      };
    }
  ),
  on(
    fromMaintenanceActions.setMaintenanceActiveAction,
    (state, action): MaintenanceState => {
      return {
        ...state,
        globalSelectedSubModule: action.moduleId,
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
