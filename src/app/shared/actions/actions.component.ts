import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  ISubModuleResponse,
  ISubModulePreferenceRequest,
} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  @Input({ required: true }) availableViews: string[] = [];
  @Input({ required: true }) selectedView: string;
  @Input({ required: true }) selectedSubModule: number | null;
  @Input({ required: true }) modules: Array<ISubModuleResponse>;
  @Output() clickViewChange = new EventEmitter<string>();
  @Output() changeActionSelection =
    new EventEmitter<ISubModulePreferenceRequest>();
  @Output() changeNavigationOnAction = new EventEmitter<number>();

  onViewChange(view: string): void {
    this.selectedView = view;
    this.clickViewChange.emit(this.selectedView);
  }

  onActionSelectionChange(submodule: ISubModuleResponse): void {
    this.changeActionSelection.emit({
      subModuleId: submodule.subModuleId,
      isPreferred: !submodule.preferred,
    });
  }

  onActionNavigate(moduleId: number): void {
    this.changeNavigationOnAction.emit(moduleId);
  }
}
