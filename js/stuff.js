// STUFF MACHINE
// by stevehuu 2022

$(function () {
  // initialize
  $("#sm-load").load("/stuff_machine/sm_loader.html");
  let fullscreened = false;

  setInterval(() => {
    // full screen check
    if (!fullscreened) {
      $(".window").draggable({
        disabled: false,
        containment: "#stuff-space",
        scroll: false,
        cancel: ".window-content",
        stack: ".window",
      });

      $(".window-content").resizable({
        disabled: false,
        maxHeight: $(window).height() - 68, // vh - (task bar + 29)
        maxWidth: $(window).width(),
        minHeight: 390,
        minWidth: 790,
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
  }, 100);

  // ================================================
  // tempTop & Left
  var saveTempT;
  var saveTempL;
  var saveTempW;
  var saveTempH;
  // full screening
  function fullscreen(thing) {
    saveTempT = $(thing).closest(".window").css("top");
    saveTempL = $(thing).closest(".window").css("left");
    saveTempW = $(thing).closest(".window").css("width");
    saveTempH = $(thing)
      .closest(".window")
      .find(".window-content")
      .css("height");
    $(thing)
      .closest(".window")
      .css({
        position: "absolute",
        top: $(window).scrollTop(), // + 79 (if header)
        left: 0,
        width: "100%",
      });
    $(thing).closest(".window").find(".window-content").css({
      width: "calc(100% + 2px)",
      height: "calc(100vh - 68px)", // - (task bar + 29)
    });
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
      top: saveTempT,
      left: saveTempL,
      width: "max-content",
    });
    $(thing).closest(".window").find(".window-content").css({
      width: saveTempW,
      height: saveTempH,
    });
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
  // ================================================

  // using toggle button
  $(".window-toggle-button").click(function () {
    toggleFullscreen(this);
  });

  // using double click controls panel
  $(".window-controls").dblclick(function () {
    toggleFullscreen(this);
  }); // double click header

  // window close button
  $(".window-close-button").click(function () {
    unFullscreen(this);
    $(this).closest(".window").hide();
    $(this).closest(".window").find("iframe").attr("src", "");
  });

  // select window
  function selectWindow(windowToSelect) {
    $(windowToSelect).addClass("front");
    $(".window").not(windowToSelect).removeClass("front");
    $(windowToSelect).css("box-shadow", "0px 5px 30px #f2c94d inset");
    $(".window").not(windowToSelect).css("box-shadow", "none");
  }
  function deselectWindow() {
    $(".window").removeClass("front");
    $(".window").css("box-shadow", "none");
  }

  $("body").mousedown(function (event) {
    if ($(event.target).closest(".window").hasClass("window")) {
      selectWindow($(event.target).closest(".window"));
    } else {
      deselectWindow();
    }
  });

  // app stuff below
  // @@@@@@@@===============================================@@@@@@@@

  // open app
  function appOpen(id, appwidth, appheight) {
    $(id).show();
    var randomLeft = Math.random() * $(window).width();
    var randomTop = Math.random() * $(window).height();
    if (
      randomLeft >= $(window).width() / 2.5 ||
      randomTop >= $(window).height() / 2.5
    ) {
      randomLeft /= 2;
      randomTop /= 2;
    }
    if (randomTop <= $(window).height() + 80) {
      randomTop += 80;
    }
    console.log(randomLeft, randomTop);
    $(id).css({
      left: randomLeft,
      top: randomTop,
    });
    $(id).find(".window-content").css({
      width: appwidth,
      height: appheight
    })
    selectWindow(id);
  }

  // apps
  $("#app1").dblclick(function () {
    appOpen("#venera-window", 800, 500);
  });

  $("#app2").dblclick(function () {
    appOpen("#photo-window", $(window).width() * 0.5, $(window).height() * 0.5);
    $("#photo-window").find("iframe").attr("src", "/stuff_machine/photos.html");
  });
});
