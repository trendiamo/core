import mixpanel from 'ext/mixpanel'
import { RollbarWrapper } from 'ext/rollbar'
/* eslint-disable no-undef */

export default {
  getProductsFromCart() {
    return $('.cart__row')
      .map((i, item) => {
        const itemName = $(item)
          .find('.cart__product-name')
          .text()
          .trim()
        if (!itemName) return
        const itemUrl =
          location.hostname +
          $(item)
            .find('.cart__product-name')
            .attr('href')
        const price = Number(
          $(item)
            .find('.cart__price')
            .text()
            .replace(/\D/g, '')
        )
        const itemQuantity = $(item)
          .find('.js-qty__num')
          .attr('value')
        return {
          name: itemName,
          url: itemUrl,
          price,
          quantity: itemQuantity,
          currency: 'EUR',
        }
      })
      .toArray()
  },
  getProductsFromAjaxCart() {
    return $('.ajaxcart__product')
      .map((i, item) => {
        const itemName = $(item)
          .find('.ajaxcart__product-name')
          .text()
          .trim()
        if (!itemName) return
        const itemUrl =
          location.hostname +
          $(item)
            .find('.ajaxcart__product-name')
            .attr('href')
        const itemPrice = $(item)
          .find('.ajaxcart__price')
          .text()
          .trim()
        const itemPriceInCents = Number(
          $(item)
            .find('.ajaxcart__price')
            .text()
            .replace(/\D/g, '')
        )
        const itemQuantity = $(item)
          .find('.ajaxcart__qty-num')
          .attr('value')
        return {
          name: itemName,
          url: itemUrl,
          price: itemPrice,
          priceInCents: itemPriceInCents,
          quantity: itemQuantity,
          currency: 'EUR',
        }
      })
      .toArray()
  },
  checkoutObject() {
    if ($('#CartDrawer.js-drawer-open')[0]) {
      return {
        name: 'Proceed To Checkout',
        data: {
          hostname: location.hostname,
          withPlugin: !!$('iframe[title="Frekkls Launcher"]')[0],
          products: this.getProductsFromAjaxCart(),
          subTotalInCents: Number(
            $('.ajaxcart__subtotal')
              .last()
              .text()
              .replace(/\D/g, '')
          ),
          currency: 'EUR',
        },
      }
    } else {
      return {
        name: 'Proceed To Checkout',
        data: {
          hostname: location.hostname,
          withPlugin: !!$('iframe[title="Frekkls Launcher"]')[0],
          products: this.getProductsFromCart(),
          subTotalInCents: Number(
            $('.cart__subtotal')
              .text()
              .replace(/\D/g, '')
          ),
          currency: 'EUR',
        },
      }
    }
  },
  setupDataGathering() {
    const _this = this
    if (location.pathname.match(/9662595172/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }

    if (!window.$) return

    $(document).on('submit', 'form.cart.ajaxcart', () =>
      RollbarWrapper(() => {
        const json = _this.checkoutObject()
        mixpanel.track(json.name, json.data)
      })
    )
    if (location.pathname.match(/^\/cart/)) {
      $('form.cart').on('click', 'button.cart__checkout', () =>
        RollbarWrapper(() => {
          const json = _this.checkoutObject()
          mixpanel.track(json.name, json.data)
        })
      )
    }
  },
}
