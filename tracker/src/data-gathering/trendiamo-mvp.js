import mixpanel from 'ext/mixpanel'
import { getAffiliateToken } from 'utils'
import { RollbarWrapper } from 'ext/rollbar'
/* eslint-disable no-undef */

export default {
  getProductsFromCart() {
    if (!window.swymCart.items) return []
    return window.swymCart.items.map(item => ({
      id: item.id,
      name: item.product_title,
      url: `${location.hostname}/${item.url}`,
      price: item.price,
      quantity: item.quantity,
      currency: 'EUR',
      size: item.variant_title,
    }))
  },
  checkoutObject() {
    if (!window.swymCart) return
    return {
      name: 'Proceed To Checkout',
      data: {
        hostname: location.hostname,
        products: this.getProductsFromCart(),
        currency: 'EUR',
        subTotalInCents: window.swymCart.total_price,
        affiliateToken: getAffiliateToken(),
      },
    }
  },
  setupDataGathering() {
    if (location.pathname.match(/\/thank_you$/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname, affiliateToken: getAffiliateToken() })
    }

    if (!window.$) return

    window.$(document).on('submit', 'form.cart.ajaxcart__form', () =>
      RollbarWrapper(() => {
        const json = this.checkoutObject()
        mixpanel.track(json.name, json.data)
      })
    )
    if (location.pathname.match(/^\/cart((\/\w+)+|\/?)/)) {
      window.$(document).on('click', '.cart__checkout', () =>
        RollbarWrapper(() => {
          const json = this.checkoutObject()
          mixpanel.track(json.name, json.data)
        })
      )
    }
  },
}
