import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BotaoCalculadora,
  EventoBotao,
} from '../../../app/models/calculadora.types';

@Component({
  selector: 'app-botao-calculadora',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './botao-calculadora.component.html',
  styleUrls: ['./botao-calculadora.component.scss'],
})
export class BotaoCalculadoraComponent {
  @Input({ required: true }) botao!: BotaoCalculadora;
  @Input() desabilitado = false;
  @Output() cliqueBotao = new EventEmitter<EventoBotao>();

  private foiPressionado = signal(false);

  /**
   * Classes CSS do botão baseadas no tipo e estado
   */
  classesBotao(): string {
    const classesBase = ['calculator-button'];

    // Adiciona classe do tipo
    if (this.botao.classeCSS) {
      classesBase.push(this.botao.classeCSS);
    }

    // Adiciona classe de pressionado
    if (this.foiPressionado()) {
      classesBase.push('pressed');
    }

    return classesBase.join(' ');
  }

  /**
   * Manipula o clique do botão
   */
  manipularClique(): void {
    if (this.desabilitado) return;

    const evento: EventoBotao = {
      valor: this.botao.valor,
      tipo: this.botao.tipo,
    };

    this.cliqueBotao.emit(evento);
  }

  /**
   * Manipula o mouse down para efeito visual
   */
  aoPressionarMouse(): void {
    this.foiPressionado.set(true);
  }

  /**
   * Manipula o mouse up para efeito visual
   */
  aoSoltarMouse(): void {
    this.foiPressionado.set(false);
  }
}
