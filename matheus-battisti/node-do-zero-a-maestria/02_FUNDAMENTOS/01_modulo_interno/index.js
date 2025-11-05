// Importando o módulo meu_modulo.js
// Eu não preciso colocar a extensão do arquivo
// require é uma função que permite importar um módulo
const meuModulo = require("./meu_modulo");

// Acessando o método somar do módulo meu_modulo.js
// Criando uma variável soma fica melhor para chamar o método
const somar = meuModulo.somar;

somar(2, 3);
somar(5, 10);
