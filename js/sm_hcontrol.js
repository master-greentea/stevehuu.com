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

  // displaying header
  function dHeader(time) {
    $("#header-pullout").fadeOut(100);
    setTimeout(function () {
      $("header").animate({ top: "0" }, time);
      $("nav").fadeIn(time);
    }, 100);
  }
  function undHeader(time) {
    $("header").animate({ top: "-79px" }, time);
    $("nav").fadeOut(time);
    setTimeout(function () {
      $("#header-pullout").fadeIn(300);
    }, time);
  }

  // load header
  $("._header").load("master_htmls/header.html", function () {
    // initial
    $("#morse").html(
      "<img style='height: 40px;' src='/images/stuff/stuffmachine_logo_icon.png' />"
    );
    $("header").css("z-index", "9999");
    $("#nav-link-stuff").attr("class", "nav-link current-page");


    if (!onMobile) {
      setTimeout(function () {
        undHeader(750);
      }, 3500);

      var timer = 0;
    setTimeout(function () {
      setInterval(() => {
        if (!onHeader && displayHeader) {
          timer++;
          if (timer > 150) {
            undHeader(500);
            displayHeader = false;
          }
        } else {
          timer = 0;
        }
      }, 10);

      $("#header-pullout").click(function () {
        dHeader(500);
        displayHeader = true;
      });
    }, 4500);
    }
  });
});
