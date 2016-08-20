define([], function() {
  var process = function(html) {
    // trim: leading blank line will throw invalid
    var $doners = $(html.trim()).find(".doner")
    //console.log([html, $doners])
    return $doners.map(function(i, doner) {
      var amount = parseInt($(doner).find('.damt').text().match(/\d+(\.\d+)?/)[0], 10)
      var comment = $(doner).find('.dcom').text().trim()
      var donor_name = $(doner).find('.dname').text().trim()

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
