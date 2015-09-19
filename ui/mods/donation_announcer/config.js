define(function() {
  var setting = function() {
    return api.settings.isSet('ui', 'donation_announcer_feed', true) || 'Test'
  }
  return {
    name: function() {
      return setting()
    },
    feed: function() {
      if (setting() == 'AbleGamers') {
        return 'update'
      } else {
        return 'testUpdate'
      }
    }
  }
})
