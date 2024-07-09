import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AgCellRendererEvent } from 'src/app/shared/ag-grid-renderers/ag-cell-renderer.event';
import { CrudComponent } from 'src/app/shared/ag-grid-renderers/crud/crud.component';
import * as ConfigurationActions from 'src/app/configuration/store/configuration.action';
import * as fromConfigurationSelectors from 'src/app/configuration/store/configuration.selector';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit {
  context = {};
  components = {};
  columnDefs: any = [
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
  filterSite = ''; // Removed explicit type annotation
  newSiteForm: any;
  visible: boolean;
  timeZones: any[];

  constructor(
    private store: Store,
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

    this.store
      .select(fromConfigurationSelectors.selectAllSites)
      .subscribe((data: any[]) => {
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
      });

    this.timeZones = [
      { name: 'Pacific Time (PT)', code: 'PT' },
      { name: 'Mountain Time (MT)', code: 'MT' },
      { name: 'Central Time (CT)', code: 'CT' },
      { name: 'Eastern Time (ET)', code: 'ET' },
      { name: 'Atlantic Time (AT)', code: 'AT' },
    ];

    this.newSiteForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      timeZone: ['', Validators.required],
    });
  }

  loadSites(): void {
    this.store.dispatch(ConfigurationActions.loadSites());
  }

  addNewSite() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  onSubmit() {
    if (this.newSiteForm.valid) {
      const newSite = this.newSiteForm.value;
      this.store.dispatch(ConfigurationActions.createSite({ newSite }));
      this.closeDialog();
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  handleAgRendererEvent(event: AgCellRendererEvent) {
    const data = event.params.data;
    switch (event.type) {
      case AgCellRendererEvent.DELETE_EVENT:
        this.store.dispatch(
          ConfigurationActions.deleteSite({ siteId: data.id })
        );
        break;
      case AgCellRendererEvent.EDIT_EVENT:
        this.router.navigate(['configuration/home/site/', data.id]);
        break;
    }
  }

  filterSites() {
    this.gridApi.setQuickFilter(this.filterSite);
  }
}
