import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { PayloadProduct } from '../interfaces/payload-product.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = '/api/products';

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

  get(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  post(payload: PayloadProduct): Observable<Product> {
    return this.http.post<Product>(this.API_URL, payload);
  }

  put(id: string, payload: PayloadProduct): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
