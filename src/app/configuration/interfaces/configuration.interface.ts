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
  createdBy: string;
}

export interface PaginationRes {
  content: SiteDTO[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
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
