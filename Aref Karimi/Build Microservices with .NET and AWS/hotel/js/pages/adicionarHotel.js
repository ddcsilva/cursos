$(function () {
  cognitoApp.Init();
  inicializarAutenticacao();

  configurarCabecalhoAutenticacao();
  $("#userId").val(dadosUsuarioAutenticado.currentUserId);
  $("#idToken").val(dadosUsuarioAutenticado.idToken);
});
