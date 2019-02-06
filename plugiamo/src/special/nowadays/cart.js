const cart = {
  'nowadays.com': {
    updateCartSummaries() {
      window.$.get('/search', data => {
        const selectors = ['.toolbar-cart', '#cart-summary']
        const $parsed = window.$(window.$.parseHTML('<div>' + data + '</div>'))
        for (let i = 0; i < selectors.length; i++) {
          const cartSummarySelector = selectors[i]
          const $newCartObj = $parsed.find(cartSummarySelector).clone()
          const $currCart = window.$(cartSummarySelector)
          $currCart.replaceWith($newCartObj)
        }
      })
    },
    addToCart(serializedForm) {
      window.$.post('/cart/add.js', serializedForm, this.updateCartSummaries, 'text')
    },
    addMainProductToCart() {
      this.addToCart(window.$('.product-form').serialize())
    },
    proceedToCheckout() {},
  },
  'www.buttwrap.com': {
    updateCartSummaries() {
      if (window.$('.cart-link__bubble--visible').length) return
      const newCartLink = window.$('<span />').attr('class', 'cart-link__bubble cart-link__bubble--visible')
      window.$('.cart-link').append(newCartLink)
    },
    addToCart(serializedForm) {
      window.$.post('/cart/add.js', serializedForm, this.updateCartSummaries, 'text')
    },
    addMainProductToCart() {
      this.addToCart(window.$('.product-single__form').serialize())
    },
    proceedToCheckout() {
      if (!window.$('#CartPageAgree').is(':checked')) return false
      window.$('.btn.cart__checkout.cart__checkout--page').click()
      return true
    },
  },
}

export const addToCart = serializedForm => cart[window.location.hostname].addToCart(serializedForm)
export const addMainProductToCart = () => cart[window.location.hostname].addMainProductToCart()
export const proceedToCheckout = () => cart[window.location.hostname].proceedToCheckout()
