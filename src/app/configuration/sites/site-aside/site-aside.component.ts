import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ConfigurationService } from '../../services';
import { CardData, SelectableCardColumn } from '../../../shared/interfaces';
import { TimeZone, SiteDTO } from '../../interfaces/configuration.interface';
import { timeZones } from '../../constants';
@Component({
  selector: 'app-site-aside',
  templateUrl: './site-aside.component.html',
  styleUrls: ['./site-aside.component.scss'],
})
export class SiteAsideComponent implements OnInit, OnDestroy {
  filterSite = '';
  selectedSite: CardData | null = null;
  updatedData: CardData[] = [];
  backupData: CardData[] = [];
  newSiteForm: FormGroup;
  isLoading = false;
  timeZones: TimeZone[] = timeZones;
  private subscribe$ = new Subject<void>();

  constructor(
    private configurationService: ConfigurationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadSites();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.subscribe$)
      )
      .subscribe(() => {
        if (!this.router.url.includes('/configuration/home/site/')) {
          this.deselectAllSites();
        } else {
          this.selectSiteFromUrl();
        }
      });
  }

  ngOnDestroy(): void {
    this.subscribe$.next();
    this.subscribe$.complete();
  }

  private initializeForm(): void {
    this.newSiteForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      timeZone: [null, Validators.required],
      type: ['', Validators.required],
    });
  }

  private loadSites(): void {
    this.isLoading = true;
    this.configurationService
      .getAllSites()
      .pipe(takeUntil(this.subscribe$))
      .subscribe(
        (data: SiteDTO[]) => {
          const newCards: CardData[] = data
            .filter((item: SiteDTO) => item.id !== undefined)
            .map((item: SiteDTO) => ({
              id: item.id as number,
              header: item.name,
              isSelected: false,
              columns: [
                { label: 'Location', value: item.location || '' },
                {
                  label: 'Status',
                  value: item.status || '',
                  color: item.status ? '#47C759' : '#FF6961',
                  styleClass: 'indicator',
                },
                { label: 'Created By', value: item.createdBy || '' },
              ],
            }));
          this.updatedData = newCards;
          this.backupData = [...newCards];
          this.selectSiteFromUrl();
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  private selectSiteFromUrl(): void {
    const urlSegments = this.router.url.split('/');
    const siteIdIndex = urlSegments.indexOf('site') + 1;
    if (siteIdIndex > 0 && urlSegments[siteIdIndex]) {
      const siteId = parseInt(urlSegments[siteIdIndex], 10);
      this.selectSiteById(siteId);
    }
  }

  private selectSiteById(siteId: number): void {
    this.updatedData.forEach(card => {
      card.isSelected = card.id === siteId;
      if (card.isSelected) {
        this.selectedSite = card;
      }
    });
  }

  private deselectAllSites(): void {
    if (this.selectedSite) {
      this.selectedSite.isSelected = false;
      this.selectedSite = null;
    }
  }

  addNewSite(): void {
    if (this.selectedSite) {
      this.selectedSite.isSelected = false;
      this.selectedSite = null;
    }
    this.router.navigate(['configuration/home/site', 'new']);
  }

  onSubmit(): void {
    if (this.newSiteForm.valid) {
      this.isLoading = true;
      const newSite = this.newSiteForm.value;
      this.configurationService
        .createSite(newSite)
        .pipe(takeUntil(this.subscribe$))
        .subscribe(
          () => {
            this.loadSites();
            this.isLoading = false;
          },
          () => {
            this.isLoading = false;
          }
        );
    }
  }

  updateSite(selectedCard: CardData): void {
    if (this.selectedSite) {
      this.selectedSite.isSelected = false;
    }
    selectedCard.isSelected = true;
    this.selectedSite = selectedCard;
    this.router.navigate([`configuration/home/site/${selectedCard.id}`]);
  }

  filterSites(): void {
    if (this.filterSite.trim() !== '') {
      const filterTextLower = this.filterSite.toLowerCase();
      this.updatedData = this.backupData.filter(e =>
        e.header.toLowerCase().includes(filterTextLower)
      );
    } else {
      this.updatedData = [...this.backupData];
    }
  }

  trackByCardId(index: number, card: CardData): string {
    return card.id.toString();
  }
}
