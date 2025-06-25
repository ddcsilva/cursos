import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/livros',
    pathMatch: 'full',
  },
  {
    path: 'livros',
    loadComponent: () =>
      import('./features/livros/containers/livros-container.component').then(
        (m) => m.LivrosContainerComponent
      ),
  },
  {
    path: 'autores',
    loadComponent: () =>
      import('./features/autores/containers/autores-container.component').then(
        (m) => m.AutoresContainerComponent
      ),
  },
];
