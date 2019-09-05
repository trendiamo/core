import mixpanel from 'ext/mixpanel'
import { RollbarWrapper } from 'ext/rollbar'
/* eslint-disable no-undef */

export default {
  getProductsFromCart() {
    return $('.item-holder')
      .map((i, item) => {
        const itemName = $(item)
          .find('.item-name')
          .text()
          .trim()
        if (!itemName) return
        const itemUrl =
          location.hostname +
          $(item)
            .find('a')
            .attr('href')
        const price = Number(
          $(item)
            .find('.item-info > li > .value')
            .last()
            .text()
            .replace(/\D/g, '')
        )
        const itemQuantity = $(item)
          .find('.item-info > li > .value')
          .first()
          .text()
        return {
          name: itemName,
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
          $('#total_summary_list_info')
            .text()
            .replace(/\D/g, '')
        ),
        currency: 'EUR',
      },
    }
  },
  setupDataGathering() {
    const _this = this
    if (location.hash.match(/formonline\.shop\.shoppingcart\.checkout\.overview/i)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }

    if (!window.$) return

    if ($('#shCartForm')[0]) {
      $('.paypalexpress_checkoutbutton > a, .checkoutbutton > a').on('click', () =>
        RollbarWrapper(() => {
          const json = _this.checkoutObject()
          mixpanel.track(json.name, json.data)
        })
      )
    }
  },
}
