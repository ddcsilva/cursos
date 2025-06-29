import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leitor-calculadora',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leitor-calculadora.component.html',
  styleUrls: ['./leitor-calculadora.component.scss'],
})
export class LeitorCalculadoraComponent {
  @Input({ required: true }) leitor!: string;
  @Input() expressao = '';

  constructor() {}
}
