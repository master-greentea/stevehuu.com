function PageSetup(morseMsg, currentPageNavLink) {
  $("._header").load("/master_htmls/header.html", function () {
    $("#morse").html(morseMsg);
    $(currentPageNavLink).attr("class", "nav-link current-page");
  });
  $("._footer").load("/master_htmls/footer.html");
}

function LoadGameTabs() {
  const gameTabs = $("#games-main a").toArray();
  // hide game tabs
  $.each(gameTabs, function (i, tab) {
    $(tab).hide();
  });

  let time = 0;
  var doLoad = setTimeout(() => {
    $.each(gameTabs, function (i, tab) {
      setTimeout(() => {
        $(tab).fadeIn(250);
      }, time);
      time += 150;
    });
  }, 1);
}

// themes
function InitializeTheme() {
  const currentTheme = localStorage.getItem("theme") || "default";

  function ChangeTheme(themeName) {
    $("#theme-stylesheet").attr("href", `/css/themes/${themeName}.css`);
    $(`select option[value="${themeName}"]`).attr("selected", true);
  }

  $("#theme-select").change(() => {
    ChangeTheme($("#theme-select").val());
    localStorage.setItem("theme", $("#theme-select").val());
  });

  ChangeTheme(currentTheme);
}

$(() => {
  $("body").hide();
  $("body").fadeIn(700);
  InitializeTheme();
});
