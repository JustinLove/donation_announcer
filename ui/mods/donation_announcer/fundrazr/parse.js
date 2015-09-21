define([], function() {
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
      var donor_image = donation.owner.pictureUrl.replace(/^\/\//, 'https://')

      return {
        amount: amount,
        comment: comment,
        donor_name: donor_name,
        donor_image: donor_image,
        id: id,
      }
    }).reverse()
  }

  return {
    process: process,
  }
})
