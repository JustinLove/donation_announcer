define([
  'gofundme_feed/config',
  'gofundme_feed/feed',
  'gofundme_feed/donation'
], function(config, feed, Donation) {
  var nullOrder = {build: []}
  var unfinished = function(donation) {return !donation.finished()}

  var knownDonations = {}

  var integrateDonations = function(incoming) {
    incoming.forEach(function(d) {
      if (!knownDonations[d.id]) {
        var dm = Donation(d)
        dm.matchPlayers(viewModel.playerNames())
        knownDonations[d.id] = dm
        viewModel.donations.push(dm)
      }
    })
  }

  var viewModel = {
    visible: ko.observable(true),
    open: ko.observable(true),
    toggle: function() {
      viewModel.open(!viewModel.open())
    },
    name: ko.observable(config.name()),
    cheatAllowCreateUnit: ko.observable(false).extend({session: 'cheat_allow_create_unit'}),
    playerNames: ko.observableArray([]),
    donations: ko.observableArray([]),
    currentDonation: ko.observable(Donation({})),
    currentOrder: ko.observable(nullOrder),
    select: function(donation) {
      viewModel.currentDonation().selected(false)
      viewModel.currentDonation(donation)
      donation.selected(true)

      if (!viewModel.cheatAllowCreateUnit()) {
        donation.finished(true)
        return
      }

      if (donation.unexecutedOrders().length > 0) {
        viewModel.currentOrder(donation.unexecutedOrders.shift())
      } else {
        donation.finished(true)
        viewModel.currentOrder(nullOrder)
      }
    },
    executeNext: function() {
      donation = viewModel.currentDonation()
      if (donation.unexecutedOrders().length > 0) {
        viewModel.currentOrder(donation.unexecutedOrders.shift())
      } else {
        donation.finished(true)
        viewModel.select(viewModel.donationWithOrders())
      }
    },
    donationWithOrders: function() {
      return viewModel.donations().filter(function(donation) {
        return donation.unexecutedOrders().length > 0 && !donation.insufficient()
      })[0] || Donation({})
    },
    update: function() {
      viewModel.name(config.name())
      feed[config.feed()]().then(integrateDonations)
    },
    reap: function() {
      viewModel.donations(viewModel.donations().filter(unfinished))
    },
    manualUpdate: function() {
      viewModel.reap()
      viewModel.update()
    },
    ready: function() {
      console.log('ready')
      api.Panel.message(api.Panel.parentId, 'request_player_names',
        ['gofundme_feed', 'player_names'])
      setTimeout(viewModel.update, 1000)
    },
  }

  viewModel.currentCode = ko.computed(function() {
    return viewModel.currentOrder().code
  })
  viewModel.currentMin = ko.computed(function() {
    return viewModel.currentOrder().donation
  })
  viewModel.currentOrder.subscribe(function(order) {
    api.Panel.message(api.Panel.parentId, 'sandbox_menu_item', order)
  })
  viewModel.playerNames.subscribe(function(names) {
    viewModel.donations().forEach(function(donation) {
      donation.matchPlayers(names)
    })
  })

  return viewModel
})
