import mixpanel from 'ext/mixpanel'
import { RollbarWrapper } from 'ext/rollbar'

const convertToCents = selector => {
  return Number(selector.replace(/\D/g, ''))
}

export default {
  getProductsFromCart() {
    const table = window.$('form.cart > div')
    let products = []
    table.each((index, element) => {
      if (index === 0 || index === table.length - 1) return
      const url = element.querySelector('a').href
      const name = element.querySelector('.cart__product-name').innerText
      const size = element.querySelector('.grid__item.medium-up--three-fifths .grid__item.three-quarters > p').innerText
      const quantity = Number(element.querySelector('input').value)
      const price = convertToCents(element.querySelector('.money').innerText)
      const id = element
        .querySelector('input')
        .getAttribute('data-id')
        .split(':')[0]
      const product = { id, url, name, size, quantity, price }
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
        withPlugin: !!window.$('iframe[title="Frekkls Launcher"]')[0],
        products: this.getProductsFromCart(),
        currency: moneySpans.attr('data-currency') || 'EUR',
        subTotalInCents: convertToCents(moneySpans.text()),
      },
    }
  },
  setupDataGathering() {
    if (location.pathname.match(/\/thank_you$/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }

    if (!window.$) return

    if (location.pathname.match(/^\/cart((\/\w+)+|\/?)/)) {
      window.$(document).on('click', '.cart__checkout--page', () =>
        RollbarWrapper(() => {
          if (window.$('#CartPageAgree').is(':checked')) {
            const json = this.checkoutObject()
            mixpanel.track(json.name, json.data)
          }
        })
      )
    }
  },
}
