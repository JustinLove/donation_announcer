define(['donation_announcer/fundrazr/parse'], function(parse) {
  var donations = "https://fundrazr.com/api/campaigns/a11wc4/highlights?v=1&max-results=25&order=newest-first&_=1439251828096"
  //var donations = "https://fundrazr.com/api/campaigns/4xZAc/highlights?v=1&max-results=25&order=newest-first&_=1439251828096"

  var update = function(url) {
    return $.getJSON(url || donations).then(parse.process)
  }

  return {
    donations: donations,
    update: update,
    process: parse.process,
  }
})
