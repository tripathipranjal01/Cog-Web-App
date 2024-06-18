import { createAction } from '@ngrx/store';

const RESET_CONFIGURATION_MESSAGE_STATUS =
  '[Configuration] Reset message status';

export const resetMessageStatus = createAction(
  RESET_CONFIGURATION_MESSAGE_STATUS
);
