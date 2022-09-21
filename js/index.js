function PageSetup(morseMsg, currentPageNavLink) {
  $("._header").load("/master_htmls/header.html", function () {
    $("#morse").html(morseMsg);
    $(currentPageNavLink).attr("class", "nav-link current-page");
  });
  $("._footer").load("/master_htmls/footer.html");
}
