import { Component } from '@angular/core';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { RodapeComponent } from './components/rodape/rodape.component';
import { LivroComponent } from './components/livro/livro.component';

@Component({
  selector: 'app-root',
  imports: [CabecalhoComponent, RodapeComponent, LivroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'organo';
}
