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
