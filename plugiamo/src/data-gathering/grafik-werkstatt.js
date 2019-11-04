import mixpanel from 'ext/mixpanel'
import { convertToDigits } from 'utils'
import { RollbarWrapper } from 'ext/rollbar'

export default {
  checkoutObject() {
    const products = window.jQuery
      .noConflict()('#shopping-cart-table tbody tr')
      .map((i, item) => {
        const itemName = window.jQuery
          .noConflict()(item)
          .find('.product-name a')
          .text()
          .trim()
        const itemUrl = window.jQuery
          .noConflict()(item)
          .find('.product-name a')
          .attr('href')
        const price = convertToDigits(
          window.jQuery
            .noConflict()(item)
            .find('span.price')
            .first()
            .text()
        )
        const itemQuantity = convertToDigits(
          window.jQuery
            .noConflict()(item)
            .find('input')
            .val()
        )
        const id = (itemUrl || '/').split('/').pop()
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
    return {
      hostname: location.hostname,
      withPlugin: !!window.jQuery.noConflict()('iframe[title="Frekkls Launcher"]')[0],
      products,
      subTotalInCents: convertToDigits(
        window.jQuery
          .noConflict()('.subtotal-price span.price')
          .last()
          .text()
      ),
      currency: 'EUR',
    }
  },
  setupDataGathering() {
    const _this = this
    if (location.pathname.match(/onepage\/success/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }

    if (!window.jQuery || !window.jQuery.noConflict) return

    if (location.pathname.match(/^\/checkout\/cart/)) {
      window.jQuery
        .noConflict()(document)
        .on('click', '.btn-checkout, a[data-action="checkout-form-submit"]', () =>
          RollbarWrapper(() => {
            const json = _this.checkoutObject()
            mixpanel.track('Proceed To Checkout', json)
          })
        )
    }
  },
}
