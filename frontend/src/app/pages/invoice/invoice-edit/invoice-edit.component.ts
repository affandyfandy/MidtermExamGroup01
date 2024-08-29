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
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {
  customers: Customer[] = [];
  products: Product[] = [];
  invoiceProducts: InvoiceProduct[] = [];
  selectedCustomer: Customer | null = null;
  error: string | null = null;
  invoice: Invoice | null = null;
  currentInvoiceId: string = '';

  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.currentInvoiceId = this.route.snapshot.paramMap.get('id') || '';
    this.loadInvoice(this.currentInvoiceId);
    this.loadCustomers();
    this.loadProducts();
  }

  loadInvoice(id: string) {
    this.invoiceService.getInvoiceById(id).subscribe({
      next: (invoice) => {
        this.invoice = invoice;
        this.selectedCustomer = invoice.customer || null;
        this.invoiceProducts = invoice.invoiceProducts || [];
        this.updateProductDetails();
      },
      error: (err) => {
        console.error('Error loading invoice', err);
        this.error = 'Failed to load invoice data.';
      }
    });
  }

  loadCustomers() {
    this.customerService.getCustomers(0, 100).subscribe({
      next: (data: any) => {
        this.customers = data.content || [];
      },
      error: (err) => {
        console.error('Error loading customers', err);
        this.error = 'Failed to load customer data.';
      }
    });
  }

  loadProducts() {
    this.productService.getProducts(0, 100).subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.error = 'Failed to load product data.';
      }
    });
  }

  updateProductDetails() {
    this.invoiceProducts.forEach(product => {
      const selectedProduct = this.products.find(p => p.id === product.productId);
      if (selectedProduct) {
        product.price = selectedProduct.price;
        product.amount = product.quantity * product.price;
      }
    });
  }

  addProduct() {
    this.invoiceProducts.push({
      productId: 0,
      quantity: 1,
      price: 0,
      amount: 0,
      product: null,
      invoiceId: this.currentInvoiceId,
      invoice: null,
      createdTime: new Date(),
      updatedTime: new Date()
    });
  }

  removeProduct(index: number) {
    this.invoiceProducts.splice(index, 1);
  }

  calculateAmount(product: InvoiceProduct) {
    product.amount = product.quantity * product.price;
  }

  updateInvoice() {
    if (!this.invoice) {
      return;
    }

    const updatedInvoice = {
      customer: { id: this.selectedCustomer?.id ?? '' },
      invoiceProducts: this.invoiceProducts.map(p => ({
        product: { id: p.productId },
        quantity: p.quantity
      })),
    };

    console.log('Payload to be sent:', updatedInvoice); // Log the payload

    this.invoiceService.editInvoice(this.currentInvoiceId, updatedInvoice).subscribe({
      next: (invoice) => {
        console.log('Invoice updated successfully', invoice);
        this.router.navigate(['/invoices']);
      },
      error: (error) => {
        console.error('Error updating invoice', error);
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
    this.router.navigate(['/invoices']);
  }
}