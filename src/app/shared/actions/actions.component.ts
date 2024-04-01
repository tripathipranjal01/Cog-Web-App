import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  @Input({ required: true }) availableViews: string[] = [];
  @Input({ required: true }) selectedView: string;
  @Output() clickViewChange = new EventEmitter<string>();

  onViewChange(): void {
    this.clickViewChange.emit(this.selectedView);
  }
}
