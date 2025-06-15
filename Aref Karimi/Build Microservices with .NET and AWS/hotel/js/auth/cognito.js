/**
 * @fileoverview Configuração e inicialização do Amazon Cognito Auth SDK
 * @description Gerencia a integração com o Amazon Cognito para autenticação
 * e autorização de usuários.
 */

/**
 * @typedef {Object} CognitoConfig
 * @property {string} userPoolId - ID do User Pool do Cognito
 * @property {string} cognitoDomain - Domínio do Cognito
 * @property {string} appId - ID do aplicativo no Cognito
 */

/**
 * @type {CognitoConfig}
 * Configuração do Cognito para autenticação
 */
const config = {
  cognito: {
    userPoolId: "us-east-2_EkGyR36BO",
    cognitoDomain: "us-east-2ekgyr36bo.auth.us-east-2.amazoncognito.com",
    appId: "6lge1sn9qovcmh3itop91ltj13",
  },
};

/**
 * @namespace cognitoApp
 * @description Namespace principal para integração com o Cognito
 */
var cognitoApp = {
  auth: {},

  /**
   * Inicializa a integração com o Cognito
   * @description
   * Configura o Cognito Auth SDK com:
   * - Credenciais do aplicativo
   * - URLs de redirecionamento
   * - Escopos do token
   * - Handlers de eventos
   */
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
      /**
       * Handler de sucesso na autenticação
       * @param {Object} result - Resultado da autenticação
       */
      onSuccess: function (result) {
        console.log("Autenticação bem-sucedida:", result);
      },

      /**
       * Handler de erro na autenticação
       * @param {Error} err - Erro ocorrido
       */
      onFailure: function (err) {
        console.error("Erro de autenticação:", err);
        // Tenta redirecionar para a página inicial em caso de erro
        window.location.href = "/hotel/";
      },
    };
  },
};
