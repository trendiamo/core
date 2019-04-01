import tingle from 'tingle.js'
import 'dropcap.js'

const $$ = (selector, callback) => Array.prototype.map.call(document.querySelectorAll(selector), callback)
const Modal = tingle.modal

const processEmailInputs = () => {
  if (!window.hbspt) return
  const targets = ['.email-input-1', '.email-input-2']
  window.jQuery = () => ({ each: () => [] }) // mock jquery so we can use the onFormReady option below
  targets.forEach(target => {
    const element = document.querySelector(target)
    if (!element) return
    const metaHbspt = document.querySelector('meta[name="hbspt-locale"]')
    const locale = metaHbspt ? metaHbspt.getAttribute('value') : 'en'
    window.hbspt.forms.create({
      css: '',
      portalId: '5559593',
      formId: '88e4e99c-cf14-4dbd-9b99-7110bbb1c8b5',
      target,
      locale,
      translations: {
        [locale]: {
          submitText: element.dataset.submitText,
        },
      },
      onFormReady: () => {
        const input = element.querySelector('.hs-input[name="email"]')
        if (!input || !element.dataset.emailLabel) return
        input.placeholder = element.dataset.emailLabel
      },
    })
  })
}

const processModalTriggers = () => {
  $$('.js-legal-notice', node => {
    node.addEventListener('click', event => {
      const legalNoticeContent = document.querySelector('.legal-notice-modal-content').innerHTML
      const modal = new Modal()
      modal.setContent(legalNoticeContent)
      modal.open()

      event.preventDefault()
      return false
    })
  })

  $$('.js-privacy-cookies', node => {
    node.addEventListener('click', event => {
      const privacyCookiesContent = document.querySelector('.privacy-cookies-modal-content').innerHTML
      const modal = new Modal()
      modal.setContent(privacyCookiesContent)
      modal.open()

      event.preventDefault()
      return false
    })
  })

  if (!window.hbspt) return
  $$('.js-request-demo', element => {
    element.addEventListener('click', event => {
      const requestDemoContent = document.querySelector('.request-demo-modal-content').innerHTML
      const modal = new Modal({ cssClass: ['request-demo-modal'] })
      modal.setContent(requestDemoContent)
      window.hbspt.forms.create({
        css: '',
        portalId: '5559593',
        formId: '0b907c64-003d-40d2-8cc5-d10db6be1fe1',
        target: '.request-demo-form',
      })
      modal.open()

      event.preventDefault()
      return false
    })
  })
}

const processDropCaps = () => {
  const p = document.querySelector('.blog-text p')
  if (!p) return
  const content = p.innerHTML
  const letter = content.slice(0, 1)
  p.innerHTML = `<span class="dropcap">${letter}</span>${content.slice(1)}`
  const dropcaps = document.querySelectorAll('.dropcap')
  window.Dropcap.layout(dropcaps, 2)
}

const processInPageScroll = () => {
  if (!location.hash) return
  const element = document.querySelector(location.hash)
  if (!element) return
  element.scrollIntoView({ behavior: 'smooth' })
}

export const onRouteUpdate = () => {
  processEmailInputs()
  processModalTriggers()
  processDropCaps()
  processInPageScroll()
}
