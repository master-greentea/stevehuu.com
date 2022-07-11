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

  //Get the button:
  mybutton = document.getElementById("back-to-top");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 150 ||
      document.documentElement.scrollTop > 150
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  $(mybutton).click(function () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  });
});
