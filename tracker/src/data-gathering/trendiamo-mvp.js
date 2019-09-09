import mixpanel from 'ext/mixpanel'
import { getAffiliateToken } from 'utils'
import { RollbarWrapper } from 'ext/rollbar'
/* eslint-disable no-undef */

const convertToCents = selector => {
  if (!selector) return 0
  return Number(selector.replace(/\D/g, ''))
}

export default {
  getProduct(isAjaxCart, item) {
    if (isAjaxCart) {
      const itemName = window
        .$(item)
        .find('.ajaxcart__product-name')
        .text()
      const itemUrl =
        location.origin +
        window
          .$(item)
          .find('a')
          .attr('href')
      const price = convertToCents(
        window
          .$(item)
          .find('div.ajaxcart-item__price')
          .text()
      )
      return {
        name: itemName,
        url: itemUrl,
        price,
        currency: 'EUR',
      }
    } else {
      const itemName = window
        .$(item)
        .find('.cart__product-name')
        .text()
      const itemUrl =
        location.origin +
        window
          .$(item)
          .find('a.cart__product-image')
          .attr('href')
      const price = convertToCents(
        window
          .$(item)
          .find('.cart-item__price')
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
  getProductsFromCart(isAjaxCart = false) {
    {
      const cartElement = isAjaxCart ? window.$('div.ajaxcart__product') : window.$('div.cart__product')
      return cartElement.map((i, item) => this.getProduct(isAjaxCart, item)).toArray()
    }
  },
  checkoutObject(isAjaxCart = false) {
    return {
      name: 'Proceed To Checkout',
      data: {
        hostname: location.hostname,
        products: this.getProductsFromCart(isAjaxCart),
        currency: 'EUR',
        subTotalInCents: convertToCents(
          isAjaxCart
            ? window
                .$('.ajaxcart__footer-total')
                .find('.money')
                .text()
            : window.$('#bk-cart-subtotal-price').text()
        ),
        affiliateToken: getAffiliateToken(),
      },
    }
  },
  setupDataGathering() {
    if (location.pathname.match(/\/thank_you$/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname, affiliateToken: getAffiliateToken() })
    }

    if (!window.$) return

    window.$(document).on('submit', 'form.cart.ajaxcart__form', () =>
      RollbarWrapper(() => {
        const isAjaxCart = true
        const json = this.checkoutObject(isAjaxCart)
        mixpanel.track(json.name, json.data)
      })
    )
    if (location.pathname.match(/^\/cart((\/\w+)+|\/?)/)) {
      window.$(document).on('click', '.cart__checkout', () =>
        RollbarWrapper(() => {
          const json = this.checkoutObject()
          mixpanel.track(json.name, json.data)
        })
      )
    }
  },
}