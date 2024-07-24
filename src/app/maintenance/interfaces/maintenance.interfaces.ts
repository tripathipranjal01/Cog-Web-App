export type MaintenanceActionViewTypes = 'home' | 'map' | 'side';

export type REMINDER_STATUS = 'upcoming' | 'overdue' | 'completed';

export interface IServiceReminder {
  applicableProperty: string;
  assetId: number;
  assetName: string;
  currentReading: number;
  previousReading: number;
  priority: number;
  propertyInterval: string;
  remindBefore: string;
  reminderId: number;
  reminderName: string;
  reminderStatus: REMINDER_STATUS;
  reminderType: number;
  serviceDueIn: number;
  serviceReading: number;
  systemAlert: boolean;
}

export interface IServiceRemindersResponse {
  data: IServiceReminder[];
  totalPages: number;
  pageSize: number;
  totalElements: number;
  pageNumber: number;
}

export type IServiceReminderPagination = Omit<
  IServiceRemindersResponse,
  'data'
>;
