import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculadoraService } from '../../app/services/calculadora.service';
import { LeitorCalculadoraComponent } from '../leitor/leitor-calculadora.component';
import { BotaoCalculadoraComponent } from '../botao/botao-calculadora/botao-calculadora.component';
import {
  BOTOES_CALCULADORA,
  MAPA_TECLADO,
} from '../../app/utils/calculadora.config';
import { EventoBotao } from '../../app/models/calculadora.types';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [
    CommonModule,
    LeitorCalculadoraComponent,
    BotaoCalculadoraComponent,
  ],
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss'],
})
export class CalculadoraComponent implements OnInit, OnDestroy {
  calculatorService = inject(CalculadoraService);

  botoes = BOTOES_CALCULADORA;
  mostrarHistorico = false;

  constructor() {}

  ngOnInit(): void {
    // Foco automático para permitir uso do teclado
    setTimeout(() => {
      const calculadora = document.querySelector('.calculator') as HTMLElement;
      calculadora?.focus();
    }, 100);
  }

  ngOnDestroy(): void {
    // Cleanup se necessário
  }

  /**
   * Manipula cliques nos botões
   */
  aoClicarBotao(evento: EventoBotao): void {
    this.calculatorService.processarEntrada(evento.valor, evento.tipo);
  }

  /**
   * Manipula entrada do teclado
   */
  @HostListener('document:keydown', ['$event'])
  aoPressionarTecla(evento: KeyboardEvent): void {
    const tecla = evento.key;

    // Previne comportamento padrão para teclas da calculadora
    if (MAPA_TECLADO[tecla]) {
      evento.preventDefault();
      const valorMapeado = MAPA_TECLADO[tecla];

      // Determina o tipo baseado no valor
      let tipo: EventoBotao['tipo'] = 'numero';

      if (['C', 'CE', '⌫', '±', '%', '√', 'x²'].includes(valorMapeado)) {
        tipo = 'comando';
      } else if (['+', '-', '×', '÷'].includes(valorMapeado)) {
        tipo = 'operacao';
      } else if (valorMapeado === '=') {
        tipo = 'igual';
      } else if (valorMapeado === '.') {
        tipo = 'decimal';
      }

      this.calculatorService.processarEntrada(valorMapeado, tipo);
    }
  }

  /**
   * Alterna a exibição do histórico
   */
  alternarHistorico(): void {
    this.mostrarHistorico = !this.mostrarHistorico;
  }

  /**
   * Limpa o histórico
   */
  limparHistorico(): void {
    this.calculatorService.limparHistorico();
  }

  /**
   * Usa um resultado do histórico
   */
  usarResultadoHistorico(resultado: string): void {
    this.calculatorService.processarEntrada('C', 'comando');
    // Simula a entrada do resultado
    for (const char of resultado) {
      if (char === '.') {
        this.calculatorService.processarEntrada(char, 'decimal');
      } else if (/\d/.test(char)) {
        this.calculatorService.processarEntrada(char, 'numero');
      }
    }
  }

  /**
   * Formata o timestamp para exibição
   */
  formatarTempo(timestamp: Date): string {
    return timestamp.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
