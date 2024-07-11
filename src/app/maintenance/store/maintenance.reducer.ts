import { createReducer, on, Action } from '@ngrx/store';

import * as fromMaintenanceActions from './maintenance.action';
import { IServiceReminder } from '../interfaces';
import { IMessageStatus, ISubModuleResponse } from 'src/app/shared/interfaces';

export interface MaintenanceState {
  isAsideVisible: boolean;
  globalSelectedSubModule: number | null;
  modules: Array<ISubModuleResponse>;
  serviceReminders: Array<IServiceReminder>;
  serviceRemindersCount: number;
  messageStatus: IMessageStatus | null;
}

const initialState: MaintenanceState = {
  isAsideVisible: false,
  globalSelectedSubModule: null,
  modules: [],
  serviceReminders: [],
  serviceRemindersCount: 0,
  messageStatus: null,
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
    fromMaintenanceActions.setMaintenanceModulePreferenceSuccess,
    (state, action): MaintenanceState => {
      return {
        ...state,
        messageStatus: { type: 'success', message: action.status },
        modules: state.modules.map(module => {
          const subModuleChange = action.subModules.find(
            subModule => subModule.subModuleParamId === module.subModuleId
          );
          if (subModuleChange) {
            return {
              ...module,
              preferred: subModuleChange.isPreferred,
            };
          }
          return module;
        }),
      };
    }
  ),
  on(
    fromMaintenanceActions.setMaintenanceModulePreferenceFailure,
    (state, action): MaintenanceState => {
      return {
        ...state,
        modules: state.modules.map(module => ({ ...module })),
        messageStatus: { type: 'error', message: action.error },
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
  ),
  on(fromMaintenanceActions.resetMessageStatus, (state): MaintenanceState => {
    return {
      ...state,
      messageStatus: null,
    };
  })
);

export function maintenanceReducer(
  state: MaintenanceState | undefined,
  action: Action
) {
  return _maintenanceReducer(state, action);
}
