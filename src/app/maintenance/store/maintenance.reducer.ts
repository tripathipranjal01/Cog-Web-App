import { createReducer, on, Action } from '@ngrx/store';

import * as fromMaintenanceActions from './maintenance.action';
import { IMaintenanceModuleResponse } from '../interfaces';

export interface MaintenanceState {
  globalActionsView: string;
  modules: Array<IMaintenanceModuleResponse>;
}

const initialState: MaintenanceState = {
  globalActionsView: 'home',
  modules: [],
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
  )
);

export function maintenanceReducer(
  state: MaintenanceState | undefined,
  action: Action
) {
  return _maintenanceReducer(state, action);
}
