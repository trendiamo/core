import mixpanel from 'ext/mixpanel'
import { convertToDigits } from 'utils'
import { getAffiliateToken } from 'utils'
import { RollbarWrapper } from 'ext/rollbar'

export default {
  triggerProceedToCheckout() {
    const products = window.jQuery
      .noConflict()('tr.cart_item')
      .map((i, item) => {
        const nameAndQuantity = window.jQuery
          .noConflict()(item)
          .find('.product-name')
          .text()
          .split('×')
        const name = nameAndQuantity[0].trim()
        const quantity = convertToDigits(nameAndQuantity[1]) || 1
        const price =
          convertToDigits(
            window.jQuery
              .noConflict()(item)
              .find('.product-total')
              .text()
          ) / quantity
        return {
          name,
          quantity,
          price,
          currency: 'EUR',
        }
      })
      .toArray()

    const data = {
      hostname: location.hostname,
      products,
      currency: 'EUR',
      subTotalInCents: convertToDigits(
        window.jQuery
          .noConflict()('.order-total')
          .find('.woocommerce-Price-amount.amount')
          .first()
          .text()
      ),
      affiliateToken: getAffiliateToken(),
    }
    mixpanel.track('Proceed To Checkout', data)
  },
  _setupDataGathering() {
    if (location.pathname.match(/order-received/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname, affiliateToken: getAffiliateToken() })
    }

    if (!window.jQuery || !window.jQuery.noConflict) return

    if (location.pathname.match(/^\/checkout/)) {
      this.triggerProceedToCheckout()
    }
  },
  setupDataGathering() {
    RollbarWrapper(this._setupDataGathering.bind(this))
  },
}
