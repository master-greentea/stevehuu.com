$(() => {
  InitializeTheme();
  var cheatCode = "";
  $('html').keydown(function (event) {
    var keycode = event.key;
    cheatCode += keycode

    if (cheatCode.length > 6) {
      cheatCode = cheatCode.slice(-6);
    }

    switch (cheatCode) {
      case "cherry":
        ChangeTheme("cherry");
        localStorage.setItem("theme", "cherry");
        break;
      case "orange":
        ChangeTheme("orange");
        localStorage.setItem("theme", "orange");
        break;
    }
  });
});

function PageSetup(morseMsg, currentPageNavLink) {
  $("._header").load("/master_htmls/header.html", function () {
    $(currentPageNavLink).attr("class", "nav-link current-page");
  });
  $("._footer").load("/master_htmls/footer.html");
}

function LoadGameTabs() {
  const gameTabs = $("#games-main a").toArray();
  // hide game tabs
  // $.each(gameTabs, function (i, tab) {
  //   $(tab).hide();
  // });

  let time = 0;
  var doLoad = setTimeout(() => {
    $.each(gameTabs, function (i, tab) {
      setTimeout(() => {
        $(tab).fadeIn(250);
      }, time);
      time += 150;
    });
  }, 50);
}

// themes
function InitializeTheme() {
  var themeFound = false;

  var activeThemes = ["default", "light", "orange", "cherry"];
  for (var i = 0; i < activeThemes.length; i++) {
    if (localStorage.getItem("theme") == activeThemes[i]) {
      themeFound = true;
      break;
    }
  }

  const currentTheme = themeFound ? localStorage.getItem("theme") : "default";

  $("#theme-select").change(() => {
    ChangeTheme($("#theme-select").val());
    localStorage.setItem("theme", $("#theme-select").val());
  });

  ChangeTheme(currentTheme);
}
function ToLight() {
  ChangeTheme("light");
  $("#light-mode").hide();
  $("#dark-mode").show();
  localStorage.setItem("theme", "light");
}
function ToDark() {
  ChangeTheme("default");
  $("#dark-mode").hide();
  $("#light-mode").show();
  localStorage.setItem("theme", "default");
}
function ChangeTheme(themeName) {
  $("#theme-stylesheet").attr("href", `/css/themes/${themeName}.css`);
  switch (themeName) {
    case "default":
      $("#dark-mode").hide();
      $("#light-mode").show();
      break;
    case "light":
      $("#light-mode").hide();
      $("#dark-mode").show();
      break;
    case "cherry":
      $("#dark-mode").hide();
      $("#light-mode").show();
      break;
    case "orange":
      $("#light-mode").hide();
      $("#dark-mode").show();
      break;
  }
}
