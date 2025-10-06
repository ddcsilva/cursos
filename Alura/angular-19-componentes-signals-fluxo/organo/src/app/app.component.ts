import { Component } from '@angular/core';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { RodapeComponent } from './components/rodape/rodape.component';
import { ListaLivrosComponent } from './components/lista-livros/lista-livros.component';

@Component({
  selector: 'app-root',
  imports: [CabecalhoComponent, RodapeComponent, ListaLivrosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'organo';
}
