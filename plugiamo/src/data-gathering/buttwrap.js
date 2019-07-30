import mixpanel from 'ext/mixpanel'

const convertToCents = selector => {
  return Number(selector.replace(/\D/g, ''))
}

export default {
  addToCartObject() {
    const formFields = window.$('form.product-single__form').serializeArray()
    return {
      name: 'Add To Cart',
      data: {
        hostname: location.hostname,
        withPlugin: !!window.$('.frekkls-container')[0],
        productId: formFields.find(element => element.name === 'id').value,
        productName: window.$('.product-single__title').html(),
        subTotalInCents: convertToCents(window.$('span.money').html()),
        productSize: formFields.find(element => element.name === 'Size').value,
        productQuantity: formFields.find(element => element.name === 'quantity').value,
      },
    }
  },
  getProductsFromCart() {
    const table = window.$('form.cart > div')
    let products = []
    table.each((index, element) => {
      if (index === 0 || index === table.length - 1) return
      const url = element.querySelector('a').href
      const name = element.querySelector('.cart__product-name').innerText
      const size = element.querySelector('.grid__item.medium-up--three-fifths .grid__item.three-quarters > p').innerText
      const quantity = Number(element.querySelector('input').value)
      const itemPrice = convertToCents(element.querySelector('.money').innerText)
      const subTotalInCents = Math.round(itemPrice * quantity)
      const id = element
        .querySelector('input')
        .getAttribute('data-id')
        .split(':')[0]
      const product = { id, url, name, size, quantity, itemPrice, subTotalInCents }
      products.push(product)
    })
    return products
  },
  checkoutObject() {
    const moneySpans = window.$('span.money').last()
    return {
      name: 'Proceed To Checkout',
      data: {
        hostname: location.hostname,
        withPlugin: !!window.$('.frekkls-container')[0],
        products: this.getProductsFromCart(),
        currency: moneySpans.attr('data-currency') || 'EUR',
        subTotalInCents: convertToCents(moneySpans.text()),
      },
    }
  },
  setupDataGathering() {
    if (location.pathname.match(/\/thank_you$/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    } else if (location.pathname.match(/^\/cart((\/\w+)+|\/?)/)) {
      window.$(document).on('click', '.cart__checkout--page', () => {
        if (window.$('#CartPageAgree').is(':checked')) {
          const json = this.checkoutObject()
          mixpanel.track(json.name, json.data)
        }
      })
    } else if (
      location.pathname.match(/\/products?.*/) ||
      location.pathname.match(/\/collections\/:collectionName\/products\/?.*/)
    ) {
      window.$(document).on('submit', '.product-single__form', () => {
        const json = this.addToCartObject()
        mixpanel.track(json.name, json.data)
      })
    }
  },
}
