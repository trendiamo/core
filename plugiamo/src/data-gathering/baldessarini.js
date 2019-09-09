import mixpanel from 'ext/mixpanel'
import { convertToDigits } from 'utils'
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
        const price = convertToDigits(
          jQuery
            .noConflict()(item)
            .find('span.price')
            .first()
            .text()
        )
        const itemQuantity = convertToDigits(
          jQuery
            .noConflict()(item)
            .find('input')
            .val()
        )
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
        subTotalInCents: convertToDigits(
          jQuery
            .noConflict()('span.price')
            .last()
            .text()
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
