import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Customer } from '../../../models/customer.model';
import { CommonModule, NgIf } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { CustomerService } from '../../../services/customer.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StatusRendererComponent } from './status-renderer.component';
import { ActionRendererComponent } from './action-renderer.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule,
    StatusRendererComponent,
    ActionRendererComponent,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  public customers$: Observable<Customer[]> = new Observable<Customer[]>;
  public rowHeight = 74;

  public columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'name', headerName: 'Name', sortable: true, filter: true },
    { field: 'phone_number', headerName: 'Phone Number', sortable: true, filter: true },
    {
      field: 'status',
      headerName: 'Status',
      cellRenderer: StatusRendererComponent,
    },
    {
      headerName: 'Action',
      cellRenderer: ActionRendererComponent,
    }
  ];

  public defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,
  };

  constructor(private customerService: CustomerService) {
    this.getCustomers();

  }

  getCustomers() {
    this.customers$ = this.customerService.getCustomers();
  }

  ngAfterViewInit() {
    // Listen for click events on the action buttons
    document.addEventListener('click', (event: any) => {
      if (event.target.closest('.edit-btn')) {
        const selectedData = event.target.closest('.ag-row').rowIndex;
        this.editCustomer(selectedData);
      } else if (event.target.closest('.delete-btn')) {
        const selectedData = event.target.closest('.ag-row').rowIndex;
        this.deleteCustomer(selectedData);
      }
    });
  }

  editCustomer(index: number) {
    const customer = this.getRowDataByIndex(index);
    console.log('Edit Customer', customer);
    // Implementasi logika edit di sini
  }

  deleteCustomer(index: number) {
    const customer = this.getRowDataByIndex(index);
    console.log('Delete Customer', customer);
    // Implementasi logika delete di sini
  }

  getRowDataByIndex(index: number): Customer {
    // Ambil data berdasarkan index
    let rowData: Customer[] = [];
    this.gridApi.forEachNode((node: { data: Customer; }) => rowData.push(node.data));
    return rowData[index];
  }

  private gridApi: any;

  onGridReady(params: any) {
    this.gridApi = params.api;
  }
}