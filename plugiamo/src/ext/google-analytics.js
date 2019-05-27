import ReactGA from 'react-ga'
import { GApropertyId, GOcontainerId, GOexperimentId } from 'config'

const loadGA = contentDocument =>
  new Promise((resolve, reject) => {
    const script = contentDocument.createElement('script')
    script.src = `https://www.google-analytics.com/cx/api.js?experiment=${GOexperimentId}`
    script.async = true
    script.onload = resolve
    script.onerror = reject
    contentDocument.body.appendChild(script)
  })

const frekklsGA = {
  iframeRef: null,
  initialized: false,
  initGA() {
    if (!GApropertyId) return Promise.resolve()
    ReactGA.initialize(GApropertyId, {
      optimize_id: GOcontainerId,
      gaOptions: {
        name: 'frekkls_tracker',
        cookieDomain: 'auto',
        cookieName: '_ga_frekkls',
        storeGac: true,
      },
    })
    this.initialized = true
    this.pageView()
  },
  event(fieldsObject) {
    if (!this.initialized) return
    if (!(this.iframeRef && this.iframeRef.contentWindow.cxApi)) {
      const GOvariationId = localStorage.getItem('trnd-exp-var')
      GOvariationId && ReactGA.ga()('frekkls_tracker.set', 'exp', `${GOexperimentId}.${GOvariationId}`)
    }
    ReactGA.ga()('frekkls_tracker.send', fieldsObject)
  },
  initGO(iframeRef) {
    this.iframeRef = iframeRef
    if (!GOexperimentId || !GOcontainerId || !this.initialized) return Promise.resolve()
    const _this = this
    return loadGA(iframeRef.contentDocument).then(() => {
      const GOvariationId = _this.iframeRef.contentWindow.cxApi.chooseVariation()
      localStorage.setItem('trnd-exp-var', GOvariationId)
      _this.iframeRef.contentWindow.cxApi.setChosenVariation(GOvariationId, GOexperimentId)
      ReactGA.ga()('frekkls_tracker.set', 'exp', `${GOexperimentId}.${GOvariationId}`)
    })
  },
  pageView() {
    if (!this.initialized) return
    this.event({
      hitType: 'pageview',
      eventCategory: 'Page',
      eventAction: 'view',
      eventLabel: 'Page view',
      page: location.href,
    })
  },
  getVariation() {
    if (!this.initialized) return
    const pluginPresence =
      this.iframeRef.contentWindow.cxApi.getChosenVariation(GOexperimentId) === 1 ? 'absent' : 'present'
    return pluginPresence
  },
}

export default frekklsGA
