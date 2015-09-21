define([
  'donation_announcer/fundrazr/test',
  'donation_announcer/fundrazr/live',
  'donation_announcer/gofundme/test',
  'donation_announcer/gofundme/live',
], function(
  fundrazr_test,
  fundrazr_live,
  gofundme_test,
  gofundme_live
) {
  return {
    fundrazr_test: fundrazr_test,
    fundrazr_live: fundrazr_live,
    gofundme_test: gofundme_test,
    gofundme_live: gofundme_live,
  }
})
