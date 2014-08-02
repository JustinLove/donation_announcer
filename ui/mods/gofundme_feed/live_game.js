(function() {
  var paths = require.s.contexts._.config.paths
  paths.gofundme_feed = 'coui://ui/mods/gofundme_feed'
  paths.sandbox_unit_menu = 'coui://ui/mods/sandbox_unit_menu'
})()

require(['gofundme_feed/panel'], function(panel) {
  panel()

  model.cheatAllowCreateUnit.subscribe(function(value) {
    api.Panel.message('gofundme_feed', 'cheat_allow_create_unit', value)
  })
})
