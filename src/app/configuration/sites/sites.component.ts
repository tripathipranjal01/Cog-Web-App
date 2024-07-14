import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfigurationService } from '../services';
import { AgCellRendererEvent } from 'src/app/shared/ag-grid-renderers/ag-cell-renderer.event';
import { CrudComponent } from 'src/app/shared/ag-grid-renderers/crud/crud.component';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit {
  context = {};
  components = {};
  columnDefs: any[] = [
    {
      headerName: 'Site Name',
      field: 'name',
      filter: 'agTextColumnFilter',
      suppressFloatingFilterButton: true,
    },
    {
      headerName: 'Site Description',
      field: 'description',
      filter: 'agTextColumnFilter',
      suppressFloatingFilterButton: true,
    },
    {
      headerName: 'Site Location',
      field: 'location',
      filter: 'agTextColumnFilter',
      suppressFloatingFilterButton: true,
    },
    {
      headerName: 'Status',
      field: 'status',
      filter: 'agTextColumnFilter',
      cellRenderer: () => 'Active',
      suppressFloatingFilterButton: true,
    },
    {
      headerName: 'Utilization Hour',
      field: 'utilizationHour',
      filter: 'agNumberColumnFilter',
      suppressFloatingFilterButton: true,
    },
    {
      headerName: 'Site Type',
      field: 'siteType',
      filter: 'agNumberColumnFilter',
      suppressFloatingFilterButton: true,
    },
    {
      headerName: 'Action',
      field: 'action',
      cellRenderer: 'crudComponent',
    },
  ];
  rowData: any[] = [];
  gridApi: any;
  filterSite = '';
  newSiteForm: FormGroup;
  visible: boolean;
  timeZones: { name: string; code: string }[] = [
    { name: 'Pacific Time (PT)', code: 'PT' },
    { name: 'Mountain Time (MT)', code: 'MT' },
    { name: 'Central Time (CT)', code: 'CT' },
    { name: 'Eastern Time (ET)', code: 'ET' },
    { name: 'Atlantic Time (AT)', code: 'AT' },
  ];

  constructor(
    private configService: ConfigurationService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadSites();
    this.context = {
      componentParent: this,
      deleteButton: true,
      editButton: true,
    };
    this.components = {
      crudComponent: CrudComponent,
    };

    this.newSiteForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      timeZone: ['', Validators.required],
    });
  }

  loadSites(): void {
    this.configService.getAllSites().subscribe(
      (data: any[]) => {
        this.rowData = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          location: item.location,
          status: item.status,
          utilizationHour: item.utilizationHour,
          siteType: item.type,
          actions: '',
        }));
      },
      error => {
        console.error('Failed to fetch sites:', error);
      }
    );
  }

  addNewSite(): void {
    this.visible = false;
    this.router.navigate(['configuration/home/site', 'new']);
  }

  closeDialog(): void {
    this.visible = false;
    this.newSiteForm.reset();
  }

  onSubmit(): void {
    if (this.newSiteForm.valid) {
      const siteData = this.newSiteForm.value;
      this.configService.createSite(siteData).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Site created successfully',
          });
          this.loadSites();
          this.closeDialog();
        },
        error => {
          console.error('Failed to create site:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create site',
          });
        }
      );
    }
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  handleAgRendererEvent(event: AgCellRendererEvent): void {
    const data = event.params.data;
    switch (event.type) {
      case AgCellRendererEvent.DELETE_EVENT:
        this.confirmationService.confirm({
          message: 'Are you sure you want to delete this site?',
          accept: () => {
            this.configService.deleteSite(data.id).subscribe(
              () => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Site deleted successfully',
                });
                this.loadSites();
              },
              error => {
                console.error('Failed to delete site:', error);
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail:
                    'CANNOT DELETE SITE, BECAUSE IT HAS USERS ASSIGNED TO IT.',
                });
              }
            );
          },
        });
        break;
      case AgCellRendererEvent.EDIT_EVENT:
        this.router.navigate(['configuration/home/site', data.id]);
        break;
    }
  }

  filterSites(): void {
    this.gridApi.setQuickFilter(this.filterSite);
  }

  showToast(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Toast Message',
      detail: 'This is a sample toast message',
    });
  }
}
