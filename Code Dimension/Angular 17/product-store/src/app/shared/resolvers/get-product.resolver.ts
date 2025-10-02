import { inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

export const getProductResolver = (route: ActivatedRouteSnapshot) => {
  const productService = inject(ProductService);
  const id = route.paramMap.get('id');

  if (!id) {
    inject(Router).navigate(['/']);
    return null;
  }

  return productService.get(id);
};
