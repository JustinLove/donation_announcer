(function() {
  var paths = require.s.contexts._.config.paths
  paths.donation_announcer = 'coui://ui/mods/donation_announcer'
  paths.donation_data = 'coui://ui/mods/donation_data'
  paths.sandbox_unit_menu = 'coui://ui/mods/sandbox_unit_menu'

  handlers.request_player_names = function(payload) {
    if (model.playerData) {
      api.Panel.message(payload[0], payload[1],
        model.playerData().names)
    }
    api.panels.options_bar && 
      api.panels.options_bar.message('donation_announcer_loading', false)
  }
  handlers.request_planet_names = function(payload) {
    if (model.celestialViewModels) {
      api.Panel.message(payload[0], payload[1],
        model.celestialViewModels().map(function(planet) {return planet.name()}))
    }
  }
})()

require(['donation_announcer/panel'], function(panel) {
  panel.show()

  if (model.playerData) {
    model.playerData.subscribe(function(value) {
      api.Panel.message('donation_announcer', 'player_names', value.names)
    })
  }
  if (model.celestialViewModels) {
    model.celestialViewModels.subscribe(function(value) {
      api.Panel.message('donation_announcer', 'planet_names',
        value.map(function(planet) {return planet.name()}))
    })
  }
})
