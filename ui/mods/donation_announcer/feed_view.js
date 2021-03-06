define([
  'donation_data/config',
  'donation_data/feed',
  'donation_announcer/donation',
  'donation_announcer/menu'
], function(config, feed, Donation, menu) {
  var speed = 1000

  var unfinished = function(donation) {return !donation.finished()}

  var knownDonations = {}

  var integrateDonations = function(incoming) {
    var before = viewModel.waitingDonations().length
    incoming.forEach(function(d) {
      if (!knownDonations[d.id]) {
        var dm = Donation(d)
        dm.matchMenu(menu)
        dm.matchPlayers(viewModel.playerNames())
        dm.matchPlanets(viewModel.planetNames())
        knownDonations[d.id] = dm
        viewModel.donations.push(dm)
      }
    })
    if (before == 0 && viewModel.waitingDonations().length > before) {
      viewModel.nextDonation()
    }
  }

  var autoUpdate = function() {
    if (feed[config.feed()].subscribe) {
      feed[config.feed()].subscribe(integrateDonations)
    } else {
      viewModel.update()
      setTimeout(autoUpdate, 10000)
    }
  }

  var showTimeout

  var viewModel = {
    visible: ko.observable(true),
    name: ko.observable(config.name()),
    playerNames: ko.observableArray([]),
    planetNames: ko.observableArray([]),
    donations: ko.observableArray([]),
    currentDonation: ko.observable(Donation({})),
    select: function(donation) {
      viewModel.currentDonation().selected(false)
      viewModel.currentDonation(donation)
      donation.selected(true)

      if (donation.amount > 0) {
        viewModel.visible(true)
      } else {
        viewModel.visible(false)
      }

      if (showTimeout) {
        clearTimeout(showTimeout)
      }
      showTimeout = setTimeout(function() {
        viewModel.nextDonation()
      }, (5 + donation.amount) * speed)
    },
    remove: function() {
      donation = viewModel.currentDonation()
      viewModel.donations(viewModel.donations().filter(function(d) {
        return d != donation
      }))
      viewModel.select(viewModel.next())
    },
    nextDonation: function() {
      donation = viewModel.currentDonation()
      donation.finished(true)
      viewModel.select(viewModel.next())
    },
    next: function() {
      return viewModel.waitingDonations()[0] || Donation({})
    },
    update: function() {
      viewModel.name(config.name())
      feed[config.feed()].update().then(integrateDonations)
    },
    reap: function() {
      viewModel.donations(viewModel.waitingDonations())
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

  viewModel.waitingDonations = ko.computed(function() {
    return viewModel.donations().filter(unfinished)
  })

  viewModel.visible.subscribe(function(value) {
    api.Panel.message(api.Panel.parentId, 'panel.invoke', ['showDonationAnnouncer', value]);
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
