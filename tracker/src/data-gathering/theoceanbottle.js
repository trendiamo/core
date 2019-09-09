import mixpanel from 'ext/mixpanel'
import { convertToDigits } from 'utils'
import { getAffiliateToken } from 'utils'
import { RollbarWrapper } from 'ext/rollbar'
/* eslint-disable no-undef */

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
        const price = convertToDigits(
          window
            .$(item)
            .find('.cart-item-price')
            .text()
        )
        const itemQuantity = convertToDigits(
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
        subTotalInCents: convertToDigits(
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
      window.$(document).on('click', '.dynamic-checkout__content div[role="button"]', () =>
        RollbarWrapper(() => {
          const json = this.checkoutObject()
          mixpanel.track(json.name, json.data)
        })
      )
    }
  },
}
