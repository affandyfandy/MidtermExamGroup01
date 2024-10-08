import { Component } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Invoice } from '../../../models/invoice.model';
import { InvoiceService } from '../../../services/invoice.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { ICellRendererParams } from 'ag-grid-community';
import { SearchBarInvoiceComponent } from '../../../main/components/search-bar-invoice/search-bar-invoice.component';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { InvoiceActionRendererComponent } from './action-renderer.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, AgGridModule, MatSlideToggleModule, HttpClientModule, SearchBarInvoiceComponent, MatSnackBarModule],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  public invoice$: Observable<Invoice[]>;

  private searchParamsSubject = new BehaviorSubject<{
    customerId?: string;
    customerName?: string;
    startDate?: { year: number; month: number };
    endDate?: { year: number; month: number };
  }>({});

  public rowHeight = 74;

  public columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'customer.name', headerName: 'Customer Name', sortable: true, filter: true },
    { field: 'invoiceAmount', headerName: 'Invoice Amount', sortable: true, filter: 'agNumberColumnFilter' },
    { field: 'invoiceDate', headerName: 'Invoice Date', sortable: true, filter: true, valueFormatter: this.dateFormatter },
    { field: 'createdTime', headerName: 'Created Time', sortable: true, filter: true, valueFormatter: this.dateFormatter },
    { field: 'updatedTime', headerName: 'Updated Time', sortable: true, filter: true, valueFormatter: this.dateFormatter },
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: InvoiceActionRendererComponent,
      sortable: false,
      filter: false,
    }
  ];

  public defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,
  };

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.invoice$ = this.searchParamsSubject.asObservable().pipe(
      switchMap(params => {
        const startDateYear = params.startDate?.year;
        const startDateMonth = params.startDate?.month;
        const endDateYear = params.endDate?.year;
        const endDateMonth = params.endDate?.month;

        return this.invoiceService.getInvoicesByCriteria(
          params.customerId,
          params.customerName,
          startDateYear,
          startDateMonth,
          undefined,
          undefined,
          0,
          10
        );
      })
    );
  }

  exportToPDF(): void {
    this.invoiceService.exportToPDF().subscribe({
      next: () => {
        this.snackBar.open('PDF File saved to D:\invoices.pdf', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        this.snackBar.open('Error exporting to PDF', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    });
  }

  navigateToAddInvoice() {
    this.router.navigate(['/invoice/add']);
  }

  private gridApi: any;

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  dateFormatter(params: any) {
    const date = new Date(params.value);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }


  actionsCellRenderer(params: ICellRendererParams) {
    const editButton = `<button class="edit-btn" (click)="onEdit(params.data)">Edit</button>`;
    const deleteButton = `<button class="delete-btn" (click)="onDelete(params.data)">Delete</button>`;
    const viewButton = `<button class="view-btn" (click)="onView(params.data)"><img src="/public/view.png" alt="View" /></button>`;
    return editButton + deleteButton + viewButton;
  }



  editInvoice(invoice: Invoice) {
    console.log('Edit Invoice', invoice);
  }

  deleteInvoice(invoice: Invoice) {
    console.log('Delete Invoice', invoice);
  }

  getRowDataByIndex(index: number): Invoice {
    let rowData: Invoice[] = [];
    this.gridApi.forEachNode((node: { data: Invoice; }) => rowData.push(node.data));
    return rowData[index];
  }

  onSearch(criteria: {
    customerId?: string;
    customerName?: string;
    startDate?: { year: number; month: number };
    endDate?: { year: number; month: number };
  }) {
    this.searchParamsSubject.next(criteria);
  }
}