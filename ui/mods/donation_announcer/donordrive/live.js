define(['donation_announcer/donordrive/parse'], function(parse) {
  var donations = "http://ablegamers.donordrive.com/index.cfm?fuseaction=donorDrive.teamDonations&teamID=5007"
  //var donations = "http://ablegamers.donordrive.com/index.cfm?fuseaction=donorDrive.participantDonations&participantID=1002"
  //var donations = "coui://ui/mods/donation_announcer/donordrive/sample.htm"

  var update = function(url) {
    return $.get(url || donations).then(parse.process, function() {
      console.log('fetch failed', arguments)
    })
  }

  return {
    donations: donations,
    update: update,
    process: parse.process,
  }
})
