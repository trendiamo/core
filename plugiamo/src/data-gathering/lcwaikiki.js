import mixpanel from 'ext/mixpanel'
import { convertToDigits } from 'utils'
import { RollbarWrapper } from 'ext/rollbar'

export default {
  getCurrencyFromLocation() {
    if (location.pathname.match(/^\/ro-RO/)) {
      return 'RON'
    } else if (location.pathname.match(/^\/bg-BG/)) {
      return 'BGN'
    } else {
      return null
    }
  },
  triggerMiniCartCheckout() {
    const currency = this.getCurrencyFromLocation()
    const products = window
      .$('.mini-cart:first .item')
      .map((i, item) => {
        const name = window.$('.name', item).text()
        const quantity = convertToDigits(window.$('.info p:last-child', item).text())
        const price = convertToDigits(window.$('.price', item).text()) / quantity
        return {
          name,
          price,
          quantity,
          currency,
        }
      })
      .toArray()
    mixpanel.track('Proceed To Checkout', {
      hostname: location.hostname,
      withPlugin: !!window.$('iframe[title="Frekkls Launcher"]')[0],
      products,
      subTotalInCents: products.reduce((result, product) => result + Number(product.price) * product.quantity, 0),
      currency,
    })
  },
  triggerMainCartCheckout() {
    const currency = this.getCurrencyFromLocation()
    const products = window
      .$('.item[data]')
      .map((i, item) => {
        const json = JSON.parse(
          window
            .$('input.cartItem', item)
            .val()
            .replace(/\{'/g, '{"')
            .replace(/':\s*'/g, '": "')
            .replace(/',\s*'/g, '", "')
            .replace(/'\}/g, '"}')
        )
        return {
          id: json.id,
          name: json.category + json.name,
          price: convertToDigits(json.price),
          quantity: +window.$('input.quantity-value', item).val(),
          currency,
        }
      })
      .toArray()
    mixpanel.track('Proceed To Checkout', {
      hostname: location.hostname,
      withPlugin: !!window.$('iframe[title="Frekkls Launcher"]')[0],
      products,
      subTotalInCents: products.reduce((result, product) => result + Number(product.price) * product.quantity, 0),
      currency,
    })
  },
  setupDataGathering() {
    if (location.pathname.match(/\/checkout\/orderConfirmation\//)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }

    if (!window.$) return

    if (location.pathname.match(/\/cart$/)) {
      window.$('button.js-continue-checkout-button').on('click', () =>
        RollbarWrapper(() => {
          this.triggerMainCartCheckout()
        })
      )
    }

    window.$(document).on('click', '.mini-cart .btn-primary', () =>
      RollbarWrapper(() => {
        this.triggerMiniCartCheckout()
      })
    )
  },
}
