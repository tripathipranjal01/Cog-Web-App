import { createReducer, on, Action } from '@ngrx/store';

import * as fromFleetActions from './fleet.action';
import { ISubModuleResponse } from '../interfaces';
import { IMessageStatus } from 'src/app/shared/interfaces';

export interface FleetState {
  isAsideVisible: boolean;
  globalSelectedSubModule: number | null;
  modules: Array<ISubModuleResponse>;
  messageStatus: IMessageStatus | null;
}

const initialState: FleetState = {
  isAsideVisible: false,
  globalSelectedSubModule: null,
  modules: [],
  messageStatus: null,
};
export const _fleetReducer = createReducer(
  initialState,
  on(
    fromFleetActions.setFleetAside,
    (state, action): FleetState => ({
      ...state,
      isAsideVisible: action.isAsideVisible,
    })
  ),
  on(fromFleetActions.getFleetModulesSuccess, (state, action): FleetState => {
    return {
      ...state,
      modules: action.modules,
    };
  }),
  on(
    fromFleetActions.setFleetModulePreferenceSuccess,
    (state, action): FleetState => {
      return {
        ...state,
        messageStatus: { type: 'success', message: action.status },
        modules: state.modules.map(module => {
          const subModuleChange = action.subModules.find(
            subModule => subModule.subModuleId === module.subModuleId
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
    fromFleetActions.setFleetModulePreferenceFailure,
    (state, action): FleetState => {
      return {
        ...state,
        modules: state.modules.map(module => ({ ...module })),
        messageStatus: { type: 'error', message: action.error },
      };
    }
  ),
  on(fromFleetActions.setFleetActiveAction, (state, action): FleetState => {
    return {
      ...state,
      globalSelectedSubModule: action.moduleId,
    };
  }),
  on(fromFleetActions.resetMessageStatus, (state): FleetState => {
    return {
      ...state,
      messageStatus: null,
    };
  })
);

export function fleetReducer(state: FleetState | undefined, action: Action) {
  return _fleetReducer(state, action);
}
