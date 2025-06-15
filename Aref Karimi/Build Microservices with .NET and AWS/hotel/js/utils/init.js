/**
 * @fileoverview Arquivo de inicialização comum para todas as páginas
 * @description Fornece funções de inicialização básicas que são compartilhadas
 * entre todas as páginas da aplicação.
 */

/**
 * Inicializa os componentes básicos da página
 * @description
 * 1. Inicializa o Cognito Auth
 * 2. Inicializa a autenticação
 * 3. Configura eventos comuns
 */
function inicializarPagina() {
  // Inicializa o Cognito Auth
  cognitoApp.Init();

  // Inicializa a autenticação
  inicializarAutenticacao();

  // Configura eventos comuns
  configurarEventosComuns();
}

/**
 * Configura eventos comuns a todas as páginas
 * @description
 * Configura eventos que são compartilhados entre todas as páginas,
 * como manipulação de erros AJAX e validações comuns.
 */
function configurarEventosComuns() {
  // Configura handler global de erros AJAX
  $(document).ajaxError(function (event, jqXHR, settings, error) {
    console.error("Erro na requisição AJAX:", error);

    // Se o erro for de autenticação, redireciona para login
    if (jqXHR.status === 401) {
      window.location.href = "/hotel/";
    }
  });

  // Configura validações comuns de formulários
  $("form").on("submit", function (event) {
    if (!this.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    $(this).addClass("was-validated");
  });
}
