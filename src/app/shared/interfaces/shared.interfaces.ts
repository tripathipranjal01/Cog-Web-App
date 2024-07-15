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
  subModuleName: string;
  sequenceNumber: number;
  subModuleType: string;
  preferred: boolean;
  icon: string;
  subModulePath: string;
}

export interface ISubModulePreferenceRequest {
  subModuleId: number;
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
