import { InvoiceProduct } from "./invoice-product.model";

export interface Product {
  id: number;
  name: string;
  price: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdTime: Date;
  updatedTime: Date;
  invoiceProducts?: InvoiceProduct[] | null;
}

export interface AddProductReqeust {
  name: string;
  price: number;
  status: 'ACTIVE' | 'INACTIVE';
}
