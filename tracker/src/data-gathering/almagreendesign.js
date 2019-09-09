import mixpanel from 'ext/mixpanel'
import { convertToDigits, getAffiliateToken } from 'utils'
import { RollbarWrapper } from 'ext/rollbar'

const $$ = (selector, callback) => Array.prototype.map.call(document.querySelectorAll(selector), callback)

// from https://stackoverflow.com/a/52809105
const setupLocationChangeEvent = () => {
  history.pushState = (f =>
    function pushState() {
      var ret = f.apply(this, arguments)
      window.dispatchEvent(new Event('pushState'))
      window.dispatchEvent(new Event('locationchange'))
      return ret
    })(history.pushState)

  history.replaceState = (f =>
    function replaceState() {
      var ret = f.apply(this, arguments)
      window.dispatchEvent(new Event('replaceState'))
      window.dispatchEvent(new Event('locationchange'))
      return ret
    })(history.replaceState)

  window.addEventListener('popstate', () => {
    window.dispatchEvent(new Event('locationchange'))
  })
}

export default {
  triggerPurchaseSuccess() {
    mixpanel.track('Purchase Success', { hostname: location.hostname, affiliateToken: getAffiliateToken() })
  },
  triggerProceedToCheckout() {
    const products = $$('.order-products .product-cart', element => {
      const name = (element.querySelector('.product-name') || { textContent: '' }).textContent.trim()
      const price = convertToDigits((element.querySelector('.main-price') || { textContent: '' }).textContent)
      const quantity = (element.querySelector('.quantity') || { value: 0 }).value
      return { name, price, quantity, currency: 'EUR' }
    })
    mixpanel.track('Proceed To Checkout', {
      hostname: location.hostname,
      products,
      currency: 'EUR',
      subTotalInCents: convertToDigits((document.querySelector('div.main-total') || { textContent: '' }).textContent),
      affiliateToken: getAffiliateToken(),
    })
  },
  numberOfTries: 0,
  tryTimeout: null,
  tryProceedToCheckout() {
    const elm = document.querySelector('.order-products')
    // the new elements might not have been rendered yet, so we do some tries
    if (elm) {
      this.triggerProceedToCheckout()
    } else if (this.numberOfTries < 15) {
      this.numberOfTries += 1
      this.tryTimeout = window.setTimeout(() => {
        RollbarWrapper(() => {
          this.tryProceedToCheckout()
        })
      }, 250)
    }
  },
  setupDataGathering() {
    setupLocationChangeEvent()
    window.addEventListener('locationchange', () => {
      RollbarWrapper(() => {
        window.clearTimeout(this.tryTimeout)
        this.tryTimeout = null
        this.numberOfTries = 0
        mixpanel.track('Visited Page', { hostname: location.hostname })
        if (location.pathname.match(/TODO-purchase-success-TODO/)) {
          this.triggerPurchaseSuccess()
        } else if (location.pathname.match(/\/checkout\//)) {
          this.tryProceedToCheckout()
        }
      })
    })
  },
}
