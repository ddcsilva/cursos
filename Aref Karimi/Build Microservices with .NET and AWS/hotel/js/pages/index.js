$(function () {
  // Configura o Cognito Auth
  cognitoApp.Init();
  // Carrega o estado da página
  inicializarAutenticacao();
  // Cria as rotas de navegação baseadas no papel do usuário
  criarRotas();
});

/*
 * Função para criar as rotas de navegação baseadas no papel do usuário
 */
function criarRotas() {
  // Verifica se o usuário está autenticado
  if (dadosUsuarioAutenticado) {
    // Verifica se o usuário tem um papel
    if (dadosUsuarioAutenticado.role !== "") {
      // Verifica se o usuário é um administrador
      if (dadosUsuarioAutenticado.role == "Admin") {
        window.location.href = "/hotel/pages/admin.html"; // Redireciona para a página de administração
      }

      // Verifica se o usuário é um gerente de hotel
      if (dadosUsuarioAutenticado.role == "HotelManager") {
        window.location.href = "/hotel/review-bookings.html"; // Redireciona para a página de avaliações de reservas
      }
    } else {
      // Verifica se o usuário tem um ID de usuário
      if (dadosUsuarioAutenticado.currentUserId !== "") {
        window.location.href = "/hotel/search.html"; // Redireciona para a página de busca de hotéis
      }
    }
  }
}
