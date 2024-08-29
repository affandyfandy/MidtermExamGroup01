import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Invoice } from '../../../models/invoice.model';
import { InvoiceProduct } from '../../../models/invoice-product.model';
import { InvoiceService } from '../../../services/invoice.service';

@Component({
  selector: 'app-invoice-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, FormsModule, MatSlideToggleModule],
  templateUrl: './table-invoice.component.html',
  styleUrls: ['./table-invoice.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableInvoiceComponent implements OnChanges {
  @Input() invoices: Invoice[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private dialog: MatDialog
  ) {}

  dataSource = new MatTableDataSource<Invoice>(this.invoices);

  columnsToDisplay = ['id', 'customerName', 'invoiceAmount', 'invoiceDate', 'createdTime', 'updatedTime', 'actions'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay];
  expandedElement: Invoice | null = null;

  ngOnChanges() {
    this.dataSource.data = this.invoices;
  }

  editInvoice(invoice: Invoice): void {
    console.log("Invoice edit");
  }
}
