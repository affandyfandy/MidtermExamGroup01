import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDateRangePicker, MatDateRangeInput } from '@angular/material/datepicker';

@Component({
  selector: 'app-search-invoice',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './search-bar-invoice.component.html',
  styleUrls: ['./search-bar-invoice.component.css']
})
export class SearchBarInvoiceComponent {
  customerId: string = '';
  customerName: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;

  @Output() search = new EventEmitter<{
    customerId: string;
    customerName: string;
    startDate: Date | null;
    endDate: Date | null;
  }>();

  performSearch() {
    this.search.emit({
      customerId: this.customerId,
      customerName: this.customerName,
      startDate: this.startDate,
      endDate: this.endDate
    });
  }
}
