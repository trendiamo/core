import mixpanel from 'ext/mixpanel'
import { getAffiliateToken } from 'utils'
import { RollbarWrapper } from 'ext/rollbar'
/* eslint-disable no-undef */

const convertToCents = selector => {
  if (!selector) return 0
  return Number(selector.replace(/\D/g, ''))
}

export default {
  addToCartObject() {
    return {
      name: 'Add To Cart',
      data: {
        hostname: location.hostname,
        productId: jQuery
          .noConflict()('button.single_add_to_cart_button')
          .attr('value'),
        productName: jQuery
          .noConflict()('.product_title')
          .text(),
        subTotalInCents: convertToCents(
          jQuery
            .noConflict()('.price_value')
            .last()
            .text()
        ),
        currency: 'EUR',
        quantity: Number(
          jQuery
            .noConflict()('.quantity > input')
            .attr('value')
        ),
        affiliateToken: getAffiliateToken(),
      },
    }
  },
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
      const price = convertToCents(
        jQuery
          .noConflict()(item)
          .find('.product-subtotal')
          .text()
      )
      return {
        name: itemName,
        url: itemUrl,
        price,
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
      const price = convertToCents(
        jQuery
          .noConflict()(item)
          .find('.product-subtotal')
          .text()
      )
      return {
        name: itemName,
        url: itemUrl,
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
        subTotalInCents: convertToCents(
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
    } else if (location.pathname.match(/product\//)) {
      jQuery
        .noConflict()(document)
        .on('submit', 'form.cart', () =>
          RollbarWrapper(() => {
            const json = this.addToCartObject()
            mixpanel.track(json.name, json.data)
          })
        )
    }
  },
}
