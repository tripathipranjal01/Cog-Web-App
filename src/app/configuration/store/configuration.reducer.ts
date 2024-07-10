import { Action, createReducer, on } from '@ngrx/store';
import { IMessageStatus } from 'src/app/shared/interfaces';
import * as fromConfigurationActions from './configuration.action';

export interface ConfigurationState {
  messageStatus: IMessageStatus | null;
}

const initialState: ConfigurationState = {
  messageStatus: null,
};

export const _configurationReducer = createReducer(
  initialState,
  on(
    fromConfigurationActions.resetMessageStatus,
    (state): ConfigurationState => {
      return {
        ...state,
        messageStatus: null,
      };
    }
  )
);

export function configurationReducer(
  state: ConfigurationState | undefined,
  action: Action
) {
  return _configurationReducer(state, action);
}
