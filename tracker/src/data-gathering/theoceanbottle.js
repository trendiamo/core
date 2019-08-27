import mixpanel from 'ext/mixpanel'
import { getAffiliateToken } from 'utils'
/* eslint-disable no-undef */

const convertToCents = selector => {
  if (!selector) return 0
  return Number(selector.replace(/\D/g, ''))
}

export default {
  addToCartObject() {
    const formFields = window.$('form.shopify-product-form').serializeArray()
    return {
      name: 'Add To Cart',
      data: {
        hostname: location.hostname,
        productId:
          formFields.find(element => element.name === 'id') && formFields.find(element => element.name === 'id').value,
        productName: window
          .$('.product-title')
          .first()
          .text(),
        subTotalInCents: convertToCents(
          window
            .$('span.money')
            .first()
            .text()
        ),
        currency: 'GBP',
        quantity: Number(
          formFields.find(element => element.name === 'quantity') &&
            formFields.find(element => element.name === 'quantity').value
        ),
        affiliateToken: getAffiliateToken(),
      },
    }
  },
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
    if (!window.$) return
    if (location.pathname.match(/\/thank_you$/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    } else if (location.pathname.match(/^\/cart((\/\w+)+|\/?)/)) {
      window.$(document).on('click', '.cart-button-checkout.button', () => {
        try {
          const json = this.checkoutObject()
          mixpanel.track(json.name, json.data)
        } catch (error) {
          // No action
        }
      })
    } else if (
      location.pathname.match(/\/products?.*/) ||
      location.pathname.match(/\/collections\/:collectionName\/products\/?.*/)
    ) {
      window.$(document).on('submit', '.shopify-product-form', () => {
        try {
          const json = this.addToCartObject()
          mixpanel.track(json.name, json.data)
        } catch (error) {
          // No action
        }
      })
    }
  },
}
