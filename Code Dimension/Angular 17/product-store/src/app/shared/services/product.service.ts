import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { PayloadProduct } from '../interfaces/payload-product.type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<Product[]>('/api/products');
  }

  get(id: string) {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  post(payload: PayloadProduct) {
    return this.http.post<Product>('/api/products', payload);
  }

  put(id: string, payload: PayloadProduct) {
    return this.http.put<Product>(`/api/products/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete<Product>(`/api/products/${id}`);
  }
}
