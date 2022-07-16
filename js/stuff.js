// STUFF MACHINE
// by stevehuu 2022

$(function () {
  // ✨VERSION NUMBER
  $(".sm-version-no").html("0.5.37");

  $("#sm-loading-date").html(
    new Date(Date.now()).getFullYear() +
      "" +
      new Date(Date.now()).getMonth() +
      new Date(Date.now()).getDate()
  );

  // initialize
  let fullscreened = false;

  var minResizeW = $(window).width() / 4;
  var minResizeH = $(window).height() / 3;

  var onStartMenu = false;

  // update
  setInterval(() => {
    // full screen check
    if (!fullscreened) {
      $(".window").draggable({
        disabled: false,
        containment: "#stuff-space",
        scroll: false,
        stack: ".window",
        handle: ".window-controls",
      });

      $(".window-content").resizable({
        disabled: false,
        maxHeight: $(window).height() - 68, // vh - (task bar + 29)
        maxWidth: $(window).width() - 100,
        minHeight: $(window).height() / 3,
        minWidth: $(window).width() / 4,
      });
    } else {
      $(".window").draggable("disable");
      $(".window-content").resizable("disable");
    }

    // active windows
    if ($(".window").is(":visible")) {
      $(".window").addClass("w-active");
    } else {
      $(".window").removeClass("w-active");
    }

    // check start menu hover
    if ($("#start-menu:hover").length != 0) {
      onStartMenu = true;
    } else {
      onStartMenu = false;
    }
  }, 1);

  $(".ui-resizable-handle").mouseup(function () {
    $("html").css(
      "cursor",
      "url('/images/stuff/sm_cursor.png'), default !important"
    );
  });

  // ================================================
  // tempTop & Left
  var saveTempT;
  var saveTempL;
  var saveTempW;
  var saveTempH;
  // full screen animation
  var fullScreenAnimSpeed = 450;
  // full screening
  function fullscreen(thing) {
    saveTempT = $(thing).closest(".window").css("top");
    saveTempL = $(thing).closest(".window").css("left");
    saveTempW = $(thing).closest(".window").css("width");
    saveTempH = $(thing)
      .closest(".window")
      .find(".window-content")
      .css("height");

    $(thing).closest(".window").css({
      position: "absolute",
    });
    $(thing)
      .closest(".window")
      .animate(
        {
          top: $(window).scrollTop(), // + 79 (if header)
          left: "0",
          width: "100%",
        },
        fullScreenAnimSpeed,
        "easeOutQuad"
      );

    $(thing)
      .closest(".window")
      .find(".window-content")
      .animate(
        {
          top: -1,
          left: 0,
          width: "100%",
          height: $(window).height() - 69,
        },
        fullScreenAnimSpeed,
        "easeOutQuad"
      );

    // set icon to subtract
    $(thing)
      .closest(".window")
      .find(".window-toggle-button")
      .html(
        "<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='#f8f2e2' viewBox='0 0 16 16'><path d='M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z' /></svg>"
      );
    // button disable
    $(".window-toggle-button")
      .not($(thing).closest(".window").find(".window-toggle-button"))
      .attr("disabled", true);
    fullscreened = true;
  }
  // un- full screening
  function unFullscreen(thing) {
    $(thing).closest(".window").css({
      position: "absolute",
    });
    $(thing).closest(".window").animate(
      {
        top: saveTempT,
        left: saveTempL,
        width: saveTempW,
      },
      fullScreenAnimSpeed,
      "easeOutQuad"
    );
    setTimeout(function () {
      $(thing).closest(".window").css("width", "max-content");
    }, fullScreenAnimSpeed + 1);

    $(thing).closest(".window").find(".window-content").animate(
      {
        top: -1,
        left: 0,
        width: saveTempW,
        height: saveTempH,
      },
      fullScreenAnimSpeed,
      "easeOutQuad"
    );

    // set icon to square
    $(thing)
      .closest(".window")
      .find(".window-toggle-button")
      .html(
        "<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='#f8f2e2' viewBox='0 0 16 16'><path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/></svg>"
      );
    // button enable
    $(".window-toggle-button")
      .not($(thing).closest(".window").find(".window-toggle-button"))
      .attr("disabled", false);
    fullscreened = false;
  }
  // toggle fullscreen
  function toggleFullscreen(thing) {
    if (!fullscreened) {
      fullscreen(thing);
    } else {
      unFullscreen(thing);
    }
  }

  // using toggle button
  $(".window-toggle-button").click(function () {
    toggleFullscreen(this);
  });

  // using double click controls panel
  $(".window-controls").dblclick(function () {
    toggleFullscreen(this);
  });
  // ================================================

  // window close button
  $(".window-close-button").click(function () {
    $(this).closest(".window").hide();
    if (fullscreened) {
      unFullscreen(this);
    }
    $(this).closest(".window").find("iframe").attr("src", "");
  });

  // select window
  function selectWindow(windowToSelect) {
    $(windowToSelect).addClass("front");
    $(".window").not(windowToSelect).removeClass("front");
    $(windowToSelect)
      .find(".window-controls")
      .css("box-shadow", "0px 5px 30px #f2c94d inset");
    $(".window")
      .not(windowToSelect)
      .find(".window-controls")
      .css("box-shadow", "none");
  }
  function deselectWindow() {
    $(".window").removeClass("front");
    $(".window").find(".window-controls").css("box-shadow", "none");
  }
  // do selection if clicked on .window
  $("body").mousedown(function (event) {
    if ($(event.target).closest(".window").hasClass("window")) {
      selectWindow($(event.target).closest(".window"));
    } else {
      deselectWindow();
    }
  });

  // >>task bar
  // >>>>start menu
  var startMenuOpened = false;
  function startMenuOpen() {
    var newHeight = $(window).height() - 340;
    $("#start-menu").animate({ top: newHeight }, 350, "easeOutQuad");
    startMenuOpened = true;
  }
  function startMenuClose() {
    $("#start-menu").animate({ top: "100vh" }, 350), "easeOutQuad";
    startMenuOpened = false;
  }
  // click button to open / close
  $("#start-menu-button").click(function () {
    if (startMenuOpened) {
      startMenuClose();
    } else {
      startMenuOpen();
    }
  });
  // click anywhere to open / close
  $("body").click(function (e) {
    if (e.target.id == "#start-menu-button") {
      return;
    } else if ($(e.target).closest("#start-menu-button").length) {
      return;
    } else if (!onStartMenu) {
      startMenuClose();
    }
  });
  // >>>>
  // >>>>start menu buttons
  $("#shut-down").click(function () {
    $("#start-menu").css("z-index", "-1");
    $("#header-pullout").fadeOut(300);
    $("#sm-desktop").animate(
      {
        height: "102%",
        width: "98%",
        top: "-=1%",
        left: "+=1%",
      },
      150
    );
    $("#sm-desktop").animate(
      {
        height: "0%",
        top: "+=46%",
      },
      1300
    );
    $("#sm-desktop").hide(150);
    setTimeout(function () {
      $("#sm-restart").fadeIn(1500);
    }, 2000);
  });
  $("#sm-restart img").mouseover(function () {
    var randomAngle = Math.floor(Math.random() * 355) + 5;
    $(this).rotate({
      animateTo:randomAngle,
      })
  })
  $("#sm-restart img").click(function () {
    location.reload();
  })
  $("#reboot").click(function () {
    location.reload();
  });
  // >>>>
  // >>>>time
  setInterval(() => {
    $("#tb-time").html(
      new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes() +
        ":" +
        new Date(Date.now()).getSeconds()
    );
  }, 1000);

  // >>app stuff
  // >>>>app open
  function appOpen(id, appwidth, appheight, windowName) {
    $(id).fadeIn(100);
    var randomLeft = Math.random() * $(window).width();
    var randomTop = Math.random() * $(window).height();
    if (
      randomLeft > $(window).width() / 2 ||
      randomTop > $(window).height() / 2
    ) {
      randomLeft /= 3;
      randomTop /= 3;
    }
    $(id).css({
      left: randomLeft,
      top: randomTop,
    });
    $(id).find(".window-content").css({
      width: appwidth,
      height: appheight,
    });
    selectWindow(id);
    $(id).find(".window-header-text").html(windowName);
  }

  // apps individual
  $("#app-about").click(function () {
    appOpen("#about-window", minResizeW, minResizeH, "About Stuff Machine");
    startMenuClose();
  });

  $("#app-legal").click(function () {
    appOpen("#legal-window", minResizeW, minResizeH, "Terms & Conditions");
    startMenuClose();
  });

  $("#app-bug").click(function () {
    appOpen("#bug-window", minResizeW, minResizeH, "Bug Report");
    startMenuClose();
  });

  $("#app1").dblclick(function () {
    appOpen("#venera-window", minResizeW, minResizeH, "venera.script");
  });

  $("#app2").dblclick(function () {
    appOpen(
      "#photo-window",
      $(window).width() / 2,
      $(window).height() / 2,
      "photos.html"
    );
    $("#photo-window").find("iframe").attr("src", "/stuff_machine/photos.html");
  });
});
