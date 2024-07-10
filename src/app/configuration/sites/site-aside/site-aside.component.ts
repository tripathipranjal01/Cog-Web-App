import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ISelectableCard } from 'src/app/shared/interfaces';
import * as ConfigurationActions from '../../store/configuration.action';
import * as fromConfigurationSelectors from '../../store/configuration.selector';

interface TimeZone {
  name: string;
  code: string;
}

@Component({
  selector: 'app-site-aside',
  templateUrl: './site-aside.component.html',
  styleUrls: ['./site-aside.component.scss'],
})
export class SiteAsideComponent implements OnInit {
  filterSite = ''; // Explicitly defined as string
  selectedSite: ISelectableCard | null = null; // Added type annotation
  updatedData: ISelectableCard[] = [];
  backupData: ISelectableCard[] = [];
  visible = false; // Explicitly defined as boolean
  newSiteForm: FormGroup;
  timeZones: TimeZone[] = [];
  sites$: Observable<any[]> = this.store.select(
    fromConfigurationSelectors.selectAllSites
  );

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadSites();
    this.newSiteForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      timeZone: ['', Validators.required],
    });

    this.sites$.subscribe(data => {
      const newCards: ISelectableCard[] = data.map(item => ({
        id: item.id,
        header: item.name,
        isSelected: false,
        columns: [
          {
            label: 'Location',
            value: item.location,
          },
          {
            label: 'Status',
            value: item.status,
            color: item.status ? '#47C759' : '#FF6961',
            class: 'indicator',
          },
          {
            label: 'Created By',
            value: 'FuraGemsAdmin',
          },
        ],
      }));
      this.updatedData = newCards;
      this.backupData = [...newCards];
      if (this.updatedData.length > 0) {
        this.updatedData[0].isSelected = true;
        this.selectedSite = this.updatedData[0];
      }
    });

    this.timeZones = [
      { name: 'Pacific Time (PT)', code: 'PT' },
      { name: 'Mountain Time (MT)', code: 'MT' },
      { name: 'Central Time (CT)', code: 'CT' },
      { name: 'Eastern Time (ET)', code: 'ET' },
      { name: 'Atlantic Time (AT)', code: 'AT' },
    ];
  }

  loadSites(): void {
    this.store.dispatch(ConfigurationActions.loadSites());
  }

  addNewSite(): void {
    if (this.selectedSite) {
      this.selectedSite.isSelected = false;
      this.selectedSite = null;
    }
    this.router.navigate(['configuration/home/site', 'new']);
  }

  closeDialog(): void {
    this.visible = false;
  }

  onSubmit(): void {
    if (this.newSiteForm.valid) {
      const newSite = this.newSiteForm.value;
      this.store.dispatch(
        ConfigurationActions.createSite({ siteData: newSite })
      );
      this.closeDialog();
    }
  }

  updateSite(selectedCard: ISelectableCard): void {
    if (this.selectedSite) {
      this.selectedSite.isSelected = false;
    }
    selectedCard.isSelected = true;
    this.selectedSite = selectedCard;
    this.router.navigate(['site', selectedCard.id], { relativeTo: this.route });
  }

  filterSites(): void {
    if (this.filterSite) {
      const filterTextLower = this.filterSite.toLowerCase();
      this.updatedData = this.backupData.filter((e: ISelectableCard) =>
        e.header.toLowerCase().includes(filterTextLower)
      );
    } else {
      this.updatedData = [...this.backupData];
    }
  }
}
