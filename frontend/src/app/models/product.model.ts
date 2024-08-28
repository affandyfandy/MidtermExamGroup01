import { Status } from './status';
import { InvoiceProduct } from './invoice-product.model';

export interface Product {
  id: number;
  name: string;
  price: number;
  status: Status;
  createdTime: Date;
  updatedTime: Date;
  invoiceProducts: InvoiceProduct[] | null;
}