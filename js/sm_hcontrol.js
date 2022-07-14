$(function () {
  var onHeader = false;
  var displayHeader = false;
  setInterval(() => {
    if ($("header:hover").length != 0) {
      onHeader = true;
    } else {
      onHeader = false;
    }
  }, 11);

  function dHeader(time) {
    $("#header-pullout").fadeOut(300);
    setTimeout(function () {
      $("header").animate({ top: "0" }, time);
      $("nav").fadeIn(time);
    }, 300);
  }
  function undHeader(time) {
    $("header").animate({ top: "-79px" }, time);
    $("nav").fadeOut(time);
    setTimeout(function () {
        $("#header-pullout").fadeIn(300);
      }, time);
  }

  var currentMouseYPos = -1;
  $(document).mousemove(function (event) {
    currentMouseYPos = event.pageY;
  });

  $("._header").load("master_htmls/header.html", function () {
    $("#morse").html("<img style='height: 40px;' src='/images/stuff/stuffmachine_logo_icon.png' />");
    $("header").css("z-index", "9999")
    $("#nav-link-stuff").attr("class", "nav-link current-page");

    setTimeout(function () {
      undHeader(750);
    }, 4000);

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
  });
});
