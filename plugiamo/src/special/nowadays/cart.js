const cart = {
  'www.buttwrap.com': {
    scrollToCart() {
      window.$('.btn.btn--full.add-to-cart')[0].scrollIntoView({ block: 'end', inline: 'nearest' })
      window.scrollBy({
        top: 200,
        behavior: 'smooth',
      })
    },
    scrollToCheckout() {
      window.$('.btn.cart__checkout.cart__checkout--page')[0].scrollIntoView({ block: 'end', inline: 'nearest' })
      window.scrollBy({
        top: 100,
        behavior: 'smooth',
      })
    },
  },
}

export const scrollToCart = () => cart[window.location.hostname].scrollToCart()
export const scrollToCheckout = () => cart[window.location.hostname].scrollToCheckout()
