import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Customer } from '../../../models/customer.model';
import { Product } from '../../../models/product.model';
import { InvoiceService } from '../../../services/invoice.service';
import { CustomerService } from '../../../services/customer.service';
import { ProductService } from '../../../services/product.service';
import { Invoice } from '../../../models/invoice.model';
import { InvoiceProduct } from '../../../models/invoice-product.model';
import { Status } from '../../../models/status';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-add',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.css']
})
export class InvoiceAddComponent implements OnInit {
  customers: Customer[] = [];
  products: Product[] = [];
  invoiceProducts: InvoiceProduct[] = [{ productId: 0, quantity: 1, price: 0, amount: 0, product: null, invoiceId: '', invoice: null, createdTime: new Date(), updatedTime: new Date() }];
  selectedCustomer: Customer | null = null;

  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.customerService.getCustomers(0, 100).subscribe((data: any) => {
      this.customers = data.content || [];
    });

    this.productService.getProducts(0, 50).subscribe((response) => {
      this.products = response.content ?? [];
    });
  }

  addProduct() {
    this.invoiceProducts.push({ productId: 0, quantity: 1, price: 0, amount: 0, product: null, invoiceId: '', invoice: null, createdTime: new Date(), updatedTime: new Date() });
  }

  removeProduct(index: number) {
    this.invoiceProducts.splice(index, 1);
  }

  calculateAmount(product: InvoiceProduct) {
    product.amount = product.quantity * product.price;
  }

  addInvoice() {
    const newInvoice = {
      customer: { id: this.selectedCustomer?.id ?? '' },
      invoiceProducts: this.invoiceProducts.map(p => ({
        product: { id: p.productId },
        quantity: p.quantity
      }))
    };

    console.log('Payload to be sent:', newInvoice); // Log the payload

    this.invoiceService.addInvoice(newInvoice).subscribe({
      next: (invoice) => {
        console.log('Invoice added successfully', invoice);
        this.router.navigate(['/invoice']);
      },
      error: (error) => {
        console.error('Error adding invoice', error);
      }
    });
  }


  onProductChange(product: InvoiceProduct) {
    const selectedProduct = this.products.find(p => p.id === product.productId);
    if (selectedProduct) {
      product.price = selectedProduct.price;
      this.calculateAmount(product);
    }
  }

  getTotalAmount(): number {
    return this.invoiceProducts.reduce((sum, product) => sum + (product.quantity * product.price), 0);
  }

  cancel() {
    this.router.navigate(['/invoice']);
  }
}