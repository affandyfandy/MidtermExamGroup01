import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { InvoiceProductDTO } from '../../../models/invoice-product-dto.model';
import { InvoiceService } from '../../../services/invoice.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { ICellRendererParams } from 'ag-grid-community';
import { SearchBarInvoiceComponent } from '../../../main/components/search-bar-invoice/search-bar-invoice.component';
import { switchMap } from 'rxjs/operators';
import { ActionRendererComponent } from './action-renderer.component';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, AgGridModule, MatSlideToggleModule, HttpClientModule, SearchBarInvoiceComponent],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  public invoiceProduct$: Observable<InvoiceProductDTO[]>;

  public rowHeight = 74;

  public columnDefs: ColDef[] = [
    { field: 'invoice.id', headerName: 'Invoice ID', sortable: true, filter: true },
    { field: 'product.id', headerName: 'Product ID', sortable: true, filter: true },
    { field: 'product.name', headerName: 'Product Name', sortable: true, filter: true },
    { field: 'quantity', headerName: 'Quantity', sortable: true, filter: 'agNumberColumnFilter' },
    { field: 'price', headerName: 'Price', sortable: true, filter: 'agNumberColumnFilter' },
    { field: 'amount', headerName: 'Amount', sortable: true, filter: 'agNumberColumnFilter' },
    { field: 'createdTime', headerName: 'Created Time', sortable: true, filter: true, valueFormatter: this.dateFormatter },
    { field: 'updatedTime', headerName: 'Updated Time', sortable: true, filter: true, valueFormatter: this.dateFormatter },
    {
        field: 'actions',
        headerName: 'Actions',
        cellRenderer: ActionRendererComponent,
        cellRendererParams: {
            onEdit: this.editInvoiceProduct.bind(this),
            onDelete: this.deleteInvoiceProduct.bind(this),
        },
        sortable: false,
        filter: false,
    }
];


  public defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,
  };

  constructor(private invoiceService: InvoiceService) {
    this.invoiceProduct$ = this.invoiceService.getAllInvoiceProducts();
  }

  private gridApi: any;

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  dateFormatter(params: any) {
    const date = new Date(params.value);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  editInvoiceProduct(invoiceProduct: InvoiceProductDTO) {
    console.log('Edit Invoice Product', invoiceProduct);
  }

  deleteInvoiceProduct(invoiceProduct: InvoiceProductDTO) {
    console.log('Delete Invoice Product', invoiceProduct);
  }

  getRowDataByIndex(index: number): InvoiceProductDTO {
    let rowData: InvoiceProductDTO[] = [];
    this.gridApi.forEachNode((node: { data: InvoiceProductDTO; }) => rowData.push(node.data));
    return rowData[index];
  }
}
