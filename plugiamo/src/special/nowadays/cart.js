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
  },
  'www.buttwrap.com': {
    addToCart(serializedForm) {
      // const $form = window.$('form.product-single__form')
      // // TODO: change some form values here!!
      // window.$(':input[name="id"]', $form)
      // console.log(serializedForm)
      // // $form.unserializeForm(serializedForm)
      // $form
      // $form.submit()
      console.log('Frekkls: not supported', { serializedForm })
    },
    addMainProductToCart() {
      const $form = window.$('form.product-single__form')
      $form.submit()
    },
  },
}

export const addToCart = serializedForm => cart[window.location.hostname].addToCart(serializedForm)
export const addMainProductToCart = () => cart[window.location.hostname].addMainProductToCart()
