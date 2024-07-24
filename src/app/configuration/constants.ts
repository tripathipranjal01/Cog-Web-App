import {
  TimeZone,
  SiteType,
  SiteStatus,
} from './interfaces/configuration.interface';

export const timeZones: TimeZone[] = [
  { name: 'Pacific Time (PT)', code: 'PT' },
  { name: 'Mountain Time (MT)', code: 'MT' },
  { name: 'Central Time (CT)', code: 'CT' },
  { name: 'Eastern Time (ET)', code: 'ET' },
  { name: 'Atlantic Time (AT)', code: 'AT' },
];

export const siteTypes: SiteType[] = [
  { label: 'Construction', value: 'Construction' },
  { label: 'Mining', value: 'Mining' },
];

export const siteStatus: SiteStatus[] = [
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
];

export const SHIFT_OPTIONS = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
];
