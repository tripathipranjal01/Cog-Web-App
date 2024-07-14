import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigurationService } from '../services'; // Adjust the path as per your actual service location

@Component({
  selector: 'app-home-configuration',
  templateUrl: './home-configuration.component.html',
  styleUrls: ['./home-configuration.component.scss'],
})
export class HomeConfigurationComponent implements OnInit, OnDestroy {
  isAsideVisible = false;
  private isAsideVisibleSub$: Subscription;

  constructor(
    private configService: ConfigurationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isAsideVisibleSub$ = this.configService.isAsideVisible$.subscribe(
      (value: boolean) => {
        this.isAsideVisible = value;
        this.cdr.detectChanges();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.isAsideVisibleSub$) {
      this.isAsideVisibleSub$.unsubscribe();
    }
  }
}
