import { Component } from '@angular/core';
import { SearchBarInvoiceComponent } from '../../main/components/search-bar-invoice/search-bar-invoice.component';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [SearchBarInvoiceComponent],
  templateUrl: './invoice.component.html',
})
export class InvoiceComponent {

}
