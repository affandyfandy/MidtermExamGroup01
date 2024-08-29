import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../models/paginated-response.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:8080/api/v1/customers';

  constructor(private http: HttpClient) { }

  getCustomers(keyword?: string): Observable<PaginatedResponse<Customer>> {
    let params = new HttpParams()

    if (keyword) {
      params = params.set('keyword', keyword);
    }

    return this.http.get<PaginatedResponse<Customer>>(this.apiUrl, { params });
  }

  addCustomers(product: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, product);
  }

  updateCustomers(product: Customer): Observable<Customer> {
    const url = `${this.apiUrl}/${product.id}`;
    return this.http.put<Customer>(url, product);
  }

  getCustomerById(id: number): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Customer>(url);
  }

  deleteCustomer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  activateCustomer(id: string): Observable<Customer> {
    const url = `${this.apiUrl}/activate/${id}`;
    return this.http.put<Customer>(url, {});
  }

  deactivateCustomer(id: string): Observable<Customer> {
    const url = `${this.apiUrl}/deactivate/${id}`;
    return this.http.put<Customer>(url, {});
  }
}