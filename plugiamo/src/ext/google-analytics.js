import ReactGA from 'react-ga'
import { GApropertyId, GOcontainerId, GOexperimentId, production } from 'config'

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
  init(contentDocument, contentWindow) {
    if (!production || !GApropertyId) return Promise.resolve()
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
    // if experiment is active start experiment and register pageview event on ga
    if (GOexperimentId && GOcontainerId) {
      return loadGA(contentDocument).then(() => {
        const GOvariationId = contentWindow.cxApi.chooseVariation()
        contentWindow.cxApi.setChosenVariation(GOvariationId, GOexperimentId)
        ReactGA.ga()('frekkls_tracker.set', 'exp', `${GOexperimentId}.${GOvariationId}`)
        this.pageView()
      })
      // else just register pageview event on ga
    } else {
      this.pageView()
      return Promise.resolve()
    }
  },
  event(fieldsObject) {
    if (!this.initialized) return
    ReactGA.ga()('frekkls_tracker.send', fieldsObject)
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
    if (!this.initialized) return
    return this.iframeRef.contentWindow.cxApi.getChosenVariation(GOexperimentId)
  },
}

export default frekklsGA
