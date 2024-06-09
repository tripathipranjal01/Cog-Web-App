import { createReducer, on, Action } from '@ngrx/store';

import * as fromProductionActions from './production.action';
import { ISubModuleResponse } from '../interfaces';
import { IMessageStatus } from 'src/app/shared/interfaces';

export interface ProductionState {
  isAsideVisible: boolean;
  globalSelectedSubModule: number | null;
  modules: Array<ISubModuleResponse>;
  messageStatus: IMessageStatus | null;
}

const initialState: ProductionState = {
  isAsideVisible: false,
  globalSelectedSubModule: null,
  modules: [],
  messageStatus: null,
};
export const _productionReducer = createReducer(
  initialState,
  on(
    fromProductionActions.setProductionAside,
    (state, action): ProductionState => ({
      ...state,
      isAsideVisible: action.isAsideVisible,
    })
  ),
  on(
    fromProductionActions.getProductionModulesSuccess,
    (state, action): ProductionState => {
      return {
        ...state,
        modules: action.modules,
      };
    }
  ),
  on(
    fromProductionActions.setProductionModulePreferenceSuccess,
    (state, action): ProductionState => {
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
    fromProductionActions.setProductionModulePreferenceFailure,
    (state, action): ProductionState => {
      return {
        ...state,
        modules: state.modules.map(module => ({ ...module })),
        messageStatus: { type: 'error', message: action.error },
      };
    }
  ),
  on(
    fromProductionActions.setProductionActiveAction,
    (state, action): ProductionState => {
      return {
        ...state,
        globalSelectedSubModule: action.moduleId,
      };
    }
  ),
  on(fromProductionActions.resetMessageStatus, (state): ProductionState => {
    return {
      ...state,
      messageStatus: null,
    };
  })
);

export function productionReducer(
  state: ProductionState | undefined,
  action: Action
) {
  return _productionReducer(state, action);
}
