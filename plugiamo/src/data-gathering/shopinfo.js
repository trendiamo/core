import mixpanel from 'ext/mixpanel'
import { convertToDigits } from 'utils'
import { RollbarWrapper } from 'ext/rollbar'

export default {
  getProductsFromCart({ isCheckoutForm }) {
    if (isCheckoutForm) {
      const productList = window.$('.table.cart-items tbody tr')
      return productList
        .map((index, item) => {
          const element = window.$(item)
          const name = element
            .find('.product-name a')
            .first()
            .text()
          const price = convertToDigits(
            element
              .find('.new-product-price')
              .first()
              .text()
          )
          const quantityElement = element.find('.quantity input').first()
          const quantity = convertToDigits(
            quantityElement.length === 0 ? element.find('.quantity span').text() : quantityElement.val()
          )
          return { name, price, quantity }
        })
        .toArray()
    }

    const productList = window.$('.vtexsc-productList tbody tr')

    return productList
      .map((index, item) => {
        const element = window.$(item)
        const name = element
          .find('.cartSkuName')
          .first()
          .text()
        const price = convertToDigits(
          element
            .find('.bestPrice')
            .first()
            .text()
        )
        const quantity = convertToDigits(element.find('.cartSkuQuantity').text())
        return { name, price, quantity }
      })
      .toArray()
  },
  checkoutObject(isCheckoutForm) {
    return {
      name: 'Proceed To Checkout',
      data: {
        hostname: location.hostname,
        withPlugin: !!window.$('iframe[title="Frekkls Launcher"]')[0],
        products: this.products,
        currency: 'BRL',
        subTotalInCents: convertToDigits(
          window
            .$(isCheckoutForm ? '.monetary' : '.vtexsc-text')
            .first()
            .text()
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

    const isCheckoutForm = location.pathname.match(/^\/checkout\//)

    this.products = this.getProductsFromCart({ isCheckoutForm })

    window.$(document).ajaxComplete((event, xhr, settings) => {
      if (xhr.status !== 200) return
      if (settings.url.includes('/api/checkout/pub/orderForm/')) {
        setTimeout(
          () =>
            RollbarWrapper(() => {
              this.products = this.getProductsFromCart({ isCheckoutForm })
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
