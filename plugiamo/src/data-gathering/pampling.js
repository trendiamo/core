import mixpanel from 'ext/mixpanel'
import { convertToDigits } from 'utils'
import { RollbarWrapper } from 'ext/rollbar'
/* eslint-disable no-undef */

export default {
  getProductsFromCart() {
    return $('.pedido')
      .map((i, item) => {
        const itemName = $(item)
          .find('.articulo > a')
          .text()
        const itemSize = $(item)
          .find('.talla > b')
          .text()
        const itemUrl = $(item)
          .find('.articulo > a')
          .attr('href')
        const price = convertToDigits(
          $(item)
            .find('.precio')
            .text()
        )
        const itemQuantity = convertToDigits(
          $(item)
            .find('.cantidad')
            .text()
        )

        return {
          name: itemName,
          size: itemSize,
          url: itemUrl,
          price,
          quantity: itemQuantity,
          currency: 'EUR',
        }
      })
      .toArray()
  },
  checkoutObject() {
    return {
      name: 'Proceed To Checkout',
      data: {
        hostname: location.hostname,
        withPlugin: !!$('iframe[title="Frekkls Launcher"]')[0],
        products: this.getProductsFromCart(),
        subTotalInCents: convertToDigits($('#cantidad_total_productos').text()),
        currency: 'EUR',
      },
    }
  },
  setupDataGathering() {
    if (localStorage.getItem('trnd-ignore-data-gathering')) return

    const _this = this
    if (location.pathname.match(/pedido-finalizado/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }

    if (!window.$) return

    if (location.pathname.match(/tienda\/cesta/)) {
      $(document).on('click', '#btn_comprar', () =>
        RollbarWrapper(() => {
          const json = _this.checkoutObject()
          mixpanel.track(json.name, json.data)
        })
      )
    }
  },
}
