import mixpanel from 'ext/mixpanel'

const cartFactory = {
  'www.buttwrap.com': {
    scrollToCart() {
      window.$('html, body').animate(
        {
          scrollTop: window.$('form.product-single__form').offset().top - (20 + window.$('.site-header').outerHeight()),
        },
        500
      )
    },
    scrollToCheckout() {
      window.$('html, body').animate(
        {
          scrollTop: window.$('form.cart').offset().top - (20 + window.$('.site-header').outerHeight()),
        },
        500
      )
    },
    addToCartObject() {
      const formFields = window.$('form.product-single__form').serializeArray()
      return {
        name: 'Add To Cart',
        data: {
          hostname: location.hostname,
          withPlugin: !!window.$('.trendiamo-container')[0],
          productId: formFields.find(element => element.name === 'id').value,
          productName: window.$('.product-single__title').html(),
          productPrice: window.$('span.money').html(),
          productSize: formFields.find(element => element.name === 'Size').value,
          productQuantity: formFields.find(element => element.name === 'quantity').value,
        },
      }
    },
    getProductsFromCart() {
      const products = window.$('a.cart__product-name').map(() => {
        return { url: this.href }
      })
      window
        .$('form.cart')
        .serializeArray()
        .map(a => {
          return {
            quantity: a.value,
          }
        })
        .forEach((quantity, index) => (products[index] = { ...products[index], ...quantity }))
      return products
    },
    checkoutObject() {
      const moneySpans = window.$('span.money').last()
      return {
        name: 'Proceed To Checkout',
        data: {
          hostname: location.hostname,
          withPlugin: !!window.$('.trendiamo-container')[0],
          products: this.getProductsFromCart(),
          currency: moneySpans.attr('data-currency') || 'EUR',
          subTotal: moneySpans.text(),
        },
      }
    },
    triggerMixpanelPageEvents() {
      const _this = this
      if (location.pathname.match(/^\/cart((\/\w+)+|\/?)/)) {
        if (window.$('#CartPageAgree').is(':checked')) {
          window.$(document).on('click', '.cart__checkout--page', () => {
            const json = _this.checkoutObject()
            mixpanel.track(json.name, json.data)
          })
        }
      } else if (
        location.pathname.match(/\/products?.*/) ||
        location.pathname.match(/\/collections\/:collectionName\/products\/?.*/)
      ) {
        window.$(document).on('submit', '.product-single__form', () => {
          const json = _this.addToCartObject()
          mixpanel.track(json.name, json.data)
        })
      }
    },
  },
}

const cart = cartFactory[window.location.hostname]

export const scrollToCart = () => cart && cart.scrollToCart()
export const scrollToCheckout = () => cart && cart.scrollToCheckout()
export const triggerMixpanelPageEvents = () => cart && cart.triggerMixpanelPageEvents()
