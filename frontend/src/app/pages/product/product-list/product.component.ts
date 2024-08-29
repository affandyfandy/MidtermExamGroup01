import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../models/product.model';
import { CommonModule, NgIf } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { ProductService } from '../../../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { StatusRendererComponent } from './status-renderer.component';
import { ActionRendererComponent } from './action-renderer.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    AgGridModule,
    StatusRendererComponent,
    ActionRendererComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  public products: Product[] = [];
  public rowHeight = 52;
  public searchText = '';
  totalElements = 0;
  currentPage = 0;
  pageSize = 20;

  public columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true, headerClass: 'text-center', flex: 1 },
    { field: 'name', headerName: 'Name', sortable: true, filter: true, headerClass: 'text-center', flex: 2 },
    { field: 'price', headerName: 'Price', sortable: true, filter: true, headerClass: 'text-center', flex: 2 },
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
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.getProducts();
  }

  public getProducts() {
    this.productService.getProducts(
      this.currentPage,
      this.pageSize,
      this.searchText).subscribe((response) => {
        this.products = response.content ?? [];
        this.totalElements = response.totalElements ?? 0;
      });
  }

  public addProduct() {
    this.router.navigate([`/product/create`]);
  }

  importFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.productService.importProducts(file).subscribe(
        (response) => {
          this.snackBar.open('Import successful!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.getProducts();
        },
        (error) => {
          this.snackBar.open('Import successful!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
      );
    }
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