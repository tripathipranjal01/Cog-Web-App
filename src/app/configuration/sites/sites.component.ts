import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfigurationService } from '../services';
import { AgCellRendererEvent } from 'src/app/shared/ag-grid-renderers/ag-cell-renderer.event';
import { CrudComponent } from 'src/app/shared/ag-grid-renderers/crud/crud.component';
import { PaginationReqDTO } from '../../shared/interfaces';
import { timeZones, PageEvent } from '../interfaces/configuration.interface';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit {
  context = {};
  components = {};
  defaultColDef = {
    cellStyle: {
      textAlign: 'center',
      justifyContent: 'center',
      display: 'flex',
    },
  };
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
      field: 'type',
      filter: 'agTextColumnFilter',
      suppressFloatingFilterButton: true,
    },
    {
      headerName: 'Action',
      field: 'actions',
      cellRenderer: 'crudComponent',
      pinned: 'right',
      width: 150,
    },
  ];
  rowData: any[] = [];
  first = 0;
  rows = 6;
  totalRecords = 0;
  searchInput = '';
  newSiteForm: FormGroup;
  visible: boolean;
  currentPage = 1;

  timeZones = timeZones;

  constructor(
    private configService: ConfigurationService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadPaginatedSites(this.currentPage);
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

  loadPaginatedSites(page: number, size = this.rows, search = ''): void {
    const paginationRequest: PaginationReqDTO = {
      page,
      size,
      sorting: false,
      sortBy: 'name',
      search,
      filters: [],
    };

    this.configService.getPaginatedSites(paginationRequest).subscribe(
      (data: any) => {
        if (data && data.data) {
          this.rowData = data.data.map((item: any) => ({
            id: item.id,
            name: item.name || '',
            description: item.description || '',
            location: item.location || '',
            status: item.status || '',
            utilizationHour: item.utilizationHour || '',
            type: item.type || '',
            actions: item.actions,
          }));
          this.totalRecords = data.totalElements;
        } else {
          this.rowData = [];
          this.totalRecords = 0;
        }
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

  onGridReady(params: any): void {
    params.api.sizeColumnsToFit();
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
                this.loadPaginatedSites(
                  this.currentPage,
                  this.rows,
                  this.searchInput
                );
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

  onSearchInputChange(event: any): void {
    const searchValue = event.target.value;
    this.searchInput = searchValue;
    if (searchValue.length >= 3 || searchValue.length === 0) {
      this.loadPaginatedSites(this.currentPage, this.rows, this.searchInput);
    }
  }

  onPageChange(event: any): void {
    const pageEvent: PageEvent = {
      first: event.first ?? 0,
      rows: event.rows ?? 6,
      page: event.page ?? 0,
      pageCount: event.pageCount ?? 0,
    };

    this.first = pageEvent.first;
    this.rows = pageEvent.rows;
    this.currentPage = pageEvent.page + 1;

    this.loadPaginatedSites(this.currentPage, this.rows, this.searchInput);
  }

  showToast(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Toast Message',
      detail: 'This is a sample toast message',
    });
  }
}
