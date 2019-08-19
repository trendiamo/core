import mixpanel from 'ext/mixpanel'
/* eslint-disable no-undef */

const convertToCents = selector => {
  return Number(selector.replace(/\D/g, ''))
}

export default {
  addToCartObject() {
    const formFields = jQuery
      .noConflict()('#product_addtocart_form')
      .serializeArray()

    return {
      name: 'Add To Cart',
      data: {
        hostname: location.hostname,
        withPlugin: !!jQuery.noConflict()('iframe[title="Frekkls Launcher"]')[0],
        productId: formFields.find(element => element.name === 'product').value,
        productName: jQuery
          .noConflict()(".product-name > [itemprop='name']")
          .text(),
        productBrand: jQuery
          .noConflict()('.fabricante-legenda > h2')
          .text(),
        currency: 'BRL',
        subTotalInCents: {
          noBoleto: convertToCents(jQuery.noConflict()('.price-boleto')[0].innerText),
          inTenInstalments: convertToCents(
            jQuery
              .noConflict()("[data-id='price_parcelado']")
              .text()
          ),
          aVistaNoCartao: convertToCents(
            jQuery
              .noConflict()("[data-id='product-price'] > .price")
              .text()
          ),
        },
      },
    }
  },
  getProductsFromCart() {
    return jQuery
      .noConflict()('#shopping-cart-table > tbody')
      .find('tr')
      .map((index, element) => {
        const name = jQuery
          .noConflict()(element)
          .find('h2 > a')
          .attr('title')
        const url = jQuery
          .noConflict()(element)
          .find('h2 > a')
          .attr('href')
        const quantity = Number(
          jQuery
            .noConflict()(element)
            .find("[selected='selected']")
            .attr('value')
        )
        const price = convertToCents(element.children[2].innerText)
        return { name, url, price, quantity }
      })
      .toArray()
  },
  checkoutObject() {
    return {
      name: 'Proceed To Checkout',
      data: {
        hostname: location.hostname,
        withPlugin: !!jQuery.noConflict()('iframe[title="Frekkls Launcher"]')[0],
        products: this.getProductsFromCart(),
        currency: 'BRL',
        subTotalInCents: convertToCents(
          jQuery
            .noConflict()('#shopping-cart-totals-table')
            .find('.price')[0].innerText
        ),
      },
    }
  },
  setupDataGathering() {
    const _this = this
    if (location.pathname.match(/onepage\/success/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    } else if (jQuery.noConflict()('.product-view').length === 1) {
      // pdp
      jQuery
        .noConflict()('.product-shop')
        .find('.button')
        .on('click', () => {
          const json = _this.addToCartObject()
          mixpanel.track(json.name, json.data)
        })
    } else if (location.pathname.match(/^\/checkout\/cart\/?$/)) {
      // cart
      jQuery
        .noConflict()('.btn-concluir-compra')
        .on('click', () => {
          const json = _this.checkoutObject()
          mixpanel.track(json.name, json.data)
        })
    }
  },
}
