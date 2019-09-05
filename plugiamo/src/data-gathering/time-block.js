import mixpanel from 'ext/mixpanel'
import { RollbarWrapper } from 'ext/rollbar'
/* eslint-disable no-undef */

export default {
  getProductsFromCart() {
    return $('.woocommerce-cart-form__cart-item.cart_item')
      .map((i, item) => {
        const itemName = $(item)
          .find('.product-name')
          .text()
          .trim()
        if (!itemName) return
        const itemUrl = $(item)
          .find('.product-name > a')
          .first()
          .attr('href')
        const price = Number(
          $(item)
            .find('.woocommerce-Price-amount.amount')
            .last()
            .text()
            .replace(/\D/g, '')
        )
        const itemQuantity = $(item)
          .find('.input-text.qty.text')
          .attr('value')
        const isSubscription = !!$(item)
          .find('.subscription-details')
          .text()
        return {
          name: itemName,
          url: itemUrl,
          price,
          quantity: itemQuantity,
          currency: 'EUR',
          isSubscription,
        }
      })
      .toArray()
  },
  getProductsFromAjaxCart() {
    return $('.product_list_widget')
      .find('.cart-item-list')
      .map((i, item) => {
        const itemName = $(item)
          .find('.cart-item')
          .text()
          .trim()
        if (!itemName) return
        const itemUrl = $(item)
          .find('.cart-thumb')
          .first()
          .attr('href')
        const itemPrice = $(item)
          .find('.woocommerce-Price-amount.amount')
          .last()
          .text()
        const itemPriceInCents = Number(
          $(item)
            .find('.woocommerce-Price-amount.amount')
            .last()
            .text()
            .replace(/\D/g, '')
        )
        const itemQuantity = $(item)
          .find('.quantity-container')
          .text()
          .replace(/\D/g, '')

        const isSubscription = !!$(item)
          .find('.subscription-details')
          .text()

        return {
          name: itemName,
          url: itemUrl,
          price: itemPrice,
          priceInCents: itemPriceInCents,
          quantity: itemQuantity,
          currency: 'EUR',
          isSubscription,
        }
      })
      .toArray()
  },
  checkoutObject(isfromAjaxCart = false) {
    if (isfromAjaxCart) {
      return {
        name: 'Proceed To Checkout',
        data: {
          hostname: location.hostname,
          withPlugin: !!$('iframe[title="Frekkls Launcher"]')[0],
          products: this.getProductsFromAjaxCart(),
          subTotalInCents: Number(
            $('.product_list_widget')
              .find('.woocommerce-Price-amount.amount')
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
            $('.order-total')
              .first()
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
    if (location.pathname.match(/order-received/)) {
      // after purchase page
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }

    if (!window.$) return

    $('.checkout.wc-forward.btn.btn-link').on('click', () => () =>
      RollbarWrapper(() => {
        // ajax cart
        const isfromAjaxCart = true
        const json = _this.checkoutObject(isfromAjaxCart)
        mixpanel.track(json.name, json.data)
      })
    )
    if (location.pathname.match(/^\/de\/warenkorb/)) {
      // regular cart
      $('.checkout-button.btn.btn-default.alt.wc-forward ').on('click', () =>
        RollbarWrapper(() => {
          const json = _this.checkoutObject()
          mixpanel.track(json.name, json.data)
        })
      )
    }
  },
}
