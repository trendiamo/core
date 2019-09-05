import mixpanel from 'ext/mixpanel'
import { RollbarWrapper } from 'ext/rollbar'

const convertToCents = selector => {
  return Number(selector.replace(/\D/g, ''))
}

export default {
  getProductsFromCart({ isCheckoutForm }) {
    const productList = window.$(isCheckoutForm ? '.table.cart-items tbody tr' : '.vtexsc-productList tbody tr')

    let result = []

    if (productList.length > 0) {
      productList.each((index, productElement) => {
        let quantityElement = productElement.querySelector(isCheckoutForm ? '.quantity input' : '.cartSkuQuantity')
        let quantityElementValue =
          quantityElement && (isCheckoutForm ? quantityElement.value : quantityElement.innerText)
        if (isCheckoutForm && !quantityElement) {
          quantityElement = productElement.querySelector('.quantity span')
          quantityElementValue = quantityElement && quantityElement.innerText
        }
        const quantity = Number(isCheckoutForm ? quantityElementValue : quantityElement.innerText)
        const price = convertToCents(
          productElement.querySelector(isCheckoutForm ? '.new-product-price' : '.bestPrice').innerText
        )
        const name = productElement.querySelector(isCheckoutForm ? '.product-name a' : '.cartSkuName').innerText
        const product = { name, price, quantity }
        result.push(product)
      })
    }
    this.products = result
  },
  checkoutObject(isCheckoutForm) {
    return {
      name: 'Proceed To Checkout',
      data: {
        hostname: location.hostname,
        withPlugin: !!window.$('iframe[title="Frekkls Launcher"]')[0],
        products: this.products,
        currency: 'BRL',
        subTotalInCents: convertToCents(
          isCheckoutForm ? window.$('.monetary')[0].innerText : window.$('.vtexsc-text')[0].innerText
        ),
      },
    }
  },
  proceedToCheckout({ googleAnalytics, isCheckoutForm }) {
    const json = this.checkoutObject(isCheckoutForm)
    if (json.data.products.length === 0) return
    mixpanel.track(json.name, json.data)
    if (googleAnalytics.active) {
      googleAnalytics.event({
        hitType: 'event',
        eventCategory: 'Page Event',
        eventAction: 'Click',
        eventLabel: 'proceedToCheckout',
        page: location.hostname,
      })
    }
  },
  setupDataGathering(googleAnalytics) {
    if (location.pathname.match(/orderPlaced/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
      return
    }

    if (!window.$) return

    const saveData = resultsObj => {
      mixpanel.track(resultsObj.name, resultsObj.data)
    }
    const isCheckoutForm = location.pathname.match(/^\/checkout\//)

    this.getProductsFromCart({ isCheckoutForm })

    window.$(document).ajaxComplete((event, xhr, settings) => {
      if (xhr.status !== 200) return
      if (settings.url.includes('/api/checkout/pub/orderForm/')) {
        setTimeout(
          () =>
            RollbarWrapper(() => {
              this.getProductsFromCart({ isCheckoutForm })
            }),
          100
        )
      }
    })

    window.$(document).on('click', '.vtexsc-cart .cartCheckout', () =>
      RollbarWrapper(() => {
        this.proceedToCheckout({ googleAnalytics, isCheckoutForm })
      })
    )
    if (isCheckoutForm) {
      window.$(document).on('click', '.btn-place-order, .cartCheckout', () =>
        RollbarWrapper(() => {
          this.proceedToCheckout({ googleAnalytics, isCheckoutForm })
        })
      )
      return
    }
  },
}
