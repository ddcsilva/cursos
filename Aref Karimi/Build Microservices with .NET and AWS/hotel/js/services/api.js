/**
 * Serviços para comunicação com a API
 */

const apiService = {
  /**
   * Envia dados do formulário para a API
   * @param {string} url - URL do endpoint
   * @param {FormData} formData - Dados do formulário
   * @param {string} token - Token de autenticação
   * @returns {Promise} - Promise com a resposta da API
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
   * Configura os handlers de formulário
   * @param {string} token - Token de autenticação
   * @param {string} redirectUrl - URL de redirecionamento após sucesso
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
        });
    });
  },
};
