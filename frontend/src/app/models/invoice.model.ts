import { Customer } from './customer.model';
import { InvoiceProduct } from './invoice-product.model';

export interface Invoice {
  id: string;
  customer: Customer | null;
  invoiceAmount: number;
  invoiceDate: Date;
  createdTime: Date;
  updatedTime: Date;
  invoiceProducts: InvoiceProduct[] | null;
}