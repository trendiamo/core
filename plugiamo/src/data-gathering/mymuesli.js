import mixpanel from 'ext/mixpanel'
import { convertToDigits } from 'utils'
import { RollbarWrapper } from 'ext/rollbar'
/* eslint-disable no-undef */

export default {
  getProductsFromCart() {
    const finalObject = []
    $('.row[data-offer-id]:not(.toggleOffer)').map((i, item) => {
      const itemDiv = $(item)
      const link = itemDiv.find('.article-description a').first()
      const itemName = link
        .text()
        .trim()
        .replace(/\n|\r/g, '')
        .replace(/\s\s+/g, ' ')
      let itemUrl = $(item)
        .find('.article-description a')
        .attr('href')
      if (itemUrl && !itemUrl.indexOf('www.mymuesli.com') !== -1) {
        itemUrl = `https://www.mymuesli.com${itemUrl}`
      }
      const price = convertToDigits(
        $(item)
          .find('.js-price')
          .text()
      )
      const itemQuantity = convertToDigits(
        $(item)
          .find('.amount')
          .text()
          .trim()
      )
      let id = $(item).attr('data-offer-id')
      if (itemUrl && id === '148') {
        const splitUrl = itemUrl.split('/')
        id = splitUrl.length !== 0 && `custom-${splitUrl[splitUrl.length - 1]}`
      }
      finalObject.push({
        id,
        name: itemName,
        url: itemUrl,
        price,
        quantity: itemQuantity,
        currency: 'EUR',
      })
    })
    return finalObject
  },
  checkoutObject() {
    return {
      name: 'Proceed To Checkout',
      data: {
        hostname: location.hostname,
        withPlugin: !!$('iframe[title="Frekkls Launcher"]')[0],
        products: this.getProductsFromCart(),
        subTotalInCents: convertToDigits($('.js-cartamount').text()),
        currency: 'EUR',
      },
    }
  },
  setupDataGathering() {
    if (location.pathname.match(/^\/shop\/complete/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }

    if (!window.$) return

    if (location.pathname.match(/^\/shop\/cart/)) {
      $(document).on('click', 'a[href="https://www.mymuesli.com/shop/kasse"]', () =>
        RollbarWrapper(() => {
          const json = this.checkoutObject()
          mixpanel.track(json.name, json.data)
        })
      )
    }
  },
}
