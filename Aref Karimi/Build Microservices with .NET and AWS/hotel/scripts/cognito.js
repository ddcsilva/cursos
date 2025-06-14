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
      RedirectUriSignIn: "http://localhost/hotel/",
      RedirectUriSignOut: "http://localhost/hotel/",
      UserPoolId: config.cognito.identityPoolId,
      AdvancedSecurityDataCollectionFlag: false,
      Storage: null,
    };

    cognitoApp.auth = new AmazonCognitoIdentity.CognitoAuth(authData);
    cognitoApp.auth.userhandler = {
      onSuccess: function (result) {},
      onFailure: function (err) {},
    };
  },
};
