import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-label-value-card',
  templateUrl: './label-value-card.component.html',
  styleUrls: ['./label-value-card.component.scss'],
})
export class LabelValueCardComponent {
  @Input() title: string | TemplateRef<void>;
  @Input() subtitle?: string;
  @Input() titleColor? = '#585858';
  @Input() subtitleColor? = '#8F8F8F';
  @Input() faIconClass? = 'fa-hashtag';
  @Input() faIconColor? = '#1F60C0';
  @Input() showArrow? = true;
  @Input() showIcon? = true;

  isTemplateRef(value: string | TemplateRef<void>): value is TemplateRef<void> {
    return value instanceof TemplateRef;
  }
}
