import mixpanel from 'ext/mixpanel'
import { convertToDigits } from 'utils'
import { getAffiliateToken } from 'utils'
import { RollbarWrapper } from 'ext/rollbar'
/* eslint-disable no-undef */

export default {
  getProduct(isMenuCart, item) {
    if (isMenuCart) {
      const itemName = jQuery
        .noConflict()(item)
        .find('h3')
        .children('a')
        .text()
        .trim()
      const itemUrl = jQuery
        .noConflict()(item)
        .find('h3')
        .children('a')
        .attr('href')
      const price = convertToDigits(
        jQuery
          .noConflict()(item)
          .find('.woocommerce-Price-amount.amount')
          .first()
          .text()
      )
      const quantity = convertToDigits(
        jQuery
          .noConflict()(item)
          .find('.mc-quantity')
          .text()
          .split('×')[0]
      )
      return {
        name: itemName,
        url: itemUrl,
        price,
        quantity,
        currency: 'EUR',
      }
    } else {
      const itemName = jQuery
        .noConflict()(item)
        .find('.product-name')
        .children('a')
        .text()
        .trim()
      const itemUrl = jQuery
        .noConflict()(item)
        .find('.product-name')
        .children('a')
        .attr('href')
      const price = convertToDigits(
        jQuery
          .noConflict()(item)
          .find('.product-price')
          .text()
      )
      const quantity = convertToDigits(
        jQuery
          .noConflict()(item)
          .find('input')
          .val()
      )
      return {
        name: itemName,
        url: itemUrl,
        quantity,
        price,
        currency: 'EUR',
      }
    }
  },
  getProductsFromCart(isMenuCart = false) {
    const cartElement = isMenuCart ? jQuery.noConflict()('div.cart-item') : jQuery.noConflict()('tr.cart_item')
    return cartElement.map((i, item) => this.getProduct(isMenuCart, item)).toArray()
  },
  checkoutObject(isMenuCart = false) {
    return {
      name: 'Proceed To Checkout',
      data: {
        hostname: location.hostname,
        products: this.getProductsFromCart(isMenuCart),
        currency: 'EUR',
        subTotalInCents: convertToDigits(
          jQuery
            .noConflict()('.cart-subtotal')
            .find('.woocommerce-Price-amount.amount')
            .last()
            .text()
        ),
        affiliateToken: getAffiliateToken(),
      },
    }
  },
  setupDataGathering() {
    if (location.pathname.match(/order-received/)) {
      // after purchase page
      mixpanel.track('Purchase Success', { hostname: location.hostname, affiliateToken: getAffiliateToken() })
    }

    if (!window.jQuery || !window.jQuery.noConflict) return

    jQuery
      .noConflict()('.go-to-checkout')
      .on('click', () =>
        RollbarWrapper(() => {
          // proceed to checkout through menu cart
          const isMenuCart = true
          const json = this.checkoutObject(isMenuCart)
          mixpanel.track(json.name, json.data)
        })
      )
    if (location.pathname.match(/^\/cart/)) {
      // proceed to checkout through cart page
      jQuery
        .noConflict()(document)
        .on('click', '.checkout-button', () =>
          RollbarWrapper(() => {
            const json = this.checkoutObject()
            mixpanel.track(json.name, json.data)
          })
        )
    }
  },
}
