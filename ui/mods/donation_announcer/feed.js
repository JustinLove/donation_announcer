define(['donation_announcer/menu'], function(menu) {
  var process = function(json) {
    if (!json.activities.entries) return []
    return json.activities.entries.filter(function(entry) {
      return !!entry.donation
    }).map(function(entry) {
      var donation = entry.donation

      var id = donation.activityId
      var amount = parseInt(donation.amount, 10)
      var comment = donation.message || ''
      var donor_name = donation.owner.name
      if (loadImage) {
        var donor_image = donation.owner.pictureUrl.replace(/^\/\//, 'https://')
      } else {
        var donor_name = ''
      }

      var codes = comment.match(menu.codes) || []
      codes = codes.map(function(s) {return s.toUpperCase()})
      var orders = codes.map(function(c) {return JSON.parse(JSON.stringify(menu.menuMap[c]))})

      return {
        amount: amount,
        comment: comment,
        donor_name: donor_name,
        donor_image: donor_image,
        id: id,
        codes: codes,
        orders: orders,
      }
    }).reverse()
  }

  var donations = "https://fundrazr.com/api/campaigns/a11wc4/highlights?v=1&max-results=25&order=newest-first&_=1439251828096"
  //var donations = "https://fundrazr.com/api/campaigns/4xZAc/highlights?v=1&max-results=25&order=newest-first&_=1439251828096"

  var update = function(url) {
    loadImage = true
    return $.getJSON(url || donations).then(process)
  }

  var loadImage = true
  var testSequence = [
    "coui://ui/mods/donation_announcer/test.json",
    "coui://ui/mods/donation_announcer/test2.json",
  ]

  var testUpdate = function() {
    loadImage = false
    if (testSequence.length > 1) {
      url = testSequence.shift()
    } else {
      url = testSequence[0]
    }
    console.log(url)
    return $.get(url || donations).then(process)
  }

  return {
    donations: donations,
    update: update,
    testUpdate: testUpdate,
    process: process,
  }
})
