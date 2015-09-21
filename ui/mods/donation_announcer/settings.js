(function() {
  var donation_announcer_settings = {
    donation_announcer_feed: {
      title: 'Donation Feed',
      type: 'select',
      options: ['fundrazr_test', 'fundrazr_live', 'gofundme_test', 'gofundme_live'],
      default: 'fundrazr_test'
    }
  }

  _.extend(api.settings.definitions.ui.settings, donation_announcer_settings)

  // force model.settingsLists to update
  model.settingDefinitions(api.settings.definitions)

  var $group = $('<div class="sub-group"></div>').appendTo('.option-list.ui .form-group')
  $group.append('<div class="sub-group-title">Donation Announcer</div>')

  var $template = $('script#setting-template')
  $group.append($template[0].outerHTML.replace('setting-template', 'donation-announcer-setting-template').replace('hide', 'show'))

  Object.keys(donation_announcer_settings).forEach(function(setting) {
    $group.append('<div class="option" data-bind="template: { name: \'donation-announcer-setting-template\', data: $root.settingsItemMap()[\'ui.' + setting + '\'] }"></div>')
  })
})()
