/*
  Arquivo principal que contém toda a lógica de autenticação, manipulação de tokens e interação com a UI.
*/

const dadosUsuarioAutenticado = {
  currentUserId: "",
  idToken: "",
  role: "",
};

/**
 * Função para carregar os dados do usuário autenticado
 */
function inicializarAutenticacao() {
  // 1. Processa resposta do Cognito na URL
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

    console.info(dadosUsuarioAutenticado);

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
    dadosUsuarioAutenticado.role = "";
    dadosUsuarioAutenticado.idToken = "";
    dadosUsuarioAutenticado.currentUserId = "";
    cognitoApp.auth.signOut();
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
}

/**
 * Função para decodificar o token JWT
 * @param {string} token - Token JWT a ser decodificado
 * @returns {Object} - Objeto JSON contendo os dados do token
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
 * Função para configurar o cabeçalho de autenticação
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
        window.location.href = "/hotel/admin.html";
      },
    });
  });
}
