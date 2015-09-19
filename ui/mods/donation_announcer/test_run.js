(function() {
  var paths = require.s.contexts._.config.paths
  paths.donation_announcer = 'coui://ui/mods/donation_announcer'
  paths.sandbox_unit_menu = 'coui://ui/mods/sandbox_unit_menu'
})()

require(['donation_announcer/feed', 'donation_announcer/panel'], function(feed, panel) {
  setTimeout(function() {
    feed.testUpdate().then(function(donors) {
      donors.forEach(function(item) {
        console.log(item)
      })
    })
  }, 1000)

  panel()
})
