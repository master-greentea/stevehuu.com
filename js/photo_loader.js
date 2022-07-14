function loading() {
  setTimeout(showPage, 1500);
}

function showPage() {
  $("#photo-loader").css("display", "none");
  $(".all-content").css("display", "block");
}
