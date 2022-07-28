function generalListAnim() {
  setInterval(() => {
    var now = new Date(Date.now());
    var formatted = now.toISOString();
    $("#current-time").html(formatted);
  }, 1);
  setTimeout(function () {
    $("#general-list").css("display", "block");
  }, 300);
  setTimeout(function () {
    $("#logged-in").html("maste_");
  }, 400);
  setTimeout(function () {
    $("#logged-in").html("tigerh");
  }, 630);
  setTimeout(function () {
    $("#logged-in").html("tigerh.");
  }, 1050);
  setTimeout(function () {
    $("#logged-in").html("matcha-menace");
  }, 1110);
  setTimeout(function () {
    $("#logged-in").html("masterhuhu");
  }, 1600);
}

// 1150
function checklistAnim() {
  var onMobile = window.matchMedia("(max-width: 1319px)").matches;

  setTimeout(function () {
    $("#checklist").css("display", "block");
  }, 950);
  setTimeout(function () {
    $("#on-mobile-li").css("display", "block");
  }, 1250);
  setTimeout(function () {
    if (onMobile) {
      $("#on-mobile").html("<span style='color: #f23e3e'>Y.</span>");
    } else {
      $("#on-mobile").html("<span style='color: #31E863'>N.</span>");
    }
  }, 1400);

  // if not on mobile
  if (!onMobile) {
    $("#acsii-prop").css("display", "block");

    setTimeout(function () {
      $("#meter-li").css("display", "block");
    }, 1700);

    var initialStar = 42 * 4;
    setInterval(() => {
      $("#meter").html((initialStar *= 13));
    }, 50);

    setTimeout(function () {
      $("#cat-li").css("display", "block");
    }, 2100);
    setTimeout(function () {
      $("#get-li").css("display", "block");
    }, 2300);

    setTimeout(function () {
      $("#acsii-art").css("display", "block");
      $("#acsii-art").animate({ fontSize: ".75em" });
    }, 2300);

    setTimeout(showStuff, 2500);
  }

  // if on mobile
  else {
    $("#acsii-prop").css("display", "none");

    setTimeout(function () {
      $("#mobile-message").css("display", "block");
    }, 2000);
  }
}

function booting() {
  if (window.matchMedia("(max-width: 1319px)").matches) {
    $("#stuff-machine-loader").css({
      position: "absolute",
      left: "5%",
    });
  }

  generalListAnim();

  var checkingAnim = setInterval(() => {
    $("#checking").animate({ letterSpacing: "+=15px" }, 300);
    $("#checking").animate({ letterSpacing: "-=15px" }, 300);
  }, 600);

  checklistAnim();
}

function showStuff() {
  $("#stuff-machine-loader").animate({ top: "40px" }, 750);
  setTimeout(function () {
    $("#stuff-machine-loader").css("display", "none");
    $("#sm-load").empty();
    $("#sm-desktop").fadeIn(1000);
  }, 900);
}
