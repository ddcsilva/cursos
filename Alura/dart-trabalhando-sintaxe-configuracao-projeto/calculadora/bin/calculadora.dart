import 'dart:io'; // Importa a biblioteca de entrada e saída

// Função principal que será executada quando o programa for iniciado
void main() {
  // double.parse() é uma função que converte um texto em um número double
  // readLineSync() é uma função que lê uma linha de texto do usuário
  // print() é uma função que imprime um texto na tela
  // ! é usado para indicar que a variável não pode ser nula

  double numeroUm = double.parse(stdin.readLineSync()!);
  double numeroDois = double.parse(stdin.readLineSync()!);
  print(numeroUm + numeroDois);
}
