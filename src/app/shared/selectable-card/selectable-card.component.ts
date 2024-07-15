import { Component, Input } from '@angular/core';
import { SelectableCardColumn } from '../interfaces';

@Component({
  selector: 'app-selectable-card',
  templateUrl: 'selectable-card.component.html',
  styleUrls: ['selectable-card.component.scss'],
})
export class SelectableCardComponent {
  @Input({ required: true }) columns: SelectableCardColumn[];
  @Input({ required: true }) header: string;
  @Input({ required: true }) isSelected: boolean;
}