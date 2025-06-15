/*
  Propósito: Arquivo de configuração e inicialização do Amazon Cognito Auth SDK.
*/

const config = {
  cognito: {
    userPoolId: "us-east-2_EkGyR36BO",
    cognitoDomain: "us-east-2ekgyr36bo.auth.us-east-2.amazoncognito.com",
    appId: "6lge1sn9qovcmh3itop91ltj13",
  },
};

var cognitoApp = {
  auth: {},
  Init: function () {
    var authData = {
      ClientId: config.cognito.appId, // ID do aplicativo do Cognito
      AppWebDomain: config.cognito.cognitoDomain, // Domínio do Cognito
      TokenScopesArray: ["email", "openid", "profile"], // Escopos do token
      RedirectUriSignIn: "http://localhost/hotel/", // URL de redirecionamento após login
      RedirectUriSignOut: "http://localhost/hotel/", // URL de redirecionamento após logout
      UserPoolId: config.cognito.userPoolId, // ID do pool de usuários do Cognito
      AdvancedSecurityDataCollectionFlag: false, // Flag de coleta de dados avançada
      Storage: null, // Armazenamento de dados (Usa localStorage padrão)
    };

    // Inicializa o Cognito Auth
    cognitoApp.auth = new AmazonCognitoIdentity.CognitoAuth(authData);

    // Usa o fluxo implícito (token)
    cognitoApp.auth.useImplicitFlow();

    // Define o manipulador de eventos do usuário
    cognitoApp.auth.userhandler = {
      onSuccess: function (result) {
        console.log("Autenticação bem-sucedida:", result);
      },
      onFailure: function (err) {
        console.error("Erro de autenticação:", err);
        // Tenta redirecionar para a página inicial em caso de erro
        window.location.href = "/hotel/";
      },
    };
  },
};
