/**
 * @fileoverview Utilitários para manipulação de tokens JWT
 * @description Fornece funções para decodificação e extração de informações
 * de tokens JWT usados na autenticação.
 */

/**
 * Decodifica um token JWT para extrair suas informações
 * @param {string} token - Token JWT a ser decodificado
 * @returns {Object} Objeto contendo os dados do token decodificado
 * @throws {Error} Se o token for inválido ou mal formatado
 * @description
 * O token JWT é composto por três partes separadas por pontos:
 * 1. Header (algoritmo e tipo do token)
 * 2. Payload (dados do token)
 * 3. Signature (assinatura)
 *
 * Esta função:
 * 1. Extrai a parte do payload (segunda parte)
 * 2. Converte de base64url para base64
 * 3. Decodifica o base64
 * 4. Converte os bytes para string UTF-8
 * 5. Parseia o JSON resultante
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
 * Extrai informações do usuário do token JWT
 * @param {string} token - Token JWT contendo informações do usuário
 * @returns {Object} Objeto contendo informações do usuário
 * @property {string} userId - ID único do usuário
 * @property {string} role - Papel do usuário (Admin, User, etc)
 * @property {string} email - Email do usuário
 * @description
 * Extrai informações comuns do token JWT:
 * - sub: ID do usuário
 * - cognito:groups: Papel do usuário
 * - email: Email do usuário
 */
function extrairDadosUsuario(token) {
  const tokenDetails = decodificarTokenJwt(token);
  return {
    userId: tokenDetails.sub,
    role: tokenDetails["cognito:groups"] ? tokenDetails["cognito:groups"][0] : "",
    email: tokenDetails.email,
  };
}
