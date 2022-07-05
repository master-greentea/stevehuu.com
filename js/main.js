$(function () {
  $("._footer").load("/master_htmls/footer.html");

  setInterval(() => {
    $("#flash").fadeIn(200);
    $("#flash").fadeOut(200);
  }, 200);

  setInterval(() => {
    $(".blink").fadeIn(500);
    $(".blink").fadeOut(500);
  }, 500);
});
