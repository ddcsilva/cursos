import { BotaoCalculadora } from '../models/calculadora.types';

// Layout dos botões da calculadora (4x5 grid)
export const BOTOES_CALCULADORA: BotaoCalculadora[][] = [
  // Primeira linha - Comandos
  [
    { valor: 'C', tipo: 'comando', exibicao: 'C', classeCSS: 'btn-command' },
    { valor: 'CE', tipo: 'comando', exibicao: 'CE', classeCSS: 'btn-command' },
    { valor: '⌫', tipo: 'comando', exibicao: '⌫', classeCSS: 'btn-command' },
    { valor: '÷', tipo: 'operacao', exibicao: '÷', classeCSS: 'btn-operation' },
  ],
  // Segunda linha
  [
    { valor: '7', tipo: 'numero', exibicao: '7', classeCSS: 'btn-number' },
    { valor: '8', tipo: 'numero', exibicao: '8', classeCSS: 'btn-number' },
    { valor: '9', tipo: 'numero', exibicao: '9', classeCSS: 'btn-number' },
    { valor: '×', tipo: 'operacao', exibicao: '×', classeCSS: 'btn-operation' },
  ],
  // Terceira linha
  [
    { valor: '4', tipo: 'numero', exibicao: '4', classeCSS: 'btn-number' },
    { valor: '5', tipo: 'numero', exibicao: '5', classeCSS: 'btn-number' },
    { valor: '6', tipo: 'numero', exibicao: '6', classeCSS: 'btn-number' },
    { valor: '-', tipo: 'operacao', exibicao: '-', classeCSS: 'btn-operation' },
  ],
  // Quarta linha
  [
    { valor: '1', tipo: 'numero', exibicao: '1', classeCSS: 'btn-number' },
    { valor: '2', tipo: 'numero', exibicao: '2', classeCSS: 'btn-number' },
    { valor: '3', tipo: 'numero', exibicao: '3', classeCSS: 'btn-number' },
    { valor: '+', tipo: 'operacao', exibicao: '+', classeCSS: 'btn-operation' },
  ],
  // Quinta linha
  [
    { valor: '±', tipo: 'comando', exibicao: '±', classeCSS: 'btn-number' },
    { valor: '0', tipo: 'numero', exibicao: '0', classeCSS: 'btn-number' },
    { valor: '.', tipo: 'decimal', exibicao: '.', classeCSS: 'btn-number' },
    { valor: '=', tipo: 'igual', exibicao: '=', classeCSS: 'btn-equals' },
  ],
];

// Botões adicionais para operações científicas (futuro)
export const BOTOES_CIENTIFICOS: BotaoCalculadora[] = [
  { valor: '√', tipo: 'comando', exibicao: '√', classeCSS: 'btn-scientific' },
  { valor: 'x²', tipo: 'comando', exibicao: 'x²', classeCSS: 'btn-scientific' },
  { valor: '%', tipo: 'comando', exibicao: '%', classeCSS: 'btn-scientific' },
];

// Mapeamento de teclas do teclado
export const MAPA_TECLADO: { [key: string]: string } = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '+': '+',
  '-': '-',
  '*': 'x',
  '/': '÷',
  Enter: '=',
  '=': '=',
  '.': '.',
  Escape: 'C',
  Delete: 'CE',
  Backspace: '⌫',
};
