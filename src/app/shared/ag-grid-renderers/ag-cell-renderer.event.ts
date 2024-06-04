import { ICellRendererParams } from 'ag-grid-community';
import { AgCellRendererBase } from './ag-cell-renderer-base';

export interface AgCellRendererEvent {
  type: string;
  params: ICellRendererParams;
  selectedValue?: string;
}

export const AgCellRendererEvent = {
  LINK_EVENT: 'LINK_EVENT',
  REDIRECT_LINK_EVENT: 'REDIRECT_LINK_EVENT',
  VIEW_EVENT: 'VIEW_EVENT',
  EDIT_EVENT: 'EDIT_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
  CREATE_EVENT: 'CREATE_EVENT',
  SHARE_EVENT: 'SHARE_EVENT',
  ACTIVE_EVENT: 'ACTIVE_EVENT',
  STATUS_EVENT: 'STATUS_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  CANCEL_EVENT: 'CANCEL_EVENT',
  EDIT: 'EDIT',
  VIEW: 'VIEW',
  DELETE: 'DELETE',
  CREATE: 'CREATE',
  LINK: 'LINK',
  BUTTON: 'BUTTON',
  ACTIVE: 'ACTIVE',
  STATUS: 'STATUS',
  DOWNLOAD_EVENT: 'DOWNLOAD_EVENT',
  LOCATION: 'LOCATION',
  TRIP_HISTORY: 'TRIP_HISTORY',
  ITEM_EVENT: 'ITEM_EVENT',
  FILL_COLOR: 'FILL_COLOR',
};

export interface AgCellRendererEventHandler {
  context: { componentParent: AgCellRendererEventHandler };
  frameworkComponents: { [key: string]: AgCellRendererBase };
  handleAgRendererEvent(event: AgCellRendererEvent): void;
}
