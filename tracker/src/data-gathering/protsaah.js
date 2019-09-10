import mixpanel from 'ext/mixpanel'
import { convertToDigits } from 'utils'
import { RollbarWrapper } from 'ext/rollbar'

export default {
  triggerTopCartProceedToCheckout() {
    const products = window.jQuery
      .noConflict()('#minicart-content-wrapper .product-item')
      .map((i, item) => {
        const name = window.jQuery
          .noConflict()(item)
          .find('.product-item-name')
          .children('a')
          .text()
        const url = window.jQuery
          .noConflict()(item)
          .find('.product-item-name')
          .children('a')
          .attr('href')
        const price = convertToDigits(
          window.jQuery
            .noConflict()(item)
            .find('span.price')
            .first()
            .text()
        )
        const quantity = convertToDigits(
          window.jQuery
            .noConflict()(item)
            .find('input')
            .val()
        )
        return {
          name,
          url,
          price,
          quantity,
          currency: 'CHF',
        }
      })
      .toArray()
    const data = {
      hostname: location.hostname,
      products,
      subTotalInCents: convertToDigits(
        window.jQuery
          .noConflict()('#minicart-content-wrapper span.price')
          .last()
          .text()
      ),
      currency: 'CHF',
    }
    mixpanel.track('Proceed To Checkout', data)
  },
  triggerCartProceedToCheckout() {
    const products = window.jQuery
      .noConflict()('.cart.item:not(.message)')
      .map((i, item) => {
        const name = window.jQuery
          .noConflict()(item)
          .find('.product-item-name')
          .children('a')
          .text()
        const url = window.jQuery
          .noConflict()(item)
          .find('.product-item-name')
          .children('a')
          .attr('href')
        const price = convertToDigits(
          window.jQuery
            .noConflict()(item)
            .find('span.price')
            .first()
            .text()
        )
        const quantity = convertToDigits(
          window.jQuery
            .noConflict()(item)
            .find('input')
            .val()
        )
        return {
          name,
          url,
          price,
          quantity,
          currency: 'CHF',
        }
      })
      .toArray()

    const data = {
      hostname: location.hostname,
      products,
      subTotalInCents: convertToDigits(
        window.jQuery
          .noConflict()('.cart-totals span.price')
          .last()
          .text()
      ),
      currency: 'CHF',
    }
    mixpanel.track('Proceed To Checkout', data)
  },
  setupDataGathering() {
    if (location.pathname.match(/onepage\/success/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }

    if (!window.jQuery || !window.jQuery.noConflict) return

    if (location.pathname.match(/\/checkout\/cart/)) {
      window.jQuery
        .noConflict()(document)
        .on('click', 'button.action.primary.checkout', () =>
          RollbarWrapper(() => {
            this.triggerCartProceedToCheckout()
          })
        )
    }

    // on every page (including cart page)
    window.jQuery
      .noConflict()(document)
      .on('click', '#top-cart-btn-checkout', () =>
        RollbarWrapper(() => {
          this.triggerTopCartProceedToCheckout()
        })
      )
  },
}
