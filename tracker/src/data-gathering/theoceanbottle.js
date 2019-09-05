import mixpanel from 'ext/mixpanel'
import { getAffiliateToken } from 'utils'
import { RollbarWrapper } from 'ext/rollbar'
/* eslint-disable no-undef */

const convertToCents = selector => {
  if (!selector) return 0
  return Number(selector.replace(/\D/g, ''))
}

export default {
  getProductsFromCart() {
    return window
      .$('.cart-item')
      .map((i, item) => {
        const itemName = window
          .$(item)
          .find('.cart-title')
          .text()
          .trim()
        const itemUrl =
          'https://theoceanbottle.com' +
          window
            .$(item)
            .find('.cart-title')
            .children('a')
            .attr('href')
        const price = convertToCents(
          window
            .$(item)
            .find('.cart-item-total')
            .last()
            .text()
        )
        const itemQuantity = Number(
          window
            .$(item)
            .find('.cart-item-quantity-display')
            .attr('value')
        )
        const id = window.$(item).attr('data-variant')
        return {
          id,
          name: itemName,
          url: itemUrl,
          price,
          quantity: itemQuantity,
          currency: 'GBP',
        }
      })
      .toArray()
  },
  checkoutObject() {
    return {
      name: 'Proceed To Checkout',
      data: {
        hostname: location.hostname,
        products: this.getProductsFromCart(),
        currency: 'GBP',
        subTotalInCents: convertToCents(
          window
            .$('span.money')
            .last()
            .text()
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

    if (location.pathname.match(/^\/cart((\/\w+)+|\/?)/)) {
      window.$(document).on('click', '.cart-button-checkout.button', () =>
        RollbarWrapper(() => {
          const json = this.checkoutObject()
          mixpanel.track(json.name, json.data)
        })
      )
    }
  },
}
