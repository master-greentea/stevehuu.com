// displaying header
function dHeader(time) {
  $("#header-pullout").fadeOut(100);
  setTimeout(function () {
    $("header").animate({ top: "0" }, time);
    $("nav").fadeIn(time);
  }, 100);
}
function undHeader(time) {
  $("header").animate({ top: "-80px" }, time);
  $("nav").fadeOut(time);
  setTimeout(function () {
    $("#header-pullout").fadeIn(300);
  }, time);
}

$(function () {
  var onHeader = false;
  var displayHeader = false;
  // check if hovering above header
  setInterval(() => {
    if ($("header:hover").length != 0) {
      onHeader = true;
    } else {
      onHeader = false;
    }
  }, 11);

  var onMobile = window.matchMedia("(max-width: 1319px)").matches;

  // load header
  PageSetup(
    "",
    "#nav-link-stuff"
  );
  // run if not on mobile
  if (!onMobile) {
    setTimeout(function () {
      undHeader(750);
    }, 500);

    var pullOutTimer = 0;
    setInterval(() => {
      if (!onHeader && displayHeader) {
        pullOutTimer++;
        if (pullOutTimer > 150) {
          undHeader(500);
          displayHeader = false;
        }
      } else {
        pullOutTimer = 0;
      }
    }, 10);

    $("#header-pullout").click(function () {
      dHeader(500);
      displayHeader = true;
    });
  }
});
