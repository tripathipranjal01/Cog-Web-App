import { Component } from '@angular/core';
@Component({
  selector: 'app-site-main',
  templateUrl: './site-main.component.html',
  styleUrls: ['./site-main.component.scss'],
})
export class SiteMainComponent {
  activeIndex = 0;
  onNextTab(): void {
    this.activeIndex = 1;
  }
  onBackTab(): void {
    this.activeIndex = 0;
  }
  onSaveTab(): void {
    this.activeIndex = 0;
  }
}
