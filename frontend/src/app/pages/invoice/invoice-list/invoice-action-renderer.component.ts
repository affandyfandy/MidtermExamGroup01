import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { InvoiceService } from '../../../services/invoice.service';

@Component({
  selector: 'app-invoice-action-renderer',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <button mat-mini-fab color="primary" (click)="onEdit()" class="action-button">
      <mat-icon>edit</mat-icon>
    </button>
    <button mat-mini-fab color="primary" (click)="onView()" class="action-button">
      <mat-icon>visibility</mat-icon>
    </button>
  `,
  styles: [`
    .action-button {
      margin-right: 8px;
    }
    .action-button:last-child {
      margin-right: 0;
    }
  `]
})
export class InvoiceActionRendererComponent implements ICellRendererAngularComp {
  private params!: ICellRendererParams;

  constructor(private router: Router, private invoiceService: InvoiceService) { }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  onEdit(): void {
    const invoiceId = this.params.data.id;
    this.router.navigate([`/invoice/edit/${invoiceId}`]);
  }

  onView(): void {
    const invoiceId = this.params.data.id;
    this.router.navigate([`/invoice/${invoiceId}`]);
  }
}