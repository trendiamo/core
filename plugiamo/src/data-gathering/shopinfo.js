import mixpanel from 'ext/mixpanel'

const convertToCents = selector => {
  return Number(selector.replace(/\D/g, ''))
}

export default {
  addToCartObject(callback, path, returnObj) {
    window.$.ajax({
      url: '/api/catalog_system/pub/products/search/' + path,
      type: 'GET',
      dataType: 'json',
    }).then(results => {
      if (!results || results.length === 0) return
      const data = results[0]
      if (returnObj) {
        returnObj.productId = data.productId
        returnObj.productName = data.productName
        returnObj.productBrand = data.brand
      }
      callback(
        returnObj || {
          name: 'Add To Cart',
          data: {
            hostname: location.hostname,
            withPlugin: !!window.$('.frekkls-container')[0],
            productId: data.productId,
            productName: data.productName,
            productBrand: data.brand,
            currency: 'BRL',
            subTotalInCents: {
              noBoleto: convertToCents(window.$('.skuBestPrice')[0].innerText),
              inTenInstalments: convertToCents(window.$('.skuBestInstallmentValue')[0].innerText),
              aVistaNoCartao: convertToCents(window.$('.valor-por-real')[0].lastChild.innerText),
            },
          },
        }
      )
    })
  },
  getProductsFromCart(isCheckoutForm) {
    const _this = this
    const productPaths = window.$(isCheckoutForm ? 'td.product-name' : '.cartSkuName').map((index, element) => {
      const productRef = new URL(
        isCheckoutForm ? element.firstElementChild.href : element.childNodes[0].firstChild.href
      )
      return productRef.pathname ? productRef.pathname : null
    })
    const cartProducts = {}
    let counter = 0
    const accumulateProductData = resultsObj => {
      cartProducts[counter] = resultsObj
      counter += 1
    }
    const cartProductObj = {
      productId: null,
      productName: null,
      productBrand: null,
      currency: 'BRL',
    }

    productPaths.map((index, path) => {
      _this.addToCartObject(accumulateProductData, path, {
        ...cartProductObj,
        subTotalInCents: convertToCents(
          window.$(isCheckoutForm ? '.total-selling-price' : '.bestPrice')[index].innerText
        ),
      })
    })
    return cartProducts
  },
  checkoutObject(isCheckoutForm) {
    return {
      name: 'Proceed To Checkout',
      data: {
        hostname: location.hostname,
        withPlugin: !!window.$('.frekkls-container')[0],
        products: this.getProductsFromCart(isCheckoutForm),
        currency: 'BRL',
        subTotalInCents: convertToCents(
          isCheckoutForm ? window.$('.monetary')[0].innerText : window.$('.vtexsc-text')[0].innerText
        ),
      },
    }
  },
  setupDataGathering(googleAnalytics) {
    const _this = this
    const saveData = resultsObj => {
      mixpanel.track(resultsObj.name, resultsObj.data)
    }
    if (
      location.pathname.match(/^\/checkout\//) ||
      (window.$('.vtexsc-wrap')[0] && window.$('.vtexsc-wrap')[0].classList.contains('active'))
    ) {
      window
        .$(document)
        .on('click', location.pathname.match(/^\/checkout\//) ? '.btn-place-order' : '.cartCheckout', () => {
          const json = _this.checkoutObject(location.pathname.match(/^\/checkout\//) ? true : false)
          mixpanel.track(json.name, json.data)
          googleAnalytics.active &&
            googleAnalytics.event({
              hitType: 'event',
              eventCategory: 'Page Event',
              eventAction: 'Click',
              eventLabel: 'proceedToCheckout',
              page: location.hostname,
            })
        })
    } else if (location.pathname.match(/.*\/p$/)) {
      window.$(document).on('click', '.buy-together--add', () => {
        _this.addToCartObject(saveData, location.pathname)
      })
      window.$(document).on('click', '.buy-button', () => {
        _this.addToCartObject(saveData, location.pathname)
      })
    }
  },
}
