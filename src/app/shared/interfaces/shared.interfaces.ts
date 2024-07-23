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
  childSubModules?: ISubModuleResponse[];
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

export interface PaginationReqDTO {
  page: number;
  size: number;
  sorting: boolean;
  sortBy: string;
  search: string;
  filters: string[];
}

export interface CardData {
  id: number;
  header: string;
  isSelected: boolean;
  columns: SelectableCardColumn[];
}
