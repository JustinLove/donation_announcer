define([
  'donation_announcer/fundrazr/test',
  'donation_announcer/fundrazr/live',
], function(
  fundrazr_test,
  fundrazr_live
) {
  return {
    fundrazr_test: fundrazr_test,
    fundrazr_live: fundrazr_live,
  }
})
