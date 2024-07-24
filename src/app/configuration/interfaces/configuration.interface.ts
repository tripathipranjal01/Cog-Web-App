export interface TimeZone {
  name: string;
  code: string;
}

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

export interface SiteType {
  label: string;
  value: string;
}

export interface SiteStatus {
  label: string;
  value: string;
}

export interface ShiftDTO {
  id: number;
  startTime: string;
  endTime: string;
  sequence: number;
  siteId: number;
}
