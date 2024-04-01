import { createReducer, on, Action } from '@ngrx/store';

import * as fromMaintenanceActions from './maintenance.action';

export interface MaintenanceState {
  globalActionsView: string;
}

const initialState: MaintenanceState = {
  globalActionsView: 'home',
};
export const _maintenanceReducer = createReducer(
  initialState,
  on(
    fromMaintenanceActions.setMaintenanceActionView,
    (state, action): MaintenanceState => ({
      ...state,
      globalActionsView: action.selectedView,
    })
  )
);

export function maintenanceReducer(
  state: MaintenanceState | undefined,
  action: Action
) {
  return _maintenanceReducer(state, action);
}
