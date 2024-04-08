import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaintenanceStore from '.';

export const MAINTENANCE_STATE_NAME = 'maintenance';

export const selectMaintenanceState =
  createFeatureSelector<fromMaintenanceStore.MaintenanceState>(
    MAINTENANCE_STATE_NAME
  );

export const selectMaintenanceActionView = createSelector(
  selectMaintenanceState,
  state => state.globalActionsView
);

export const selectMaintenanceModules = createSelector(
  selectMaintenanceState,
  state => state.modules
);

export const selectServiceReminders = createSelector(
  selectMaintenanceState,
  state => state.serviceReminders
);
export const selectTotalServiceReminders = createSelector(
  selectMaintenanceState,
  state => state.serviceRemindersCount
);
