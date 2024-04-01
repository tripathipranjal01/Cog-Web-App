import { createAction, props } from '@ngrx/store';
import { MaintenanceActionViewTypes } from '../maintenance/interfaces';

export const SET_MAINTENANCE_ACTION_VIEW =
  '[Maintenance] Set Maintenance Action View';

export const setMaintenanceActionView = createAction(
  SET_MAINTENANCE_ACTION_VIEW,
  props<{ selectedView: MaintenanceActionViewTypes }>()
);
