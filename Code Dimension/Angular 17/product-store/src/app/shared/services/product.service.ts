import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<Product[]>('/api/products');
  }
}
