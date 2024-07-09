import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromStore from '../store';

@Component({
  selector: 'app-home-configuration',
  templateUrl: './home-configuration.component.html',
  styleUrls: ['./home-configuration.component.scss'],
})
export class HomeConfigurationComponent implements OnInit, OnDestroy {
  store = inject(Store);

  isAsideVisible = false;
  private isAsideVisibleSub$: Subscription;

  ngOnInit(): void {
    this.isAsideVisibleSub$ = this.store
      .select(fromStore.selectIsAsideVisible)
      .subscribe(value => {
        this.isAsideVisible = value;
      });
  }

  ngOnDestroy(): void {
    if (this.isAsideVisibleSub$) {
      this.isAsideVisibleSub$.unsubscribe();
    }
  }
}
