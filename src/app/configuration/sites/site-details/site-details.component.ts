import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigurationService } from '../../services/configuration.service';
import {
  SiteType,
  SiteStatus,
  SiteDTO,
} from '../../interfaces/configuration.interface';
import { ConfigurationDataService } from '../../services/configuration-data.service';
import { SiteAsideComponent } from '../site-aside/site-aside.component';
import { siteTypes, siteStatus } from '../../constants';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.scss'],
})
export class SiteDetailsComponent implements OnInit, OnDestroy {
  @Output() nextTab = new EventEmitter<void>();
  private destroy$ = new Subject<void>();
  siteForm: FormGroup;
  isNewSite = false;

  siteTypes: SiteType[] = siteTypes;
  siteStatus: SiteStatus[] = siteStatus;

  constructor(
    private fb: FormBuilder,
    private configurationService: ConfigurationService,
    private route: ActivatedRoute,
    private router: Router,
    private configDataService: ConfigurationDataService
  ) {
    this.siteForm = this.fb.group({
      id: [null],
      name: [''],
      description: [''],
      location: [''],
      timeZone: [''],
      clientId: [null],
      status: [''],
      type: [''],
      createdBy: [null],
    });
  }

  ngOnInit(): void {
    this.configDataService.asideComponent = SiteAsideComponent;
    setTimeout(() => {
      this.configDataService.isAsideVisible = true;
    }, 0);
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = params.get('id');
      this.isNewSite = id === 'new';
      this.siteForm.reset();
      if (id && !this.isNewSite) {
        this.loadSiteById(Number(id));
      }
    });
  }

  loadSiteById(siteId: number): void {
    this.configurationService
      .getSiteById(siteId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((site: SiteDTO) => {
        this.siteForm.patchValue(site);
      });
  }

  onBack(): void {
    this.router.navigate(['/configuration/home/site']);
  }

  onNext(): void {
    if (this.siteForm.dirty) {
      this.isNewSite ? this.createSite() : this.updateSite();
    } else {
      this.nextTab.emit();
    }
  }

  createSite(): void {
    this.configurationService
      .createSite(this.siteForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((createdSite: SiteDTO) => {
        if (createdSite && createdSite.id) {
          this.router
            .navigate([`/configuration/home/site/${createdSite.id}`])
            .then(() => {
              this.nextTab.emit();
            });
        } else {
          console.error('Created site does not have an id');
        }
      });
  }

  updateSite(): void {
    this.configurationService
      .updateSite(this.siteForm.value)
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
