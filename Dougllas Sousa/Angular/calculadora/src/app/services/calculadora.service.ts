import { computed, Injectable, signal } from '@angular/core';
import {
  TipoBotao,
  EstadoCalculadora,
  EntradaHistorico,
  Operacao,
} from '../models/calculadora.types';

@Injectable({
  providedIn: 'root',
})
export class CalculadoraService {
  // Estado inicial da calculadora
  private readonly estadoInicial: EstadoCalculadora = {
    valorAtual: '0',
    valorAnterior: '',
    operacao: null,
    aguardandoOperando: false,
    exibicao: '0',
    expressao: '',
  };

  // Signals para gerenciar o estado
  private estado = signal<EstadoCalculadora>(this.estadoInicial);
  private historico = signal<EntradaHistorico[]>([]);

  // Computed signals para expor dados readonly
  public readonly estadoAtual = computed(() => this.estado());
  public readonly exibicao = computed(() => this.estado().exibicao);
  public readonly expressao = computed(() => this.estado().expressao);
  public readonly historicoCalculo = computed(() => this.historico());

  constructor() {}

  /**
   * Processa a entrada de um botão
   */
  processarEntrada(valor: string, tipo: TipoBotao): void {
    switch (tipo) {
      case 'numero':
        this.entradaNumero(valor);
        break;
      case 'operacao':
        this.entradaOperacao(valor as Operacao);
        break;
      case 'decimal':
        this.entradaDecimal();
        break;
      case 'igual':
        this.calcular();
        break;
      case 'comando':
        this.executarComando(valor);
        break;
    }
  }

  /**
   * Entrada de números
   */
  private entradaNumero(valor: string): void {
    const estadoAtual = this.estado();

    if (estadoAtual.aguardandoOperando) {
      this.estado.update((estado) => ({
        ...estado,
        valorAtual: valor,
        exibicao: valor,
        aguardandoOperando: false,
      }));
    } else {
      const novoValor =
        estadoAtual.valorAtual === '0' ? valor : estadoAtual.valorAtual + valor;
      this.estado.update((estado) => ({
        ...estado,
        valorAtual: novoValor,
        exibicao: novoValor,
      }));
    }
  }

  /**
   * Entrada de operações
   */
  private entradaOperacao(operacao: Operacao): void {
    const estadoAtual = this.estado();

    if (
      estadoAtual.valorAnterior &&
      estadoAtual.operacao &&
      !estadoAtual.aguardandoOperando
    ) {
      this.calcular();
    }

    this.estado.update((estado) => ({
      ...estado,
      valorAnterior: estado.valorAtual,
      operacao: operacao,
      aguardandoOperando: true,
      expressao: `${estado.valorAtual} ${operacao}`,
    }));
  }

  /**
   * Entrada do ponto decimal
   */
  private entradaDecimal(): void {
    const estadoAtual = this.estado();

    if (estadoAtual.aguardandoOperando) {
      this.estado.update((estado) => ({
        ...estado,
        valorAtual: '0.',
        exibicao: '0.',
        aguardandoOperando: false,
      }));
    } else if (estadoAtual.valorAtual.indexOf('.') === -1) {
      this.estado.update((estado) => ({
        ...estado,
        valorAtual: estado.valorAtual + '.',
        exibicao: estado.valorAtual + '.',
      }));
    }
  }

  /**
   * Executa o cálculo
   */
  private calcular(): void {
    const estadoAtual = this.estado();

    if (!estadoAtual.valorAnterior || !estadoAtual.operacao) return;

    const anterior = parseFloat(estadoAtual.valorAnterior);
    const atual = parseFloat(estadoAtual.valorAtual);
    let resultado: number;

    switch (estadoAtual.operacao) {
      case '+':
        resultado = anterior + atual;
        break;
      case '-':
        resultado = anterior - atual;
        break;
      case 'x':
        resultado = anterior * atual;
        break;
      case '÷':
        if (atual === 0) {
          this.tratarErro('Não é possível dividir por zero');
          return;
        }
        resultado = anterior / atual;
        break;
      default:
        return;
    }

    const expressao = `${estadoAtual.valorAnterior} ${estadoAtual.operacao} ${estadoAtual.valorAtual}`;
    const resultadoStr = this.formatarResultado(resultado);

    // Adiciona ao histórico
    this.adicionarAoHistorico(expressao, resultadoStr);

    // Atualiza o estado
    this.estado.update((estado) => ({
      ...estado,
      valorAtual: resultadoStr,
      valorAnterior: '',
      operacao: null,
      aguardandoOperando: true,
      exibicao: resultadoStr,
      expressao: `${expressao} = ${resultadoStr}`,
    }));
  }

  /**
   * Executa comandos especiais
   */
  private executarComando(comando: string): void {
    switch (comando) {
      case 'C':
        this.limpar();
        break;
      case 'CE':
        this.limparEntrada();
        break;
      case '⌫':
        this.apagar();
        break;
      case '±':
        this.alternarSinal();
        break;
      case '%':
        this.porcentagem();
        break;
      case '√':
        this.raizQuadrada();
        break;
      case 'x²':
        this.quadrado();
        break;
    }
  }

  /**
   * Limpa tudo
   */
  private limpar(): void {
    this.estado.set(this.estadoInicial);
  }

  /**
   * Limpa apenas a entrada atual
   */
  private limparEntrada(): void {
    this.estado.update((estado) => ({
      ...estado,
      valorAtual: '0',
      exibicao: '0',
    }));
  }

  /**
   * Remove o último dígito
   */
  private apagar(): void {
    const estadoAtual = this.estado();

    if (estadoAtual.aguardandoOperando) return;

    const novoValor = estadoAtual.valorAtual.slice(0, -1) || '0';
    this.estado.update((estado) => ({
      ...estado,
      valorAtual: novoValor,
      exibicao: novoValor,
    }));
  }

  /**
   * Alterna o sinal do número
   */
  private alternarSinal(): void {
    const estadoAtual = this.estado();
    const valor = parseFloat(estadoAtual.valorAtual);

    if (valor === 0) return;

    const novoValor = (-valor).toString();
    this.estado.update((estado) => ({
      ...estado,
      valorAtual: novoValor,
      exibicao: novoValor,
    }));
  }

  /**
   * Calcula porcentagem
   */
  private porcentagem(): void {
    const estadoAtual = this.estado();
    const valor = parseFloat(estadoAtual.valorAtual) / 100;
    const novoValor = valor.toString();

    this.estado.update((estado) => ({
      ...estado,
      valorAtual: novoValor,
      exibicao: novoValor,
    }));
  }

  /**
   * Calcula raiz quadrada
   */
  private raizQuadrada(): void {
    const estadoAtual = this.estado();
    const valor = parseFloat(estadoAtual.valorAtual);

    if (valor < 0) {
      this.tratarErro('Não é possível calcular raiz de número negativo');
      return;
    }

    const resultado = Math.sqrt(valor);
    const resultadoStr = this.formatarResultado(resultado);

    this.adicionarAoHistorico(`√${estadoAtual.valorAtual}`, resultadoStr);

    this.estado.update((estado) => ({
      ...estado,
      valorAtual: resultadoStr,
      exibicao: resultadoStr,
      expressao: `√${estadoAtual.valorAtual} = ${resultadoStr}`,
    }));
  }

  /**
   * Calcula quadrado
   */
  private quadrado(): void {
    const estadoAtual = this.estado();
    const valor = parseFloat(estadoAtual.valorAtual);
    const resultado = valor * valor;
    const resultadoStr = this.formatarResultado(resultado);

    this.adicionarAoHistorico(`${estadoAtual.valorAtual}²`, resultadoStr);

    this.estado.update((estado) => ({
      ...estado,
      valorAtual: resultadoStr,
      exibicao: resultadoStr,
      expressao: `${estadoAtual.valorAtual}² = ${resultadoStr}`,
    }));
  }

  /**
   * Formata o resultado para exibição
   */
  private formatarResultado(valor: number): string {
    // Remove zeros desnecessários e limita casas decimais
    const formatado = parseFloat(valor.toPrecision(12));
    return formatado.toString();
  }

  /**
   * Adiciona entrada ao histórico
   */
  private adicionarAoHistorico(expressao: string, resultado: string): void {
    const entrada: EntradaHistorico = {
      id: Date.now().toString(),
      expressao,
      resultado,
      timestamp: new Date(),
    };

    this.historico.update((historico) => [entrada, ...historico].slice(0, 50)); // Mantém apenas 50 entradas
  }

  /**
   * Trata erros
   */
  private tratarErro(message: string): void {
    this.estado.update((estado) => ({
      ...estado,
      exibicao: 'Erro',
      expressao: message,
    }));

    // Reseta após 2 segundos
    setTimeout(() => this.limpar(), 2000);
  }

  /**
   * Limpa o histórico (método público)
   */
  public limparHistorico(): void {
    this.historico.set([]);
  }
}
