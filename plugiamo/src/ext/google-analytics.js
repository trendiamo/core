import { GApropertyId, GOcontainerId, GOexperimentId } from 'config'

const loadGoogle = iframe => {
  return { promises: [loadGA(iframe), loadGO(iframe)], iframe }
}

const loadGA = iframe =>
  new Promise((resolve, reject) => {
    const script = iframe.contentDocument.createElement('script')
    script.src = 'https://www.google-analytics.com/analytics.js'
    script.async = true
    script.onload = resolve
    script.onerror = reject
    iframe.contentWindow['GoogleAnalyticsObject'] = 'ga'
    iframe.contentWindow['ga'] =
      iframe.contentWindow['ga'] ||
      function() {
        ;(iframe.contentWindow['ga'].q = iframe.contentWindow['ga'].q || []).push(
          iframe.contentWindow,
          iframe.contentDocument,
          'script',
          script.src,
          'ga'
        )
      }
    iframe.contentWindow['ga'].l = 1 * new Date()
    iframe.contentDocument.body.appendChild(script)
  })

const loadGO = iframe =>
  new Promise((resolve, reject) => {
    const script = iframe.contentDocument.createElement('script')
    script.src = `https://www.google-analytics.com/cx/api.js?experiment=${GOexperimentId}`
    script.async = true
    script.onload = resolve
    script.onerror = reject
    iframe.contentDocument.body.appendChild(script)
  })

const googleAnalytics = {
  active: false,
  cxApi: null,
  ga(...args) {
    return document.querySelector('[title="frekkls-loading-frame"]').contentWindow.ga(...args)
  },
  iframeRef: null,
  init(iframe) {
    if (!GApropertyId || !GOexperimentId || !GOcontainerId || localStorage.getItem('trnd-exp-original')) return
    this.iframe = iframe
    this.active = true
    this.initGA()
    this.initGO()
  },
  initGA() {
    this.ga('create', GApropertyId, 'auto', {
      name: 'frekkls_tracker',
      cookieName: '_ga_frekkls',
      storeGac: true,
    })
    this.ga('frekkls_tracker.set', 'checkProtocolTask', null)
    this.ga('frekkls_tracker.set', 'hostname', location.hostname)
    this.event({
      hitType: 'pageview',
      eventCategory: 'Page',
      eventAction: 'view',
      eventLabel: 'Page view',
      page: location.href,
    })
  },
  initGO() {
    this.cxApi = this.iframe.contentWindow.cxApi
    const GOvariationId = this.cxApi.chooseVariation()
    this.cxApi.setChosenVariation(GOvariationId, GOexperimentId)
    this.ga('frekkls_tracker.set', 'exp', `${GOexperimentId}.${GOvariationId}`)
  },
  event(fieldsObject) {
    this.ga('frekkls_tracker.send', fieldsObject)
  },
  getVariation() {
    const variation = this.cxApi.getChosenVariation(GOexperimentId)
    const pluginPresence = variation === 1 ? 'absent' : 'present'
    return pluginPresence
  },
}

export { loadGoogle }
export default googleAnalytics
