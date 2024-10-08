import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../../models/customer.model';
import { CommonModule, NgIf } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { CustomerService } from '../../../services/customer.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StatusRendererComponent } from './status-renderer.component';
import { ActionRendererComponent } from './action-renderer.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
    AgGridModule,
    StatusRendererComponent,
    ActionRendererComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  public customers: Customer[] = [];
  public rowHeight = 52;
  public searchText = '';
  totalElements = 0;
  currentPage = 0;
  pageSize = 20;

  public columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true, headerClass: 'text-center', flex: 1 },
    { field: 'name', headerName: 'Name', sortable: true, filter: true, headerClass: 'text-center', flex: 2 },
    { field: 'phoneNumber', headerName: 'Phone Number', sortable: true, filter: true, headerClass: 'text-center', flex: 2 },
    { field: 'createdTime', headerName: 'Created Time', sortable: true, filter: true, valueFormatter: this.dateFormatter, headerClass: 'text-center', flex: 2 },
    { field: 'updatedTime', headerName: 'Updated Time', sortable: true, filter: true, valueFormatter: this.dateFormatter, headerClass: 'text-center', flex: 2 },
    {
      field: 'status',
      headerName: 'Status',
      cellRenderer: StatusRendererComponent,
      headerClass: 'text-center', flex: 2
    },
    {
      headerName: 'Action',
      cellRenderer: ActionRendererComponent,
      headerClass: 'text-center', flex: 2,
    }
  ];

  public defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,
  };

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {
    this.getCustomers();
  }

  public getCustomers() {
    this.customerService.getCustomers(
      this.currentPage,
      this.pageSize,
      this.searchText).subscribe((response) => {
        this.customers = response.content ?? [];
        this.totalElements = response.totalElements ?? 0;
      });
  }

  public addCustomer() {
    this.router.navigate([`/customer/create`]);
  }

  private gridApi: any;

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  dateFormatter(params: any) {
    const date = new Date(params.value);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
}