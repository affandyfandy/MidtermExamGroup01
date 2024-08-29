import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCustomerReqeust, Customer } from '../models/customer.model';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../models/paginated-response.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:8080/api/v1/customers';

  constructor(private http: HttpClient) { }

  getCustomers(page: number, size: number, keyword?: string): Observable<PaginatedResponse<Customer>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)

    if (keyword) {
      params = params.set('keyword', keyword);
    }

    return this.http.get<PaginatedResponse<Customer>>(this.apiUrl, { params });
  }

  addCustomers(customer: AddCustomerReqeust): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    const url = `${this.apiUrl}/${customer.id}`;
    return this.http.put<Customer>(url, customer);
  }

  getCustomerById(id: string): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Customer>(url);
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