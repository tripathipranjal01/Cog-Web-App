import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  createSite,
  loadSiteById,
  updateSite,
} from 'src/app/configuration/store/configuration.action';
import * as fromConfigurationSelectors from 'src/app/configuration/store/configuration.selector';
import * as fromStore from '../../store';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.scss'],
})
export class SiteDetailsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  siteData: any = {};
  isNewSite = false;

  siteTypes = [
    { label: 'Construction', value: 'Construction' },
    { label: 'Mining', value: 'Mining' },
  ];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(fromStore.setSiteAside({ isAsideVisible: true }));
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isNewSite = id === 'new';
      if (this.isNewSite) {
        this.siteData = {}; // Clear siteData when creating a new site
      } else if (id) {
        this.store.dispatch(loadSiteById({ siteId: id }));
      }
    });

    this.store
      .select(fromConfigurationSelectors.selectSelectedSite)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(site => {
        if (site && !this.isNewSite) {
          this.siteData = { ...site };
        }
      });
  }

  onNext(): void {
    this.isNewSite ? this.createSite() : this.updateSite();
  }

  createSite(): void {
    this.store.dispatch(createSite({ siteData: this.siteData }));
  }

  updateSite(): void {
    const id = this.siteData.id;
    this.store.dispatch(updateSite({ siteId: id, siteData: this.siteData }));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.store.dispatch(fromStore.setSiteAside({ isAsideVisible: false }));
  }
}
