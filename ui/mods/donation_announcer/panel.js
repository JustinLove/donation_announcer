define(function() {
  var insertPanel = function(model) {
    var $panel = $('<panel id="donation_announcer"></panel>').attr({
      name: "donation_announcer",
      src: "coui://ui/mods/donation_announcer/donation_announcer.html",
      'no-keyboard': true,
      'yield-focus': true,
      fit: "dock-bottom",
      'data-bind': 'visible: visible',
    })
    $('<div class="donation_announcer_foundation"></div>')
      .append($panel)
      .appendTo('body')
    ko.applyBindings(model, $panel[0])
    api.Panel.bindElement($panel[0])
  }

  var viewModel = {
    visible: ko.observable(false),
  }

  var inserted = false
  var insert = function() {
    console.log('insert')
    insertPanel(viewModel)
    api.panels.options_bar && api.panels.options_bar.message('donation_announcer_loading', true)
    inserted = true
  }
  viewModel.visible.subscribe(function(visible) {
    if (visible && !inserted) {
      insert()
    }
  })

  model.toggleDonationAnnouncer = function() {
    viewModel.visible(!viewModel.visible())
  }

  model.showDonationAnnouncer = viewModel.visible

  return {
    insert: insert,
    viewModel: viewModel,
    show: function() {
      viewModel.visible(true)
    },
  }
})
