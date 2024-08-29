import { Component } from '@angular/core';
import { SearchBarInvoiceComponent } from '../../main/components/search-bar-invoice/search-bar-invoice.component';
import { TableInvoiceComponent } from '../../main/components/table-invoice/table-invoice.component';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [SearchBarInvoiceComponent, TableInvoiceComponent],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {

}
