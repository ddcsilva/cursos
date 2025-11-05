// minimist é um módulo que permite que você passe argumentos para o seu programa
// Exemplo: node index.js --nome=Danilo --profissao=Programador
const minimist = require("minimist");

// process.argv é um array que contém os argumentos passados para o programa
const args = minimist(process.argv.slice(2));
// Operador de desestruturação é uma forma de extrair valores de um objeto
const { nome, profissao } = args;

if (!nome || !profissao) {
  console.log("Erro: Nome e profissão são obrigatórios");
  return;
}

console.log(`O nome dele é ${nome} e a profissão é ${profissao}`);
