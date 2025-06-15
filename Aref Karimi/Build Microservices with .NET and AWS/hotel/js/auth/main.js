/**
 * @fileoverview Arquivo principal de autenticação e gerenciamento de usuário
 * @description Gerencia todo o fluxo de autenticação, incluindo login, logout,
 * manipulação de tokens e interação com a UI. Integra-se com o Amazon Cognito
 * para autenticação e autorização.
 */

/**
 * @typedef {Object} DadosUsuario
 * @property {string} currentUserId - ID do usuário atual
 * @property {string} idToken - Token JWT de autenticação
 * @property {string} role - Papel do usuário (Admin, User, etc)
 */

/**
 * @type {DadosUsuario}
 * Armazena os dados do usuário autenticado na sessão atual
 */
const dadosUsuarioAutenticado = {
  currentUserId: "",
  idToken: "",
  role: "",
};

/**
 * Inicializa o processo de autenticação e configura os eventos da UI
 * @description
 * 1. Processa a resposta do Cognito na URL (callback após login)
 * 2. Recupera o usuário atual do localStorage
 * 3. Se existir usuário, obtém a sessão e tokens
 * 4. Extrai informações do token JWT
 * 5. Configura eventos de login/logout
 * 6. Atualiza a interface baseado no estado de autenticação
 */
function inicializarAutenticacao() {
  try {
    // 1. Processa resposta do Cognito na URL (callback após login)
    cognitoApp.auth.parseCognitoWebResponse(window.location.href);

    // 2. Obtém usuário atual do localStorage
    var currentUser = cognitoApp.auth.getCurrentUser();

    // 3. Se usuário existir, obtém sessão e tokens
    if (currentUser) {
      cognitoApp.auth.getSession();
      currentSession = cognitoApp.auth.signInUserSession;

      // 4. Extrai informações do token
      dadosUsuarioAutenticado.currentUserId = currentUser;
      dadosUsuarioAutenticado.idToken = currentSession.idToken.jwtToken;

      console.info("Usuário autenticado:", dadosUsuarioAutenticado);

      // 5. Decodifica token para obter roles
      var tokenDetails = decodificarTokenJwt(currentSession.idToken.jwtToken);
      if (tokenDetails["cognito:groups"]) {
        var groups = tokenDetails["cognito:groups"][0];
        dadosUsuarioAutenticado.role = groups;
      }
    }

    // 6. Configura evento de clique para o botão de login
    $("#btnSignIn").on("click", function (btn) {
      cognitoApp.auth.getSession();
    });

    // 7. Configura evento de clique para o botão de logout
    $("#btnSignOut").on("click", function (btn) {
      try {
        // Limpa os dados do usuário
        dadosUsuarioAutenticado.role = "";
        dadosUsuarioAutenticado.idToken = "";
        dadosUsuarioAutenticado.currentUserId = "";

        // Limpa o localStorage
        localStorage.clear();

        // Executa o logout
        cognitoApp.auth.signOut();

        // Redireciona para a página inicial
        window.location.href = "/hotel/";
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      }
    });

    // 8. Oculta os botões de login e logout
    $("#btnSignOut").hide();
    $("#btnSignIn").hide();

    // 9. Mostra os botões de login e logout
    if (dadosUsuarioAutenticado.currentUserId === "") {
      $("#btnSignIn").show();
    } else {
      $("#btnSignOut").show();
    }
  } catch (error) {
    console.error("Erro ao inicializar autenticação:", error);
  }
}

/**
 * Decodifica um token JWT para extrair suas informações
 * @param {string} token - Token JWT a ser decodificado
 * @returns {Object} Objeto contendo os dados do token decodificado
 * @description
 * O token JWT é composto por três partes separadas por pontos:
 * 1. Header (algoritmo e tipo do token)
 * 2. Payload (dados do token)
 * 3. Signature (assinatura)
 * Esta função decodifica a parte do payload (segunda parte)
 */
function decodificarTokenJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

/**
 * Configura o cabeçalho de autenticação para requisições AJAX
 * @description
 * Intercepta o envio de formulários para:
 * 1. Adicionar o token JWT no cabeçalho Authorization
 * 2. Configurar o tipo de conteúdo como multipart/form-data
 * 3. Enviar os dados via AJAX
 * 4. Redirecionar após sucesso
 */
function configurarCabecalhoAutenticacao() {
  var forms = $("form");
  forms.submit(function (event) {
    // 1. Impede o envio normal do formulário
    event.preventDefault();

    // 2. Obtém os dados do formulário
    var formData = new FormData($(this)[0]);
    console.log(formData);

    // 3. Configura a requisição AJAX
    $.ajax({
      url: $(this).attr("action"),
      type: "POST",
      // 4. Configura o cabeçalho de autenticação
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", "Bearer " + dadosUsuarioAutenticado.idToken);
        request.setRequestHeader("Content-type", "multipart/form-data");
      },
      // 5. Configura os dados do formulário
      data: formData,
      // 6. Configura o tipo de conteúdo
      contentType: true,
      // 7. Configura o processamento de dados
      processData: false,
      // 8. Configura a função de sucesso
      success: function (response) {
        // 9. Redireciona para a página de administração
        window.location.href = "/hotel/pages/admin.html";
      },
    });
  });
}
