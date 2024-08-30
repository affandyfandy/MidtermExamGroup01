import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../../models/invoice.model';
import { InvoiceProduct } from '../../../models/invoice-product.model';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../../services/invoice.service';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent {
  invoiceProduct: InvoiceProduct[] = [];

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.invoiceService.getAllInvoiceProductsById(id!).subscribe((response) => {
      this.invoiceProduct = response;
    })
  }

  calculateTotal(invoiceProducts: InvoiceProduct[] | null): number {
    if (!invoiceProducts) {
      return 0;
    }
    return invoiceProducts.reduce((total, product) => total + (product.amount || 0), 0);
  }
}