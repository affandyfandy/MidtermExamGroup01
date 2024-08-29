import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { CustomerService } from '../../../services/customer.service';

@Component({
    selector: 'app-status-renderer',
    standalone: true,
    imports: [MatSlideToggleModule, MatCommonModule],
    template: `
    <mat-slide-toggle
      [checked]="status === 'ACTIVE'"
      (change)="onStatusChange($event)">
    </mat-slide-toggle>
  `,
})
export class StatusRendererComponent implements ICellRendererAngularComp {
    public status!: 'ACTIVE' | 'INACTIVE';

    constructor(private customerService: CustomerService) { }

    agInit(params: ICellRendererParams): void {
        this.status = params.value;
    }

    refresh(params: ICellRendererParams): boolean {
        this.status = params.value;
        return true;
    }

    onStatusChange(event: MatSlideToggleChange): void {
        this.status = event.checked ? 'ACTIVE' : 'INACTIVE';
    }
}
