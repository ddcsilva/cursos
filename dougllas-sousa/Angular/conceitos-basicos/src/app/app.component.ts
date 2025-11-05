import { Component } from '@angular/core';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';

@Component({
  selector: 'app-root',
  imports: [CalculadoraComponent, ListaComprasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  telaAtual: string = 'home';

  abrirCalculadora() {
    this.telaAtual = 'calculadora';
  }

  abrirListaCompras() {
    this.telaAtual = 'lista-compras';
  }

  voltarParaHome() {
    this.telaAtual = 'home';
  }
}
