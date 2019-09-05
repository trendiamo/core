import mixpanel from 'ext/mixpanel'
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
        const price = Number(
          $(item)
            .find('.total')
            .text()
            .replace(/\D/g, '')
        )
        const itemQuantity = $(item)
          .find('.cantidad')
          .text()

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
        subTotalInCents: Number(
          $('#cantidad_total_productos')
            .text()
            .replace(/\D/g, '')
        ),
        currency: 'EUR',
      },
    }
  },
  setupDataGathering() {
    const _this = this
    if (location.pathname.match(/pedido-finalizado/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }

    if (!window.$) return

    if (location.pathname.match(/tienda\/cesta/)) {
      if (!$('.pedido')[0]) return
      $('#btn_comprar').on('click', () =>
        RollbarWrapper(() => {
          const json = _this.checkoutObject()
          mixpanel.track(json.name, json.data)
        })
      )
    }
  },
}
