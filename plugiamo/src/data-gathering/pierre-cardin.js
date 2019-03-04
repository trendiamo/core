import mixpanel from 'ext/mixpanel'

export default {
  addToCartObject() {
    const formFields = window.$('#product_addtocart_form').serializeArray()
    return {
      name: 'Add To Cart',
      data: {
        hostname: location.hostname,
        withPlugin: !!window.$('.trendiamo-container')[0],
        productId: formFields.find(element => element.name === 'product').value,
        productName: window.$("[data-ui-id='page-title-wrapper']").text(),
        productPrice: window
          .$('span.price')
          .last()
          .text(),
        productOptions: window.$('.swatch-attribute').map((i, element) => {
          const optionSelectedId = window.$(element).attr('option-selected')
          const optionValue = window
            .$(element)
            .find(`[option-id='${optionSelectedId}']`)
            .attr('option-label')
          if (!optionValue) return
          return {
            attributeLabel: window.$(element).attr('attribute-label'),
            attributeCode: window.$(element).attr('attribute-code'),
            attributeId: window.$(element).attr('attribute-id'),
            optionValue,
          }
        }),
      },
    }
  },
  getProductsFromCart() {
    return window.$('.cart.item').map((i, item) => {
      const itemName = window
        .$(item)
        .find("[data-th='Artikel']")
        .children('a')
        .attr('title')
      const itemUrl = window
        .$(item)
        .find("[data-th='Artikel']")
        .children('a')
        .attr('href')
      const itemPrice = window
        .$(item)
        .find('span.price')
        .last()
        .text()
      const itemQuantity = window
        .$(item)
        .find("[title='Menge']")
        .attr('value')
      return { name: itemName, url: itemUrl, price: itemPrice, quantity: itemQuantity }
    })
  },
  checkoutObject() {
    return {
      name: 'Proceed To Checkout',
      data: {
        hostname: location.hostname,
        withPlugin: !!window.$('.trendiamo-container')[0],
        products: this.getProductsFromCart(),
        subTotal: window
          .$('span.price')
          .last()
          .text(),
      },
    }
  },
  setupDataGathering() {
    const _this = this
    if (location.pathname.match(/^\/checkout\/cart/)) {
      window.$(document).on('click', 'button.action.primary.checkout', () => {
        const json = _this.checkoutObject()
        mixpanel.track(json.name, json.data)
      })
    } else if (window.$('#product-addtocart-button')[0]) {
      window.$('form#product_addtocart_form').on('submit', () => {
        const json = _this.addToCartObject()
        mixpanel.track(json.name, json.data)
      })
    }
  },
}
