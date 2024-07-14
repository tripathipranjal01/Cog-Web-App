import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationService } from '../../services';
import { ISelectableCard } from 'src/app/shared/interfaces';

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
  filterSite = '';
  selectedSite: ISelectableCard | null = null;
  updatedData: ISelectableCard[] = [];
  backupData: ISelectableCard[] = [];
  visible = false;
  newSiteForm: FormGroup;
  timeZones: TimeZone[] = [
    { name: 'Pacific Time (PT)', code: 'PT' },
    { name: 'Mountain Time (MT)', code: 'MT' },
    { name: 'Central Time (CT)', code: 'CT' },
    { name: 'Eastern Time (ET)', code: 'ET' },
    { name: 'Atlantic Time (AT)', code: 'AT' },
  ];

  constructor(
    private configurationService: ConfigurationService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadSites();
  }

  initializeForm(): void {
    this.newSiteForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      timeZone: [null, Validators.required],
      type: ['', Validators.required],
    });
  }

  loadSites(): void {
    this.configurationService.getAllSites().subscribe((data: any[]) => {
      const newCards: ISelectableCard[] = data.map((item: any) => ({
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
  }

  addNewSite(): void {
    if (this.selectedSite) {
      this.selectedSite.isSelected = false;
      this.selectedSite = null;
    }
    this.visible = false;
    this.router.navigate(['configuration/home/site', 'new']);
  }

  closeDialog(): void {
    this.visible = false;
    this.newSiteForm.reset();
  }

  onSubmit(): void {
    if (this.newSiteForm.valid) {
      const newSite = this.newSiteForm.value;
      this.configurationService.createSite(newSite).subscribe(() => {
        this.loadSites();
        this.closeDialog();
      });
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
    if (this.filterSite.trim() !== '') {
      const filterTextLower = this.filterSite.toLowerCase();
      this.updatedData = this.backupData.filter((e: ISelectableCard) =>
        e.header.toLowerCase().includes(filterTextLower)
      );
    } else {
      this.updatedData = [...this.backupData];
    }
  }
}
