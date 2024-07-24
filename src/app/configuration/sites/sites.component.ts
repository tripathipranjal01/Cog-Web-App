import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IDatasource,
} from 'ag-grid-community';
import { Subject, Subscription, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { ConfigurationService } from '../services';
import { CrudComponent } from 'src/app/shared/ag-grid-renderers/crud/crud.component';
import { PaginationReqDTO } from '../../shared/interfaces';
import { ToastService } from 'src/app/core/services/toast.service';
import { AgCellRendererEvent } from 'src/app/shared/ag-grid-renderers/ag-cell-renderer.event';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit, OnDestroy {
  context = { componentParent: this, deleteButton: true, editButton: true };
  components = { crudComponent: CrudComponent };
  searchInput = '';
  currentPage = 1;
  pageSize = 6;
  totalRecords = 0;
  loading = false;
  error: string | null = null;

  columnDefs: ColDef[] = [
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

  defaultColDef = {
    sortable: true,
    resizable: true,
    floatingFilter: false,
    cellStyle: {
      textAlign: 'center',
      justifyContent: 'center',
      display: 'flex',
    },
  };

  gridOptions: GridOptions = {
    context: this.context,
    components: this.components,
    pagination: true,
    paginationPageSize: this.pageSize,
    paginationPageSizeSelector: false,
    rowModelType: 'infinite',
    cacheBlockSize: this.pageSize,
    maxBlocksInCache: 1,
    datasource: this.createDataSource(),
  };

  gridApi!: GridApi;
  private subscriptions = new Subscription();
  private searchSubject = new Subject<string>();

  constructor(
    private configService: ConfigurationService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(searchValue => {
        this.searchInput = searchValue;
        if (searchValue.length >= 3 || searchValue.length === 0) {
          this.updateGridOptions();
        }
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  createDataSource(): IDatasource {
    return {
      getRows: params => {
        this.loading = true;
        const page = Math.floor(params.startRow / this.pageSize) + 1;
        const paginationRequest: PaginationReqDTO = {
          page,
          size: this.pageSize,
          sorting: false,
          sortBy: 'name',
          search: this.searchInput,
          filters: [],
        };

        this.subscriptions.add(
          this.configService
            .getPaginatedSites(paginationRequest)
            .pipe(
              catchError(error => {
                this.showMessage('error', 'Error', 'No Sites Found!');
                this.error = error;
                return of({
                  data: [],
                  pageNumber: 0,
                  pageSize: 0,
                  totalElements: 0,
                  totalPages: 0,
                });
              })
            )
            .subscribe(response => {
              params.successCallback(response.data, response.totalElements);
              this.loading = false;
            })
        );
      },
    };
  }

  addNewSite(): void {
    this.router.navigate(['configuration/home/site', 'new']);
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.updateGridOptions();
  }

  handleAgRendererEvent(event: AgCellRendererEvent): void {
    const data = event.params.data;
    switch (event.type) {
      case AgCellRendererEvent.DELETE_EVENT:
        this.confirmDelete(data);
        break;
      case AgCellRendererEvent.EDIT_EVENT:
        this.router.navigate(['configuration/home/site', data.id]);
        break;
    }
  }

  confirmDelete(site: any): void {
    if (site.id !== undefined) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this site?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.configService.deleteSite(site.id).subscribe(
            () => this.updateGridOptions(),
            error =>
              this.showMessage(
                'error',
                'Error',
                'Error deleting site: ' + error.message
              )
          );
        },
      });
    } else {
      this.showMessage('error', 'Error', 'Site ID is undefined');
    }
  }

  onSearchInputChange(event: any): void {
    const searchValue = event.target.value;
    this.searchSubject.next(searchValue);
  }

  private updateGridOptions(): void {
    this.gridApi.setDatasource(this.createDataSource());
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.toastService.showToastMessage(
      severity.toUpperCase(),
      summary,
      severity
    );
  }
}
