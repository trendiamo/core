import tingle from 'tingle.js'

const Modal = tingle.modal

window.jQuery = () => ({ each: () => [] }) // mock jquery so we can use the onFormReady option below

window.frekklsOpenDemoModal = () => {
  if (!window.hbspt) return

  const requestDemoContent = document.querySelector('.request-demo-modal-content').innerHTML
  const modal = new Modal({ cssClass: ['request-demo-modal'] })
  modal.setContent(requestDemoContent)
  window.hbspt.forms.create({
    css: '',
    portalId: '5559593',
    formId: '0b907c64-003d-40d2-8cc5-d10db6be1fe1',
    target: '.request-demo-form',
    onFormReady: () => modal.open(),
  })
}

window.frekklsOpenLegalNoticeModal = () => {
  const legalNoticeContent = document.querySelector('.legal-notice-modal-content').innerHTML
  const modal = new Modal()
  modal.setContent(legalNoticeContent)
  modal.open()
}

window.frekklsOpenPrivacyCookiesModal = () => {
  const privacyCookiesContent = document.querySelector('.privacy-cookies-modal-content').innerHTML
  const modal = new Modal()
  modal.setContent(privacyCookiesContent)
  modal.open()
}

const loadJs = src =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })

export const onClientEntry = async () => {
  await loadJs('//js.hsforms.net/forms/v2.js')
  if (typeof IntersectionObserver === 'undefined') {
    await import('intersection-observer')
  }
}
