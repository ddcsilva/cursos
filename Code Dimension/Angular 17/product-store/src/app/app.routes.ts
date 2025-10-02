import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { inject } from '@angular/core';
import { ProductService } from './shared/services/product.service';
import { Router } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    resolve: {
      products: () => {
        const productService = inject(ProductService);
        return productService.getAll();
      },
    },
    component: ListComponent,
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./features/create/create.component').then(
        (m) => m.CreateComponent
      ),
  },
  {
    path: 'edit/:id',
    resolve: {
      product: (route: ActivatedRouteSnapshot) => {
        const productService = inject(ProductService);
        const id = route.paramMap.get('id');

        if (!id) {
          inject(Router).navigate(['/']);
          return null;
        }

        return productService.get(id);
      },
    },
    loadComponent: () =>
      import('./features/edit/edit.component').then((m) => m.EditComponent),
  },
];
