import { Routes } from '@angular/router';
import { LivrosComponent } from './features/livros/livros.component';
import { AutoresComponent } from './features/autores/autores.component';

export const routes: Routes = [
  { path: '', redirectTo: '/livros', pathMatch: 'full' },
  { path: 'livros', component: LivrosComponent },
  { path: 'autores', component: AutoresComponent },
];
