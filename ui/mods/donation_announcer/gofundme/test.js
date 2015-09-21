define(['donation_announcer/gofundme/parse'], function(parse) {
  var testSequence = [
    "coui://ui/mods/donation_announcer/gofundme/gfm50.html",
    "coui://ui/mods/donation_announcer/gofundme/gfm40.html",
    "coui://ui/mods/donation_announcer/gofundme/gfm30.html",
    "coui://ui/mods/donation_announcer/gofundme/gfm20.html",
    "coui://ui/mods/donation_announcer/gofundme/gfm10.html",
    "coui://ui/mods/donation_announcer/gofundme/gfm00.html",
  ]

  var update = function() {
    if (testSequence.length > 1) {
      url = testSequence.shift()
    } else {
      url = testSequence[0]
    }
    return $.get(url).then(parse.process)
  }

  return {
    donations: testSequence[0],
    update: update,
    process: parse.process,
  }
})
