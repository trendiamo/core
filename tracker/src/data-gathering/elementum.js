import mixpanel from 'ext/mixpanel'
import { convertToDigits, getAffiliateToken } from 'utils'
import { RollbarWrapper } from 'ext/rollbar'

export default {
  triggerCartProceedToCheckout() {
    const products = window
      .$('div.ajaxcart__product')
      .map((i, item) => {
        const name = window
          .$(item)
          .find('.ajaxcart__product-name')
          .text()
        const url =
          location.origin +
          window
            .$(item)
            .find('a')
            .attr('href')
        const price = convertToDigits(
          window
            .$(item)
            .find('.ajaxcart__price')
            .text()
        )
        const quantity = window.$('.ajaxcart__qty-num').val()
        return {
          name,
          url,
          price,
          quantity,
          currency: 'EUR',
        }
      })
      .toArray()
    mixpanel.track('Proceed To Checkout', {
      hostname: location.hostname,
      products,
      currency: 'EUR',
      subTotalInCents: convertToDigits(
        window
          .$('.ajaxcart__subtotal')
          .last()
          .text()
      ),
      affiliateToken: getAffiliateToken(),
    })
  },
  triggerDirectProceedToCheckout() {
    const products = [
      {
        name: window.$('.product-single__title').text(),
        url: location.origin + location.pathname,
        price: convertToDigits(window.$('.product-single__price').text()),
        quantity: 1,
        currency: 'EUR',
      },
    ]
    mixpanel.track('Proceed To Checkout', {
      hostname: location.hostname,
      products,
      currency: 'EUR',
      subTotalInCents: convertToDigits(
        window
          .$('.product-single__price')
          .last()
          .text()
      ),
      affiliateToken: getAffiliateToken(),
    })
  },
  setupDataGathering() {
    if (location.pathname.match(/\/thank_you$/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname, affiliateToken: getAffiliateToken() })
    }

    if (!window.$) return

    window
      .$('button.shopify-payment-button__more-options, [data-testid="PayPalInContext-button"]')
      .on('click', () => RollbarWrapper(this.triggerDirectProceedToCheckout.bind(this)))

    window
      .$(document)
      .on('click', 'button.cart__checkout', () => RollbarWrapper(this.triggerCartProceedToCheckout.bind(this)))
  },
}
