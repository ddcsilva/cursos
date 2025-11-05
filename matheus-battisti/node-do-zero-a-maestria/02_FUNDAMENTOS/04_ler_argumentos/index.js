// process.argv é um array que contém os argumentos passados na linha de comando
console.log(process.argv);

// O slice é um método que permite cortar um array
const args = process.argv.slice(2);

console.log(args);

// O split é um método que permite dividir uma string em um array a partir de um caractere
const nome = args[0].split("=")[1];
const idade = args[1].split("=")[1];

console.log(`Meu nome é ${nome} e tenho ${idade} anos`);
