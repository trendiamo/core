import mixpanel from 'ext/mixpanel'
import { RollbarWrapper } from 'ext/rollbar'

export default {
  getProductsFromCart() {
    if (!window.lion.cart.items) return []
    return window.lion.cart.items.map(item => {
      const url = item.url || window.$(`form.cart a[href*=${item.id}]`).attr('href')
      return {
        id: item.id,
        name: item.product_title,
        url: url && `${location.hostname}${url}`,
        price: item.price,
        quantity: item.quantity,
        currency: 'EUR',
        size: item.variant_title,
      }
    })
  },
  checkoutObject() {
    if (!window.lion || !window.lion.cart) return
    return {
      name: 'Proceed To Checkout',
      data: {
        hostname: location.hostname,
        withPlugin: !!window.$('iframe[title="Frekkls Launcher"]')[0],
        products: this.getProductsFromCart(),
        currency: window.lion.cart.currency,
        subTotalInCents: window.lion.cart.items_subtotal_price,
      },
    }
  },
  setupDataGathering() {
    if (location.pathname.match(/\/thank_you$/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }

    if (!window.$) return

    if (location.pathname.match(/^\/cart((\/\w+)+|\/?)/)) {
      window.$(document).on('click', '.cart__checkout--page', () =>
        RollbarWrapper(() => {
          if (window.$('#CartPageAgree').is(':checked')) {
            const json = this.checkoutObject()
            mixpanel.track(json.name, json.data)
          }
        })
      )
    }
  },
}
