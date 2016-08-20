define([], function() {
  var process = function(html) {
    // jQuery y u fetch images?
    html = html.replace(/img/g, 'ximg')
    // trim: leading blank line will throw invalid
    var $donors = $(html.trim()).find('#donors td')
    //console.log([html, $donors])
    return $donors.map(function(i, donor) {
      var donorAmount = $(donor).find('.donor-detail strong.block').text().split('donated')
      var amount = parseInt(donorAmount[1].match(/\d+(\.\d+)?/)[0], 10)
      var donor_name = donorAmount[0].trim()
      var donor_image = $(donor).find('ximg.member-avatar').attr('src').replace(/^\/\//, 'http://')
      var comment = $(donor).find('.donor-detail em').text().trim()

      return {
        amount: amount,
        comment: comment,
        donor_name: donor_name,
        id: donor_name + amount.toString() + comment,
      }
    }).get().reverse()
  }

  return {
    process: process,
  }
})
