console.log('bootstrap')

var model;
var handlers = {};

(function() {
  var paths = require.s.contexts._.config.paths
  paths.sandbox_unit_menu = 'coui://ui/mods/sandbox_unit_menu'
  paths.donation_announcer = 'coui://ui/mods/donation_announcer'
})();

require(['donation_announcer/feed_view'], function(feed_view) {
  "use strict";

  model = feed_view

  handlers.execute_next = model.executeNext

  handlers.update_feed = model.manualUpdate

  handlers.cheat_allow_create_unit = model.cheatAllowCreateUnit

  handlers.player_names = model.playerNames
  handlers.planet_names = model.planetNames

  // inject per scene mods
  if (scene_mod_list['missile_command'])
      loadMods(scene_mod_list['live_game_missile_command']);

  // setup send/recv messages and signals
  app.registerWithCoherent(model, handlers);

  // Activates knockout.js
  ko.applyBindings(model);

  $(model.ready)
})

