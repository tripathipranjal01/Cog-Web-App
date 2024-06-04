import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AgCellRendererEvent } from './ag-cell-renderer.event';
import { AgCellRendererEventHandler } from './ag-cell-renderer.event';

export abstract class AgCellRendererBase implements ICellRendererAngularComp {
  params: ICellRendererParams;
  contextComponent: AgCellRendererEventHandler;

  editButton = false;
  viewButton = false;
  deleteButton = false;
  activeButton = false;
  isActive = false;
  statusButton = false;
  isStatusActive = false;
  activeStatusButton = false;
  downloadButton = false;
  locationButton = false;
  tripHistoryButton = false;
  itemButton = false;
  fillColorButton = false;

  agInit(params: ICellRendererParams): void {
    this.params = params;
    const context = params.context;

    if (!context || !context.componentParent) {
      throw new Error(
        `Hosting component must implement AgCellRendererEventHandler and have [context] attribute in the template.`
      );
    }

    this.contextComponent = context.componentParent;
    ({
      editButton: this.editButton,
      viewButton: this.viewButton,
      deleteButton: this.deleteButton,
      activeButton: this.activeButton,
      fillColorButton: this.fillColorButton,
      activeStatusButton: this.activeStatusButton,
      statusButton: this.statusButton,
      downloadButton: this.downloadButton,
      locationButton: this.locationButton,
      tripHistoryButton: this.tripHistoryButton,
      itemButton: this.itemButton,
    } = context);

    this.isActive = params.data[context.isActive];
    this.isStatusActive = params.data[context.isStatusActive] === 'ACTIVE';
  }

  sendEvent(type: string, event?: MouseEvent) {
    const rendererEvent: AgCellRendererEvent = {
      type,
      params: this.params,
      selectedValue: event?.toString(),
    };
    this.contextComponent.handleAgRendererEvent(rendererEvent);
    event?.preventDefault();
  }

  sendRedirectEvent(type: string, selectedValue?: string) {
    const rendererEvent: AgCellRendererEvent = {
      type,
      params: this.params,
      selectedValue,
    };
    this.contextComponent.handleAgRendererEvent(rendererEvent);
  }

  refresh(): boolean {
    return false;
  }
}
