define(['donation_announcer/fundrazr/parse'], function(parse) {
  var donations = "https://fundrazr.com/api/campaigns/811ws3/activities?v=1&max-results=25&order=newest-first"
  //var donations = "https://fundrazr.com/api/campaigns/4xZAc/activities?v=1&max-results=25&order=newest-first"

  var update = function(url) {
    return $.getJSON(url || donations, {_: new Date().getTime()}).then(parse.process)
  }

  return {
    donations: donations,
    update: update,
    process: parse.process,
  }
})
