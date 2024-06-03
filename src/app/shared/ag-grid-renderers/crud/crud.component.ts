import { Component } from '@angular/core';
import { AgCellRendererBase } from '../ag-cell-renderer-base';
import { AgCellRendererEvent } from '../ag-cell-renderer.event';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent extends AgCellRendererBase {
  onView(event: MouseEvent) {
    this.sendEvent(AgCellRendererEvent.VIEW_EVENT, event);
  }

  onEdit(event: MouseEvent) {
    this.sendEvent(AgCellRendererEvent.EDIT_EVENT, event);
  }

  onDelete(event: MouseEvent) {
    this.sendEvent(AgCellRendererEvent.DELETE_EVENT, event);
  }
}
