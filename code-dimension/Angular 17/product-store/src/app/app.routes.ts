import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { getProductsResolver } from './shared/resolvers/get-products.resolver';
import { getProductResolver } from './shared/resolvers/get-product.resolver';

export const routes: Routes = [
  {
    path: '',
    resolve: {
      products: getProductsResolver,
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
      product: getProductResolver,
    },
    loadComponent: () =>
      import('./features/edit/edit.component').then((m) => m.EditComponent),
  },
];
