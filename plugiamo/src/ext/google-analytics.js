import { GApropertyId, GOcontainerId, GOexperimentId } from 'config'

const loadGAFrame = () => {
  const iframe = document.createElement('iframe')
  iframe.title = 'loading-ga-frame'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = '0'
  iframe.style.display = 'none'
  iframe.style.position = 'absolute'
  document.body.appendChild(iframe)
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
    return document.querySelector('[title="loading-ga-frame"]').contentWindow.ga(...args)
  },
  iframeRef: null,
  init(iframe) {
    this.iframeRef = iframe
    this.active = true
    this.initGA()
    this.initGO()
  },
  initGA() {
    if (!GApropertyId || localStorage.getItem('trnd-exp-original')) return
    this.ga('create', GApropertyId, 'auto', {
      name: 'frekkls_tracker',
      cookieName: '_ga_frekkls',
      storeGac: true,
    })
    this.ga('frekkls_tracker.set', 'checkProtocolTask', null)
  },
  initGO() {
    if (!GOexperimentId || !GOcontainerId) return Promise.resolve()
    this.cxApi = this.iframeRef.contentWindow.cxApi
    const GOvariationId = this.cxApi.chooseVariation()
    this.cxApi.setChosenVariation(GOvariationId, GOexperimentId)
    this.ga('frekkls_tracker.set', 'exp', `${GOexperimentId}.${GOvariationId}`)
  },
  event(fieldsObject) {
    this.ga('frekkls_tracker.send', fieldsObject)
  },
  pageView() {
    this.event({
      hitType: 'pageview',
      eventCategory: 'Page',
      eventAction: 'view',
      eventLabel: 'Page view',
      page: location.href,
    })
  },
  getVariation() {
    const variation = this.cxApi.getChosenVariation(GOexperimentId)
    const pluginPresence = variation === 1 ? 'absent' : 'present'
    return pluginPresence
  },
}

export { loadGAFrame }
export default googleAnalytics
