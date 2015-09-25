define(function() {
  var setting = function() {
    return api.settings.isSet('ui', 'donation_announcer_feed', true) || 'fundrazr_test'
  }
  return {
    name: function() {
      return setting()
    },
    feed: function() {
      return setting()
    }
  }
})
