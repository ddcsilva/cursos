/**
 * Utilitários para manipulação de tokens JWT
 */

/**
 * Decodifica um token JWT
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
 * Extrai informações do usuário do token
 * @param {string} token - Token JWT
 * @returns {Object} - Objeto contendo informações do usuário
 */
function extrairDadosUsuario(token) {
  const tokenDetails = decodificarTokenJwt(token);
  return {
    userId: tokenDetails.sub,
    role: tokenDetails["cognito:groups"] ? tokenDetails["cognito:groups"][0] : "",
    email: tokenDetails.email,
  };
}
