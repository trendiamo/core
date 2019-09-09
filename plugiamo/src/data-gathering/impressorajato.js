import mixpanel from 'ext/mixpanel'
import { convertToDigits } from 'utils'
import { RollbarWrapper } from 'ext/rollbar'
/* eslint-disable no-undef */

export default {
  getProductsFromCart() {
    return jQuery
      .noConflict()('#shopping-cart-table > tbody')
      .find('tr')
      .map((index, item) => {
        const element = jQuery.noConflict()(item)
        const name = element.find('h2 > a').attr('title')
        const url = element.find('h2 > a').attr('href')
        const quantity = convertToDigits(element.find("[selected='selected']").attr('value'))
        const price = convertToDigits(
          element
            .find('.cart-price')
            .first()
            .text()
        )
        return { name, url, price, quantity }
      })
      .toArray()
  },
  checkoutObject() {
    return {
      name: 'Proceed To Checkout',
      data: {
        hostname: location.hostname,
        withPlugin: !!jQuery.noConflict()('iframe[title="Frekkls Launcher"]')[0],
        products: this.getProductsFromCart(),
        currency: 'BRL',
        subTotalInCents: convertToDigits(
          jQuery
            .noConflict()('#shopping-cart-totals-table')
            .find('.price')
            .first()
            .text()
        ),
      },
    }
  },
  setupDataGathering() {
    const _this = this
    if (location.pathname.match(/onepage\/success/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }

    if (!window.jQuery || !window.jQuery.noConflict) return

    if (location.pathname.match(/^\/checkout\/cart\/?$/)) {
      // cart
      jQuery
        .noConflict()('.btn-concluir-compra')
        .on('click', () =>
          RollbarWrapper(() => {
            const json = _this.checkoutObject()
            mixpanel.track(json.name, json.data)
          })
        )
    }
  },
}
