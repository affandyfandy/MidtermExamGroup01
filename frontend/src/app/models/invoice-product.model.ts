import { Invoice } from './invoice.model';
import { Product } from './product.model';

export interface InvoiceProduct {
  invoiceId: string;
  productId: number;
  quantity: number;
  price: number;
  amount: number;
  invoice: Invoice | null;
  product: Product | null;
  createdTime: Date;
  updatedTime: Date;
}