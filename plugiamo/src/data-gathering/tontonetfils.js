import mixpanel from 'ext/mixpanel'
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
        withPlugin: !!$('iframe[title="Frekkls Launcher"]')[0],
        products: this.getProductsFromCart(),
        subTotalInCents: window.swymCart.total_price,
        currency: 'EUR',
      },
    }
  },
  setupDataGathering() {
    const _this = this
    if (location.pathname.match(/9662595172/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }

    if (!window.$) return

    $(document).on('submit', 'form.cart.ajaxcart', () =>
      RollbarWrapper(() => {
        const json = _this.checkoutObject()
        mixpanel.track(json.name, json.data)
      })
    )
    if (location.pathname.match(/^\/cart/)) {
      $('form.cart').on('click', 'button.cart__checkout', () =>
        RollbarWrapper(() => {
          const json = _this.checkoutObject()
          mixpanel.track(json.name, json.data)
        })
      )
    }
  },
}
