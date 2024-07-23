export interface TimeZone {
  name: string;
  code: string;
}

export const timeZones: TimeZone[] = [
  { name: 'Pacific Time (PT)', code: 'PT' },
  { name: 'Mountain Time (MT)', code: 'MT' },
  { name: 'Central Time (CT)', code: 'CT' },
  { name: 'Eastern Time (ET)', code: 'ET' },
  { name: 'Atlantic Time (AT)', code: 'AT' },
];

export interface SiteDTO {
  id?: number;
  name: string;
  description: string;
  location: string;
  timeZone: string;
  clientId?: number;
  status: string;
  type: string;
  createdBy?: string;
}

export interface PaginationRes {
  data: SiteDTO[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
