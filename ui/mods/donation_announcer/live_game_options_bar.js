(function() {
  model.toggleDonationAnnouncer = function() {
    api.Panel.message(api.Panel.parentId, 'panel.invoke', ['toggleDonationAnnouncer']);
  };
  model.donationAnnouncerLoading = ko.observable(false)
  model.donationAnnouncerImage = ko.computed(function() {
    if (model.donationAnnouncerLoading()) {
      return 'coui://ui/mods/donation_announcer/wide_loading.gif'
    } else {
      return 'img/ingame_options_bar/game_menu.png'
    }
  })
  $('.div_ingame_options_bar_cont').prepend(
  '<div class="btn_ingame_options btn_std_ix div_toggle_donation_announcer">' + 
      '<a href="#" data-bind="click: toggleDonationAnnouncer">' + 
          '<img height="16" data-bind="attr: { src: donationAnnouncerImage }" />' + 
      '</a>' +
  '</div>')

  handlers.donation_announcer_loading = model.donationAnnouncerLoading
})()

