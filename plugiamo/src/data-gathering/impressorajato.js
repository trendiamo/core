import mixpanel from 'ext/mixpanel'
import { RollbarWrapper } from 'ext/rollbar'
/* eslint-disable no-undef */

const convertToCents = selector => {
  return Number(selector.replace(/\D/g, ''))
}

export default {
  getProductsFromCart() {
    return jQuery
      .noConflict()('#shopping-cart-table > tbody')
      .find('tr')
      .map((index, element) => {
        const name = jQuery
          .noConflict()(element)
          .find('h2 > a')
          .attr('title')
        const url = jQuery
          .noConflict()(element)
          .find('h2 > a')
          .attr('href')
        const quantity = Number(
          jQuery
            .noConflict()(element)
            .find("[selected='selected']")
            .attr('value')
        )
        const price = convertToCents(element.children[2].innerText)
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
        subTotalInCents: convertToCents(
          jQuery
            .noConflict()('#shopping-cart-totals-table')
            .find('.price')[0].innerText
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
