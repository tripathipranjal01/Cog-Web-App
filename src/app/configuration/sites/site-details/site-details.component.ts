import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  loadSiteById,
  updateSite,
} from 'src/app/configuration/store/configuration.action';
import * as fromConfigurationSelectors from 'src/app/configuration/store/configuration.selector';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.scss'],
})
export class SiteDetailsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  siteData: any = {};

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(loadSiteById({ siteId: id }));
      }
    });

    this.store
      .select(fromConfigurationSelectors.selectSelectedSite)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(site => {
        if (site) {
          this.siteData = { ...site };
        }
      });
  }

  updateSite(): void {
    const id = this.siteData.id;
    this.store.dispatch(updateSite({ siteId: id, siteData: this.siteData }));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
