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
  },
}

const cart = cartFactory[window.location.hostname]

export const scrollToCart = () => cart && cart.scrollToCart()
export const scrollToCheckout = () => cart && cart.scrollToCheckout()
