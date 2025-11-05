import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'calculadora',
    component: CalculadoraComponent,
  },
  {
    path: 'lista-compras',
    component: ListaComprasComponent,
  },
];
