// Importando o módulo fs (file system)
// O módulo fs é um módulo que permite a leitura e escrita de arquivos.
// require é uma função que permite importar um módulo.
const fs = require("fs");

// Lendo o arquivo arquivo.txt
// O método readFile é um método assíncrono que permite ler o conteúdo de um arquivo.
// O primeiro parâmetro é o nome do arquivo a ser lido.
// O segundo parâmetro é a codificação do arquivo.
// O terceiro parâmetro é uma função que recebe dois parâmetros: err e data.
// err é o erro que ocorreu, se houver.
// data é o conteúdo do arquivo.
fs.readFile("arquivo1.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("Erro ao ler o arquivo:", err);
    return;
  }

  console.log("Conteúdo do arquivo:", data);
});
