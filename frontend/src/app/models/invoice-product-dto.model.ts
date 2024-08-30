export interface InvoiceProductDTO {
  invoiceId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  amount: number;
  createdTime: Date;
  updatedTime: Date;
}
