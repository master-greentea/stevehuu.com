var myVar;

function loading() {
  myVar = setTimeout(showPage, 1500);
}

function showPage() {
  $(".loader").css("display", "none");
  $(".all-content").css("display", "block");
}
