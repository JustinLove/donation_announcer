define([
  'donation_announcer/config',
  'donation_announcer/feed',
  'donation_announcer/donation'
], function(config, feed, Donation) {
  var nullOrder = {build: []}
  var unfinished = function(donation) {return !donation.finished()}

  var knownDonations = {}

  var integrateDonations = function(incoming) {
    incoming.forEach(function(d) {
      if (!knownDonations[d.id]) {
        var dm = Donation(d)
        dm.matchPlayers(viewModel.playerNames())
        dm.matchPlanets(viewModel.planetNames())
        knownDonations[d.id] = dm
        viewModel.donations.push(dm)
      }
    })
  }

  var autoUpdate = function() {
    viewModel.update()
    setTimeout(autoUpdate, 10000)
  }

  var viewModel = {
    visible: ko.observable(true),
    name: ko.observable(config.name()),
    cheatAllowCreateUnit: ko.observable(false).extend({session: 'cheat_allow_create_unit'}),
    playerNames: ko.observableArray([]),
    planetNames: ko.observableArray([]),
    donations: ko.observableArray([]),
    currentDonation: ko.observable(Donation({})),
    currentOrder: ko.observable(nullOrder),
    select: function(donation) {
      viewModel.currentDonation().selected(false)
      viewModel.currentDonation(donation)
      donation.selected(true)
      api.Panel.message('devmode', 'improved_player_control_change', donation.matchingPlayerIndex)
      if (donation.matchingPlanetIndex != -1) {
        api.Panel.message(api.Panel.parentId, 'planets.click', donation.matchingPlanetIndex)
        api.audio.playSound('/SE/UI/UI_planet_switch_select');
      }

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
    cancel: function(donation) {
      donation.finished(true)
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
        ['donation_announcer', 'player_names'])
      api.Panel.message(api.Panel.parentId, 'request_planet_names',
        ['donation_announcer', 'planet_names'])
      setTimeout(autoUpdate, 1000)
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
  viewModel.planetNames.subscribe(function(names) {
    viewModel.donations().forEach(function(donation) {
      donation.matchPlanets(names)
    })
  })

  return viewModel
})
