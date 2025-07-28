// O módulo path é um módulo que permite manipular caminhos de arquivos
const path = require("path");

// O método extname é um método que permite obter a extensão de um arquivo
const extension = path.extname("documento.pdf");

console.log(`A extensão do arquivo é: ${extension}`);
