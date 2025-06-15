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
      UserPoolId: config.cognito.identityPoolId, // ID do pool de usuários do Cognito
      AdvancedSecurityDataCollectionFlag: false, // Flag de coleta de dados avançada
      Storage: null, // Armazenamento de dados (Usa localStorage padrão)
    };

    // Inicializa o Cognito Auth
    cognitoApp.auth = new AmazonCognitoIdentity.CognitoAuth(authData);

    // Define o manipulador de eventos do usuário
    cognitoApp.auth.userhandler = {
      onSuccess: function (result) {}, // Função chamada quando o login é bem-sucedido
      onFailure: function (err) {},
    };
  },
};
