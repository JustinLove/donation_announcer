action_sets.hacks.next_donation = function () {
  api.Panel.message('donation_announcer', 'next_donation')
}
api.settings.definitions.keyboard.settings.next_donation = {
  title: 'next donation',
  type: 'keybind',
  set: 'mods',
  display_group: 'mods',
  display_sub_group: 'donation announcer',
  default: 'alt+n'
}

action_sets.hacks.update_feed = function () {
  api.Panel.message('donation_announcer', 'update_feed')
}
api.settings.definitions.keyboard.settings.update_feed = {
  title: 'update feed',
  type: 'keybind',
  set: 'mods',
  display_group: 'mods',
  display_sub_group: 'donation announcer',
  default: 'alt+u'
}

