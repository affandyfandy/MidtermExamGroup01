import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-action-renderer',
  standalone: true,
  imports: [MatButtonModule, MatIconButton, MatIconModule],
  template: `
    <button mat-mini-fab color="blue" (click)="onEdit()" class="action-button pr-14">
      <mat-icon>edit</mat-icon>
    </button>
    <button mat-mini-fab color="secondary" (click)="onDelete()" class="action-button">
      <mat-icon>delete</mat-icon>
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
export class ActionRendererComponent implements ICellRendererAngularComp {
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  private params!: ICellRendererParams;

  constructor(private router: Router, private customerService: CustomerService) { }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  onEdit(): void {
    const customerId = this.params.data.id;
    this.router.navigate([`/customer/${customerId}`]);
  }

  onDelete(): void {
    const customerId = this.params.data.id;
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(customerId).subscribe(() => {

      });
    }
  }
}
