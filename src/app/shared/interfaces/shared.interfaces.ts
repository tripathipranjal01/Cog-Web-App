export interface IAllModulesResponse {
  moduleId: number;
  moduleName: string;
  sequenceNumber: number;
  moduleIconPath: null;
  moduleType: string;
  subModules: null;
}

export interface ISubModuleResponse {
  subModuleId: number;
  subModuleParamId: number;
  subModuleParamName: string;
  sequenceNumber: number;
  subModuleType: string;
  preferred: boolean;
  icon: string;
  subModulePath: string;
  popup: boolean;
}

export interface ISubModulePreferenceRequest {
  subModuleParamId: number;
  isPreferred: boolean;
}

export interface IMessageStatus {
  type: string;
  message: string;
}

export interface SelectableCardColumn {
  label?: string;
  value: string;
  color?: string;
  styleClass?: string;
}
