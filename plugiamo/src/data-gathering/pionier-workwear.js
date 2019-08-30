import mixpanel from 'ext/mixpanel'
import { RollbarWrapper } from 'ext/rollbar'
/* eslint-disable no-undef */

export default {
  addToCartObject() {
    return {
      name: 'Add To Cart',
      data: {
        hostname: location.hostname,
        withPlugin: !!$('iframe[title="Frekkls Launcher"]')[0],
        productId: $('input.inputtext.number.itemControl').attr('value'),
        productName: $('.single-item-title > h2').text(),
        currency: 'EUR',
        subTotalInCents: Number(
          $('.price')
            .text()
            .replace(/\D/g, '')
        ),
        productOptions: $('.single-item-info > .info-holder')
          .map((i, element) => {
            let optionSelectedTitle, optionSelectedValue
            if ($(element).find('li.active, li.selected')[0]) {
              optionSelectedTitle = $(element)
                .find('.parametr-title')
                .text()
              optionSelectedValue = $(element)
                .find('li.active, li.selected')
                .find('span')
                .attr('data-value')
            } else if ($(element).find('fieldset > input')[0]) {
              optionSelectedTitle = $(element)
                .find('.parametr-title')
                .text()
              optionSelectedValue = $(element).find('fieldset > input')[0].value
            }
            if (!optionSelectedValue) return
            return {
              attributeLabel: optionSelectedTitle,
              attributeValue: optionSelectedValue,
            }
          })
          .toArray(),
      },
    }
  },
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

    if (location.pathname.match(/formonline\.shop\.shoppingcart\.checkout\.overview/i)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    } else if ($('.product-form')[0]) {
      $('.alvineJSPluginOrderformSubmit').on('click', () =>
        RollbarWrapper(() => {
          const json = _this.addToCartObject()
          mixpanel.track(json.name, json.data)
        })
      )
    } else if ($('#shCartForm')[0]) {
      $('.paypalexpress_checkoutbutton > a, .checkoutbutton > a').on('click', () =>
        RollbarWrapper(() => {
          const json = _this.checkoutObject()
          mixpanel.track(json.name, json.data)
        })
      )
    }
  },
}
