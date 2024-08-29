import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-action-renderer',
  standalone: true,
  imports: [MatButtonModule, MatIconButton, MatIconModule],
  template: `
    <button mat-mini-fab color="blue" (click)="onEdit()" class="action-button">
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

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  onEdit(): void {
    console.log('Edit clicked for ID:', this.params.data.id);
    // Emit event or implement logic to handle edit
  }

  onDelete(): void {
    console.log('Delete clicked for ID:', this.params.data.id);
    // Emit event or implement logic to handle delete
  }
}
