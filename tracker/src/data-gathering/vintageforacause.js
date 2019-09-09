import mixpanel from 'ext/mixpanel'
import { convertToDigits, getAffiliateToken } from 'utils'
import { RollbarWrapper } from 'ext/rollbar'

const $$ = (selector, callback) => Array.prototype.map.call(document.querySelectorAll(selector), callback)

export default {
  triggerPurchaseSuccess() {
    mixpanel.track('Purchase Success', { hostname: location.hostname, affiliateToken: getAffiliateToken() })
  },
  triggerCartProceedToCheckout() {
    const products = $$('#CartItems .line-item', element => {
      const id = (element.dataset || { variantId: '' }).variantId
      const name = (element.querySelector('.cart-product-desc a') || { textContent: '' }).textContent.trim()
      const url = (element.querySelector('.cart-product-desc a') || { href: '' }).href
      const price = convertToDigits((element.querySelector('.product-price') || { textContent: '' }).textContent)
      const quantity = (element.querySelector('.inputCounter') || { value: 0 }).value
      return { id, name, url, price, quantity, currency: 'EUR' }
    })
    mixpanel.track('Proceed To Checkout', {
      hostname: location.hostname,
      products,
      currency: 'EUR',
      subTotalInCents: convertToDigits(
        (document.querySelector('.cart-total-price') || { textContent: '' }).textContent
      ),
      affiliateToken: getAffiliateToken(),
    })
  },
  triggerDirectProceedToCheckout() {
    const id = (((window.ShopifyAnalytics || {}).meta || {}).product || {}).id
    const name = (document.querySelector('[itemprop="name"]') || { textContent: '' }).textContent.trim()
    const url = (document.querySelector('meta[itemprop="url"]') || { content: '' }).content
    const price = convertToDigits((document.querySelector('[itemprop="price"]') || { textContent: '' }).textContent)
    const quantity = (document.querySelector('#quantity') || { value: 0 }).value
    const products = [
      {
        id,
        name,
        url,
        price,
        quantity,
        currency: 'EUR',
      },
    ]
    mixpanel.track('Proceed To Checkout', {
      hostname: location.hostname,
      products,
      currency: 'EUR',
      subTotalInCents: convertToDigits(
        (document.querySelector('.product-normal-price') || { textContent: '' }).textContent
      ),
      affiliateToken: getAffiliateToken(),
    })
  },
  _setupDataGathering() {
    if (location.pathname.match(/\/thank_you$/)) {
      this.triggerPurchaseSuccess()
    } else {
      document.addEventListener('click', event =>
        RollbarWrapper(() => {
          if (event.target.classList.contains('cart-checkout') || event.target.classList.contains('paypal-button')) {
            this.triggerCartProceedToCheckout()
          }
        })
      )
      $$('[data-testid="PayPalInContext-button"], .shopify-payment-button__more-options', button => {
        button.addEventListener('click', () => {
          RollbarWrapper(this.triggerDirectProceedToCheckout.bind(this))
          return true
        })
      })
    }
  },
  setupDataGathering() {
    RollbarWrapper(this._setupDataGathering.bind(this))
  },
}
