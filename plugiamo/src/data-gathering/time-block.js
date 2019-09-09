import mixpanel from 'ext/mixpanel'
import { convertToDigits } from 'utils'
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
        const priceInCents = convertToDigits(
          $(item)
            .find('.woocommerce-Price-amount.amount')
            .first()
            .text()
        )
        const price =
          $(item)
            .find('.woocommerce-Price-amount.amount')
            .first()
            .text() +
          $(item)
            .find('.subscription-details')
            .first()
            .text()

        const itemQuantity = convertToDigits(
          $(item)
            .find('.input-text.qty.text')
            .attr('value')
        )
        const isSubscription = !!$(item)
          .find('.subscription-details')
          .text()
        return {
          name: itemName,
          url: itemUrl,
          price,
          priceInCents,
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
          .first()
          .text()
        const itemPriceInCents = convertToDigits(
          $(item)
            .find('.woocommerce-Price-amount.amount')
            .first()
            .text()
        )
        const itemQuantity = convertToDigits(
          $(item)
            .find('.quantity-container')
            .text()
        )

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
  getDataFromPDP() {
    const isSubscription = $('form.cart button[type="submit"]').text() === 'Sign Up Now'
    return [
      {
        name: $(isSubscription ? '.woocommerce-product-details__short-description p' : '.product_title.entry-title')
          .first()
          .text(),
        url: location.href,
        price: $('.uncont .price').text(),
        priceInCents: convertToDigits($('.uncont .woocommerce-Price-amount.amount').text()),
        quantity: convertToDigits($('form.cart .quantity input').val()),
        currency: 'EUR',
        isSubscription,
      },
    ]
  },
  checkoutObject({ isfromAjaxCart, isProductPage }) {
    const products = isProductPage
      ? this.getDataFromPDP()
      : isfromAjaxCart
      ? this.getProductsFromAjaxCart()
      : this.getProductsFromCart()

    const subTotalInCents = convertToDigits(
      isfromAjaxCart
        ? $('.order-total')
            .first()
            .text()
        : $('.product_list_widget')
            .find('.woocommerce-Price-amount.amount')
            .last()
            .text()
    )

    return {
      name: 'Proceed To Checkout',
      data: {
        hostname: location.hostname,
        withPlugin: !!$('iframe[title="Frekkls Launcher"]')[0],
        products,
        subTotalInCents,
        currency: 'EUR',
      },
    }
  },
  setupDataGathering() {
    const _this = this
    if (location.pathname.match(/order-received/)) {
      // after purchase page
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }

    if (!window.$) return

    $(document).on('click', '.checkout.wc-forward.btn.btn-link', () =>
      RollbarWrapper(() => {
        // ajax cart
        const json = _this.checkoutObject({ isfromAjaxCart: true })
        mixpanel.track(json.name, json.data)
      })
    )
    if (location.pathname.match(/^\/de\/warenkorb/)) {
      // regular cart
      $(document).on('click', '.checkout-button.btn.btn-default.alt.wc-forward, #woo_pp_ec_button', () =>
        RollbarWrapper(() => {
          const json = _this.checkoutObject({})
          mixpanel.track(json.name, json.data)
        })
      )
    }

    if (location.pathname.match(/^\/de\//)) {
      $(document).on('click', '#woo_pp_ec_button_product', () =>
        RollbarWrapper(() => {
          const json = _this.checkoutObject({ isProductPage: true })
          mixpanel.track(json.name, json.data)
        })
      )
    }
  },
}
