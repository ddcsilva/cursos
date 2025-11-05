$(function () {
  // Inicializa os componentes básicos da página
  inicializarPagina();

  // Carrega a lista de hotéis
  populateHotelsList(dadosUsuarioAutenticado.idToken);
});

function populateHotelsList(idToken) {
  var s3BaseUrl = "https://hotel-admin-bucket.s3.ap-southeast-2.amazonaws.com";

  // replace the 'url' attribute below to your API's URL
  $.ajax({
    url: "<api url here>",
    type: "get",
    data: { token: idToken },
    dataType: "json",
    success: function (response) {
      var table = $("#divHotelList tbody");
      $.each(response.Hotels, function (index, hotel) {
        var row = $("<tr>");
        row.append($("<td>").text(hotel.Name));
        row.append($("<td>").text(hotel.CityName));
        row.append($("<td>").text(hotel.Price));
        row.append($("<td>").text(hotel.Rating));

        var imageTag = $("<img>");
        imageTag.attr("src", s3BaseUrl.concat("/", hotel.FileName));
        imageTag.css("width", 300);
        row.append($("<td>").append(imageTag));
        table.append(row);
      });
    },
  });
}
