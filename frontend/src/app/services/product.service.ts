import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/v1/products';

  constructor(private http: HttpClient) { }

  getProducts(page: number, size: number, search?: string, sortBy: string = 'name', sortDir: string = 'asc'): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    if (search) {
      params = params.set('search', 'name:' + search);
    }

    return this.http.get<any>(this.apiUrl, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  activateProduct(id: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/activate/${id}`, {});
  }

  deactivateProduct(id: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/deactivate/${id}`, {});
  }

  importProducts(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<string>(`${this.apiUrl}/import`, formData);
  }
}
