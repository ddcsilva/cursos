const { exec } = require("child_process");
const readline = require("readline");

const VERSOES_NODE = [
  { id: 1, name: "Angular 20 - Code Dimension", version: "20.19.0" },
  { id: 2, name: "Angular 19 - Alura", version: "22.11.0" },
];

class NodeSwitcher {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  exibirMenu() {
    console.log("\n=== Node Version Switcher ===\n");

    VERSOES_NODE.forEach(({ id, name, version }) => {
      console.log(`${id}. ${name} (v${version})`);
    });

    console.log("0. Sair\n");
  }

  /**
   * Executa o comando nvm use
   * @param {string} version - Versão do Node.js
   * @returns {Promise<string>} - Resultado do comando
   */
  async executarComandoNvm(version) {
    return new Promise((resolve, reject) => {
      exec(`nvm use ${version}`, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`Erro ao executar nvm: ${error.message}`));
          return;
        }

        const output = stderr ? stderr.trim() : stdout.trim();
        resolve(output);
      });
    });
  }

  /**
   * Processa a escolha do usuário
   * @param {string} choice - Opção selecionada
   */
  async processarEscolha(choice) {
    const numeroEscolhido = parseInt(choice.trim());

    if (numeroEscolhido === 0) {
      console.log("\nAté logo!");
      this.rl.close();
      process.exit(0);
    }

    const versaoSelecionada = VERSOES_NODE.find((v) => v.id === numeroEscolhido);
    if (!versaoSelecionada) {
      console.log("Opção inválida! Tente novamente.\n");
      this.iniciar();
      return;
    }

    try {
      console.log(`\nMudando para ${versaoSelecionada.name} (v${versaoSelecionada.version})...`);

      const result = await this.executarComandoNvm(versaoSelecionada.version);

      console.log(`${result}`);
      console.log(`\nNode.js configurado para ${versaoSelecionada.name}!`);
    } catch (error) {
      console.log(`${error.message}`);
    }

    this.rl.close();
    process.exit(0);
  }

  iniciar() {
    this.exibirMenu();

    this.rl.question("Escolha uma opção: ", (choice) => {
      this.processarEscolha(choice);
    });
  }
}

const switcher = new NodeSwitcher();
switcher.iniciar();
