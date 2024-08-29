import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice.model';
import { RevenueReport } from '../models/revenue-report.model';
import { InvoiceProductDTO } from '../models/invoice-product-dto.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:8080/api/v1/invoices';

  constructor(private http: HttpClient) { }

  getInvoiceById(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${id}`);
  }

  getAllInvoices(page: number = 0, size: number = 10): Observable<Invoice[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Invoice[]>(this.apiUrl, { params });
  }

  addInvoice(invoice: { customer: { id: string }; invoiceProducts: { product: { id: number }; quantity: number }[] }): Observable<any> {
    return this.http.post<any>(this.apiUrl, invoice);
  }

  editInvoice(id: string, invoice: { customer: { id: string }; invoiceProducts: { product: { id: number }; quantity: number }[] }): Observable<any> {
    return this.http.put<Invoice>(`${this.apiUrl}/${id}`, invoice);
  }

  getInvoicesByCriteria(
    customerId?: string,
    customerName?: string,
    year?: number,
    month?: number,
    invoiceAmountCondition?: string,
    invoiceAmount?: number,
    page: number = 0,
    size: number = 10
  ): Observable<Invoice[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (customerId) params = params.set('customerId', customerId);
    if (customerName) params = params.set('customerName', customerName);
    if (year !== undefined) params = params.set('year', year.toString());
    if (month !== undefined) params = params.set('month', month.toString());
    if (invoiceAmountCondition) params = params.set('invoiceAmountCondition', invoiceAmountCondition);
    if (invoiceAmount !== undefined) params = params.set('invoiceAmount', invoiceAmount.toString());

    return this.http.get<Invoice[]>(`${this.apiUrl}/search`, { params });
  }

  exportToPDF(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export-pdf`, { responseType: 'blob' });
  }

  exportInvoicesToExcel(
    customerId?: string,
    customerName?: string,
    year?: number,
    month?: number,
    invoiceAmountCondition?: string,
    invoiceAmount?: number
  ): Observable<Blob> {
    let params = new HttpParams();

    if (customerId) params = params.set('customerId', customerId);
    if (customerName) params = params.set('customerName', customerName);
    if (year) params = params.set('year', year.toString());
    if (month) params = params.set('month', month.toString());
    if (invoiceAmountCondition) params = params.set('invoiceAmountCondition', invoiceAmountCondition);
    if (invoiceAmount) params = params.set('invoiceAmount', invoiceAmount.toString());

    return this.http.get(`${this.apiUrl}/export-excel`, { params, responseType: 'blob' });
  }

  getRevenueReport(year?: number, month?: number, day?: number): Observable<RevenueReport[]> {
    let params = new HttpParams();

    if (year) params = params.set('year', year.toString());
    if (month) params = params.set('month', month.toString());
    if (day) params = params.set('day', day.toString());

    return this.http.get<RevenueReport[]>(`${this.apiUrl}/report`, { params });
  }
}