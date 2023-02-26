$(() => {
  InitializeTheme();
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
  $("._footer").load("/master_htmls/footer.html", function () {
    $(".back-to-top").load("/master_htmls/back-to-top.html").click(function () {
      $("html, body").animate({ scrollTop: 0 }, 100);
    });
  });
};

function GamePageSetup(left, right) {
  $("._page-buttons").load("/master_htmls/page-buttons.html", function () {
    $(".pb-left").attr("href", left == "none" ? "#" : left);
    $(".pb-right").attr("href", right == "none" ? "#" : right);
    if (left == "none") { $(".pb-left").removeAttr('href').addClass("disabled") };
    if (right == "none") { $(".pb-right").removeAttr('href').addClass("disabled") };
  });
};

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
function InitializeTheme() {
  var themeFound = false;

  var activeThemes = ["default", "light"];
  for (var i = 0; i < activeThemes.length; i++) {
    if (localStorage.getItem("theme") == activeThemes[i]) {
      themeFound = true;
      break;
    }
  }

  const currentTheme = themeFound ? localStorage.getItem("theme") : "default";

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
  }
}

// page transition
window.onload = () => {
  const transtionsElements = $(".page-transitions")
  setTimeout(() => {
    transtionsElements.removeClass('is-active');
    document.documentElement.scrollTop = 0;
  }, 300);

  const anchors = document.querySelectorAll('a')

  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i];
    if (anchor.target != '_blank' && !anchor.classList.contains('back-to-top-a')) {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        let target = anchor.href;
        $(".tooltip").fadeOut(1)
        $(".ad").fadeOut(100)
        transtionsElements.addClass('is-active')

        setTimeout(() => {
          window.location.href = target;
        }, 300)
      })
    }
  }
}
