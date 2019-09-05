import mixpanel from 'ext/mixpanel'
import { RollbarWrapper } from 'ext/rollbar'
/* eslint-disable no-undef */

export default {
  getProductsFromCart() {
    return jQuery
      .noConflict()('.cart.item:not(.message)')
      .map((i, item) => {
        const itemName = jQuery
          .noConflict()(item)
          .find("[data-th='Artikel']")
          .children('a')
          .attr('title')
        const itemUrl = jQuery
          .noConflict()(item)
          .find("[data-th='Artikel']")
          .children('a')
          .attr('href')
        const price = Number(
          jQuery
            .noConflict()(item)
            .find('span.price')
            .last()
            .text()
            .replace(/\D/g, '')
        )
        const itemQuantity = jQuery
          .noConflict()(item)
          .find("[title='Menge']")
          .attr('value')
        const id = itemUrl.split('/').pop()
        return {
          id,
          name: itemName,
          url: itemUrl,
          price,
          quantity: itemQuantity,
          currency: 'EUR',
        }
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
        subTotalInCents: Number(
          jQuery
            .noConflict()('span.price')
            .last()
            .text()
            .replace(/\D/g, '')
        ),
        currency: 'EUR',
      },
    }
  },
  setupDataGathering() {
    const _this = this
    if (location.pathname.match(/onepage\/success/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }

    if (!window.jQuery || !window.jQuery.noConflict) return

    if (location.pathname.match(/^\/de\/checkout\/cart/)) {
      jQuery
        .noConflict()(document)
        .on('click', 'button.action.primary.checkout', () =>
          RollbarWrapper(() => {
            const json = _this.checkoutObject()
            mixpanel.track(json.name, json.data)
          })
        )
    }
  },
}
