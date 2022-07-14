function generalListAnim() {
  setInterval(() => {
    var now = new Date(Date.now());
    var formatted =
      now.getHours() +
      ":" +
      now.getMinutes() +
      ":" +
      now.getSeconds() +
      ":" +
      now.getMilliseconds() +
      " TZ-OFFSET:" +
      now.getTimezoneOffset();
    $("#current-time").html(formatted);
  }, 1);
  setTimeout(function () {
    $("#general-list").css("display", "block");
  }, 500);
  setTimeout(function () {
    $("#logged-in").html("maste_");
  }, 600);
  setTimeout(function () {
    $("#logged-in").html("tigerh");
  }, 650);
  setTimeout(function () {
    $("#logged-in").html("matcha-menace");
  }, 750);
  setTimeout(function () {
    $("#logged-in").html("masterhuhu");
  }, 1900);
}

// 1150
function checklistAnim() {
  var onMobile = window.matchMedia("(max-width: 767px)").matches;

  setTimeout(function () {
    $("#checklist").css("display", "block");
  }, 1150);
  setTimeout(function () {
    $("#on-mobile-li").css("display", "block");
  }, 1350);
  setTimeout(function () {
    if (onMobile) {
      $("#on-mobile").html("<span style='color: #f23e3e'>Y.</span>");
    } else {
      $("#on-mobile").html("<span style='color: #31E863'>N.</span>");
    }
  }, 1600);

  setTimeout(function () {
    $("#meter-li").css("display", "block");
  }, 1700);

  // if not on mobile
  if (!onMobile) {
    var initialStar = 42 * 4;
    setInterval(() => {
      $("#meter").html((initialStar *= 13));
    }, 50);

    setTimeout(function () {
      $(".rest-li").css("display", "block");
    }, 2500);

    setTimeout(function () {
      $("#acsii-art").css("display", "block");
      $("#acsii-art").animate({fontSize: ".75em"})
    }, 3500);

    setTimeout(showStuff, 5500);
  }

  // if on mobile
  else {}
}

function booting() {
  generalListAnim();

  var checkingAnim = setInterval(() => {
    $("#checking").animate({ letterSpacing: "+=15px" }, 300);
    $("#checking").animate({ letterSpacing: "-=15px" }, 300);
  }, 600);

  checklistAnim();
}

function showStuff() {
  $("#stuff-machine-loader").css("display", "none");
  $("#stuff-space").css("display", "block");
}
