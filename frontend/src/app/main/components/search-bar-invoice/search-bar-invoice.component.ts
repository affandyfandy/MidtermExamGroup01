import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-search-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule],
  templateUrl: './search-bar-invoice.component.html',
  styleUrls: ['./search-bar-invoice.component.css']
})
export class SearchBarInvoiceComponent {
  customerId: string = '';
  customerName: string = '';
  startMonth?: number;
  startYear?: number;
  endMonth?: number;
  endYear?: number;

  months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  @Output() search = new EventEmitter<{
    customerId?: string;
    customerName?: string;
    startDate?: { year: number; month: number };
    endDate?: { year: number; month: number };
  }>();

  performSearch() {
    this.search.emit({
      customerId: this.customerId || undefined,
      customerName: this.customerName || undefined,
      startDate: this.startMonth && this.startYear ? { year: this.startYear, month: this.startMonth } : undefined,
      endDate: this.endMonth && this.endYear ? { year: this.endYear, month: this.endMonth } : undefined
    });
  }
}
