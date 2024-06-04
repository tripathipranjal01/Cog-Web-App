import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IMaintenanceModuleResponse } from 'src/app/maintenance/interfaces';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  @Input({ required: true }) availableViews: string[] = [];
  @Input({ required: true }) selectedView: string;
  @Input({ required: true }) selectedSubModule: number | null;
  @Input({ required: true }) modules: Array<IMaintenanceModuleResponse>;
  @Output() clickViewChange = new EventEmitter<string>();
  @Output() changeActionSelection = new EventEmitter<number>();
  @Output() changeNavigationOnAction = new EventEmitter<number>();

  onViewChange(view: string): void {
    this.selectedView = view;
    this.clickViewChange.emit(this.selectedView);
  }

  onActionSelectionChange(moduleId: number): void {
    this.changeActionSelection.emit(moduleId);
  }

  onActionNavigate(moduleId: number): void {
    this.changeNavigationOnAction.emit(moduleId);
  }
}
