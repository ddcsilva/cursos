// Exportando um objeto com um método somar
// module.exports é um objeto que permite exportar um módulo
// Preciso colocar somente o nome do método somar(a, b), sem o function
module.exports = {
  somar(a, b) {
    console.log(a + b);
  },
};
