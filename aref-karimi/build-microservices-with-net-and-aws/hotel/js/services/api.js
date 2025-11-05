/**
 * @fileoverview Serviços para comunicação com a API
 * @description Gerencia todas as chamadas à API, incluindo autenticação,
 * envio de formulários e manipulação de respostas.
 */

/**
 * @namespace apiService
 * @description Namespace contendo todos os serviços relacionados à API
 */
const apiService = {
  /**
   * Envia dados do formulário para a API com autenticação
   * @param {string} url - URL do endpoint da API
   * @param {FormData} formData - Dados do formulário a serem enviados
   * @param {string} token - Token JWT para autenticação
   * @returns {Promise} Promise que resolve com a resposta da API
   * @throws {Error} Se houver erro na requisição
   * @description
   * Realiza uma requisição POST para a API com:
   * - Token JWT no cabeçalho Authorization
   * - Dados do formulário como multipart/form-data
   * - Tratamento adequado de erros
   */
  enviarFormulario: function (url, formData, token) {
    return $.ajax({
      url: url,
      type: "POST",
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", "Bearer " + token);
        request.setRequestHeader("Content-type", "multipart/form-data");
      },
      data: formData,
      contentType: true,
      processData: false,
    });
  },

  /**
   * Configura os handlers de formulário para envio autenticado
   * @param {string} token - Token JWT para autenticação
   * @param {string} redirectUrl - URL de redirecionamento após sucesso
   * @description
   * Configura todos os formulários da página para:
   * 1. Interceptar o envio padrão
   * 2. Enviar dados via AJAX com autenticação
   * 3. Redirecionar após sucesso
   * 4. Tratar erros adequadamente
   */
  configurarFormularios: function (token, redirectUrl) {
    const forms = $("form");
    forms.submit(function (event) {
      event.preventDefault();
      const formData = new FormData($(this)[0]);

      apiService
        .enviarFormulario($(this).attr("action"), formData, token)
        .then(() => {
          window.location.href = "/hotel/pages/admin.html";
        })
        .catch((error) => {
          console.error("Erro ao enviar formulário:", error);
          // TODO: Implementar feedback visual do erro para o usuário
        });
    });
  },
};
