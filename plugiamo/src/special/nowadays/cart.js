const updateCartSummaries = () => {
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
}

export const addToCart = serializedForm => {
  window.$.post('/cart/add.js', serializedForm, updateCartSummaries, 'text')
}

export const addMainProductToCart = () => {
  addToCart(window.$('.product-form').serialize())
}
