$(() => {
  window.onscroll = function () {
    if (
      document.body.scrollTop > 150 ||
      document.documentElement.scrollTop > 150
    ) {
      $(".back-to-top").fadeIn(100);
    } else {
      $(".back-to-top").fadeOut(100);
    }
    // ad
    if (
      (document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100) &&
      !adViewed
    ) {
      $("#index-ad").fadeIn(300);
    }
  };
});

function PageSetup(showSocial, currentPageNavLink, isCat) {
  $("._header").load("/master_htmls/header.html", function () {
    $(currentPageNavLink).attr("class", showSocial ? "nav-game current-page" : "nav-link current-page");
    $("header .ad").css({ 'display': showSocial ? 'block' : 'none' })
    $("#header-social").addClass(showSocial ? "" : "d-md-none");
    $("#header-cat").addClass(isCat ? "" : "d-none");
    $("#header-stuff").addClass(isCat ? "d-none" : "");
    // stuff logo animation
    $("#header-stuff").mouseenter(function () {
      $("#header-stuff img").animate({
        width: "+=10",
        height: "+=10"
      }, 100,)
    }).mouseleave(function () {
      $("#header-stuff img").animate({
        width: "-=10",
        height: "-=10"
      }, 100,)
    })
  });
};

function GamePageSetup(left, right) {
  $("._page-buttons").load("/master_htmls/page-buttons.html", function () {
    $(".pb-left").attr("href", left == "none" ? "#" : left);
    $(".pb-right").attr("href", right == "none" ? "#" : right);
    if (left == "none") { $(".pb-left").removeAttr('href').addClass("disabled") };
    if (right == "none") { $(".pb-right").removeAttr('href').addClass("disabled") };
  });
  $("._footer").load("/master_htmls/footer.html", function () {
    $(".back-to-top").load("/master_htmls/back-to-top.html").click(function () {
      $("html, body").animate({ scrollTop: 0 }, 100);
    });
  });
};

function LoadGameTabs() {
  const gameTabs = $(".game-tab").toArray();
  console.log(gameTabs)

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

// ad
var adViewed = false;
function CloseAd() {
  var onMobile = window.matchMedia("(max-width: 1319px)").matches;
  if (onMobile) {
    adViewed = true;
  }
  $("#index-ad").fadeOut(100);
}

// themes
function ToLight() {
  ChangeTheme("light");
  $("#light-mode").hide();
  $("#dark-mode").show();
}
function ToDark() {
  ChangeTheme("default");
  $("#dark-mode").hide();
  $("#light-mode").show();
}
function ChangeTheme(themeName) {
  $("#theme-stylesheet").attr("href", `/css/themes/${themeName}.css`);
  localStorage.setItem("theme", themeName);
}
