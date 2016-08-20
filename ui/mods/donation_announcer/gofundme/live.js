define(['donation_announcer/gofundme/parse'], function(parse) {
  var donations = "http://www.gofundme.com/mvc.php?route=donate/pagingdonationsb&url=planetaryablegamers&idx=0&type=recent"
  //var donations = "coui://ui/mods/donation_announcer/raw.html"

  var update = function(url) {
    return $.get(url || donations).then(parse.process)
  }

  return {
    donations: donations,
    update: update,
    process: parse.process,
  }
})
