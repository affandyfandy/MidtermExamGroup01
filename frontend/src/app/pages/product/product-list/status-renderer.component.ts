import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ProductService } from '../../../services/product.service';

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
    private productId: string = '';

    constructor(private productService: ProductService) { }

    agInit(params: ICellRendererParams): void {
        this.status = params.value;
        this.productId = params.data.id;
    }

    refresh(params: ICellRendererParams): boolean {
        this.status = params.value;
        return true;
    }

    onStatusChange(event: MatSlideToggleChange): void {
        if (this.status === 'ACTIVE') {
            this.productService.deactivateProduct(Number(this.productId))
                .subscribe({
                    next: (response) => {
                        this.status = 'INACTIVE';
                    },
                    error: (err) => console.error('Error updating status', err)
                });
        } else {
            this.productService.activateProduct(Number(this.productId))
                .subscribe({
                    next: (response) => {
                        this.status = 'ACTIVE';
                    },
                    error: (err) => console.error('Error updating status', err)
                });
        }
    }
}
