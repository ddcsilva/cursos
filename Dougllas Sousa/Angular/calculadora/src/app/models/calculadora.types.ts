// Tipos de operações disponíveis
export type Operacao = '+' | '-' | 'x' | '÷' | '=';

// Tipos de comandos especiais
export type Comando = 'C' | 'CE' | '⌫' | '±' | '%' | '√' | 'x²';

// Tipo unificado para todos os botões
export type TipoBotao = 'numero' | 'operacao' | 'comando' | 'decimal' | 'igual';

// Interface para um botão da calculadora
export interface BotaoCalculadora {
  valor: string;
  tipo: TipoBotao;
  exibicao: string;
  classeCSS?: string;
}

// Interface para o estado da calculadora
export interface EstadoCalculadora {
  valorAtual: string;
  valorAnterior: string;
  operacao: Operacao | null;
  aguardandoOperando: boolean;
  exibicao: string;
  expressao: string;
}

// Interface para entrada do histórico
export interface EntradaHistorico {
  id: string;
  expressao: string;
  resultado: string;
  timestamp: Date;
}

// Interface para eventos de botão
export interface EventoBotao {
  valor: string;
  tipo: TipoBotao;
}
