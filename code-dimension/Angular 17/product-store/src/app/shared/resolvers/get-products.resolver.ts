import { inject } from '@angular/core';
import { ProductService } from '../services/product.service';

export const getProductsResolver = () => {
  const productService = inject(ProductService);
  return productService.getAll();
};
