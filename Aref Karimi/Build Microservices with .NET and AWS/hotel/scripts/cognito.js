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
      ClientId: config.cognito.appId,
      AppWebDomain: config.cognito.cognitoDomain,
      TokenScopesArray: ["email", "openid", "profile"],
      RedirectUriSignIn: window.location.origin + "/hotel/",
      RedirectUriSignOut: window.location.origin + "/hotel/",
      UserPoolId: config.cognito.userPoolId,
      AdvancedSecurityDataCollectionFlag: false,
      Storage: null,
      ResponseType: "token",
      IdentityProvider: "",
      UserAttributes: ["email"],
      AuthenticationFlowType: "USER_SRP_AUTH",
    };

    cognitoApp.auth = new AmazonCognitoIdentity.CognitoAuth(authData);
    cognitoApp.auth.userhandler = {
      onSuccess: function (result) {
        console.log("Sign in success", result);
      },
      onFailure: function (err) {
        console.error("Sign in error", err);
      },
    };
  },
};
