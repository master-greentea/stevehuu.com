$(function () {
  $("._footer").load("master_htmls/footer.html");

  setInterval(() => {
    $("#someElement").fadeIn(200);
    $("#someElement").fadeOut(200);
  }, 200);
});
