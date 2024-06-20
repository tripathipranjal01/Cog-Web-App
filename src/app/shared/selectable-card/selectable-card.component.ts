import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISelectableCard } from '../interfaces';

@Component({
  selector: 'app-selectable-card',
  templateUrl: 'selectable-card.component.html',
  styleUrls: ['selectable-card.component.scss'],
})
export class SelectableCardComponent {
  @Input({ required: true }) cardData: ISelectableCard;
}
