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
import {
  SiteType,
  SiteStatus,
  siteTypes,
  siteStatus,
} from '../../interfaces/configuration.interface';
import { ConfigurationDataService } from '../../services/configuration-data.service';
import { SiteAsideComponent } from '../site-aside/site-aside.component';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.scss'],
})
export class SiteDetailsComponent implements OnInit, OnDestroy {
  @Output() nextTab = new EventEmitter<void>();
  private destroy$ = new Subject<void>();
  siteData: any = {};
  isNewSite = false;

  siteTypes: SiteType[] = siteTypes;
  siteStatus: SiteStatus[] = siteStatus;

  constructor(
    private configurationService: ConfigurationService,
    private route: ActivatedRoute,
    private router: Router,
    private configDataService: ConfigurationDataService
  ) {}

  ngOnInit(): void {
    this.configDataService.asideComponent = SiteAsideComponent;
    setTimeout(() => {
      this.configDataService.isAsideVisible = true;
    }, 0);
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = params.get('id');
      this.isNewSite = id === 'new';
      this.siteData = this.isNewSite ? {} : this.siteData;
      if (id && !this.isNewSite) {
        this.loadSiteById(Number(id));
      }
    });
  }

  loadSiteById(siteId: number): void {
    this.configurationService
      .getSiteById(siteId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((site: any) => {
        this.siteData = { ...site };
      });
  }

  onBack(): void {
    this.router.navigate(['/configuration/home/site']);
  }

  onNext(): void {
    this.isNewSite ? this.createSite() : this.updateSite();
  }

  createSite(): void {
    this.configurationService
      .createSite(this.siteData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((createdSite: any) => {
        createdSite && createdSite.id
          ? this.router
              .navigate([`/configuration/home/site/${createdSite.id}`])
              .then(() => {
                this.nextTab.emit();
              })
          : console.error('Created site does not have an id');
      });
  }

  updateSite(): void {
    const id = this.siteData.id;
    this.configurationService
      .updateSite(id, this.siteData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.nextTab.emit();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.configDataService.asideComponent = null;
    this.configDataService.isAsideVisible = false;
  }
}
