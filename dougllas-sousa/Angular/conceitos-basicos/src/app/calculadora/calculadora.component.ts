import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculadora',
  imports: [FormsModule],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.scss',
})
export class CalculadoraComponent {
  numero1: number = 0;
  numero2: number = 0;
  resultado: number | null = null;

  calcularResultado() {
    this.resultado = Number(this.numero1) + Number(this.numero2);
  }

  limpar() {
    this.numero1 = 0;
    this.numero2 = 0;
    this.resultado = null;
  }
}
