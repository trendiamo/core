import lazySizes from 'lazysizes'
import WebFont from 'webfontloader'
import tingle from 'tingle.js'
import legalNoticeContent from './legal-notice-content'
import privacyCookiesContent from './privacy-cookies-content'
import requestDemoContent from './request-demo-content'

window.document.body.classList.remove('no-js')

WebFont.load({ google: { families: ['Roboto:400,500,700'] } })
WebFont.load({ google: { families: ['Dosis:700'] } })
WebFont.load({ google: { families: ['Roboto+Slab:400'] } })
lazySizes.init()

window.requestAnimationFrame(() => {
  const $$ = (selector, callback) => Array.prototype.map.call(document.querySelectorAll(selector), callback)

  const Modal = tingle.modal

  $$('.js-legal-notice', element => {
    element.addEventListener('click', event => {
      const modal = new Modal()
      modal.setContent(legalNoticeContent)
      modal.open()

      event.preventDefault()
      return false
    })
  })

  $$('.js-privacy-cookies', element => {
    element.addEventListener('click', event => {
      const modal = new Modal()
      modal.setContent(privacyCookiesContent)
      modal.open()

      event.preventDefault()
      return false
    })
  })

  $$('.js-request-demo', element => {
    element.addEventListener('click', event => {
      const modal = new Modal({ cssClass: ['request-demo-modal'] })
      modal.setContent(requestDemoContent)
      window.hbspt.forms.create({
        css: '',
        portalId: '4568386',
        target: '.request-demo-form',
        formId: 'c3b4b11b-fc3b-4aef-b24a-b23e5dcfff73'
      })
      modal.open()

      event.preventDefault()
      return false
    })
  })

  const targets = ['.email-input-1', '.email-input-2']
  targets.forEach(target => {
    window.hbspt.forms.create({
      css: '',
      portalId: '4568386',
      formId: '70b17e03-8153-4be3-ba4b-d3550a85e258',
      target
    })
  })
})
