import mixpanel from 'ext/mixpanel'
import { convertToDigits } from 'utils'
import { RollbarWrapper } from 'ext/rollbar'
/* eslint-disable no-undef */

export default {
  getProductsFromCart() {
    return $('.shoppingcart_list > form')
      .map((i, item) => {
        const itemName = $(item)
          .find('.single-item-title h2')
          .text()
          .trim()
        if (!itemName) return
        const itemUrl = `${location.hostname}/${$(item)
          .find('.single-item-holder a')
          .attr('href')}`
        const price = convertToDigits(
          $(item)
            .find('.add-info-price')
            .first()
            .text()
        )
        const quantity = convertToDigits(
          $(item)
            .find('.info-holder input')
            .first()
            .val()
        )
        return {
          name: itemName,
          url: itemUrl,
          price,
          quantity,
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
        subTotalInCents: convertToDigits($('#total_summary_list_info').text()),
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
