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
      return {
        name: 'Add To Cart',
        data: {
          withPlugin: !!window.$('.trendiamo-container')[0],
          productId: window
            .$('form.product-single__form')
            .serializeArray()
            .find(element => element.name === 'id').value,
          productName: window.$('.product-single__title')[0].innerHTML,
          productPrice: window.$('span.money')[0].innerHTML,
          productSize: window
            .$('form.product-single__form')
            .serializeArray()
            .find(element => element.name === 'Size').value,
          productQuantity: window
            .$('form.product-single__form')
            .serializeArray()
            .find(element => element.name === 'quantity').value,
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
      return {
        name: 'Proceed To Checkout',
        data: {
          withPlugin: !!window.$('.trendiamo-container')[0],
          products: this.getProductsFromCart(),
          currency: window.$('.lion-cart-total > span.money').attr('data-currency') || 'EUR',
          subTotal: window.$('.lion-cart-total > span.money')[0].innerText,
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
