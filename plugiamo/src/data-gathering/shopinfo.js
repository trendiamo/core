import mixpanel from 'ext/mixpanel'

const convertToCents = selector => {
  return Number(selector.replace(/\D/g, ''))
}

export default {
  addToCartObject(callback, path, returnObj) {
    const getData = (url, callback) => {
      window.$.ajax({
        url,
        type: 'GET',
        dataType: 'json',
      }).then(data => {
        if (returnObj) {
          returnObj.productId = data[0].productId
          returnObj.productName = data[0].productName
          returnObj.productBrand = data[0].brand
        }
        callback(
          returnObj
            ? returnObj
            : {
                name: 'Add To Cart',
                data: {
                  hostname: location.hostname,
                  withPlugin: !!window.$('.trendiamo-container')[0],
                  productId: data[0].productId,
                  productName: data[0].productName,
                  productBrand: data[0].brand,
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
    }

    getData('/api/catalog_system/pub/products/search/' + path, callback)
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
        withPlugin: !!window.$('.trendiamo-container')[0],
        products: this.getProductsFromCart(isCheckoutForm),
        currency: 'BRL',
        subTotalInCents: convertToCents(
          isCheckoutForm ? window.$('.monetary')[0].innerText : window.$('.vtexsc-text')[0].innerText
        ),
      },
    }
  },
  setupDataGathering() {
    const _this = this
    const saveData = resultsObj => {
      mixpanel.track(resultsObj.name, resultsObj.data)
    }
    if (location.pathname.match(/^\/checkout\//) || window.$('.vtexsc-wrap')[0].classList.contains('active')) {
      window
        .$(document)
        .on('click', location.pathname.match(/^\/checkout\//) ? '.btn-place-order' : '.cartCheckout', () => {
          const json = _this.checkoutObject(location.pathname.match(/^\/checkout\//) ? true : false)
          mixpanel.track(json.name, json.data)
        })
    } else if (location.pathname.match(/.*\/p$/)) {
      window.$(document).on('click', '.buy-together--add', () => {
        _this.addToCartObject(saveData, location.pathname)
      })
      window.$(document).on('click', '.buy-button', () => {
        event.preventDefault()
        _this.addToCartObject(saveData, location.pathname)
      })
    }
  },
}
