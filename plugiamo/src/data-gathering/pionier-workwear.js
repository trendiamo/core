import mixpanel from 'ext/mixpanel'

export default {
  setupDataGathering() {
    if (location.pathname.match(/formonline.shop.shoppingcart.checkout.overview/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }
  },
}
