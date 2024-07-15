import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.scss'],
})
export class SiteDetailsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  siteData: any = {};
  isNewSite = false;

  @Output() nextTab = new EventEmitter<void>();

  siteTypes = [
    { label: 'Construction', value: 'Construction' },
    { label: 'Mining', value: 'Mining' },
  ];

  siteStatus = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ];

  constructor(
    private configurationService: ConfigurationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.configurationService.setAsideVisible(true);
    this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      const id = params.get('id');
      this.isNewSite = id === 'new';
      if (this.isNewSite) {
        this.siteData = {};
      } else if (id) {
        this.loadSiteById(id);
      }
    });
  }

  loadSiteById(siteId: string): void {
    this.configurationService
      .getSiteById(siteId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((site: any) => {
        this.siteData = { ...site };
      });
  }

  onNext(): void {
    if (this.isNewSite) {
      this.createSite();
    } else {
      this.updateSite();
    }
  }

  createSite(): void {
    this.configurationService
      .createSite(this.siteData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((createdSite: any) => {
        const newSiteId = createdSite.id;
        this.router
          .navigate(['/configuration/home/site', newSiteId])
          .then(() => {
            this.nextTab.emit();
          });
      });
  }

  updateSite(): void {
    const id = this.siteData.id;
    this.configurationService
      .updateSite(id, this.siteData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.nextTab.emit();
        this.router.navigate(['/configuration/home/sites']);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.configurationService.setAsideVisible(false);
  }
}
