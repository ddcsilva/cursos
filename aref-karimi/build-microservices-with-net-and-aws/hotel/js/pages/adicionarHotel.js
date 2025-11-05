$(function () {
  // Inicializa os componentes básicos da página
  inicializarPagina();

  // Configura o cabeçalho de autenticação para o formulário
  configurarCabecalhoAutenticacao();

  // Preenche os campos ocultos com dados do usuário
  $("#userId").val(dadosUsuarioAutenticado.currentUserId);
  $("#idToken").val(dadosUsuarioAutenticado.idToken);
});
