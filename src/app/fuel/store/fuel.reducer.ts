import { createReducer, on, Action } from '@ngrx/store';

import * as fromFuelActions from './fuel.action';
import { ISubModuleResponse } from '../interfaces';
import { IMessageStatus } from 'src/app/shared/interfaces';

export interface FuelState {
  isAsideVisible: boolean;
  globalSelectedSubModule: number | null;
  modules: Array<ISubModuleResponse>;
  messageStatus: IMessageStatus | null;
}

const initialState: FuelState = {
  isAsideVisible: false,
  globalSelectedSubModule: null,
  modules: [],
  messageStatus: null,
};
export const _fuelReducer = createReducer(
  initialState,
  on(
    fromFuelActions.setFuelAside,
    (state, action): FuelState => ({
      ...state,
      isAsideVisible: action.isAsideVisible,
    })
  ),
  on(fromFuelActions.getFuelModulesSuccess, (state, action): FuelState => {
    return {
      ...state,
      modules: action.modules,
    };
  }),
  on(
    fromFuelActions.setFuelModulePreferenceSuccess,
    (state, action): FuelState => {
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
    fromFuelActions.setFuelModulePreferenceFailure,
    (state, action): FuelState => {
      return {
        ...state,
        modules: state.modules.map(module => ({ ...module })),
        messageStatus: { type: 'error', message: action.error },
      };
    }
  ),
  on(fromFuelActions.setFuelActiveAction, (state, action): FuelState => {
    return {
      ...state,
      globalSelectedSubModule: action.moduleId,
    };
  }),
  on(fromFuelActions.resetMessageStatus, (state): FuelState => {
    return {
      ...state,
      messageStatus: null,
    };
  })
);

export function fuelReducer(state: FuelState | undefined, action: Action) {
  return _fuelReducer(state, action);
}
