import mixpanel from 'ext/mixpanel'
import setupDataGathering from 'data-gathering'
import { location, mixpanelToken } from './config'

const initApp = () => {
  mixpanel.init(mixpanelToken)
  mixpanel.track('Visited Page', { hostname: location.hostname })
  setupDataGathering()
}

const main = () => initApp()

if (!window.FREKKLS_TRACKER) {
  window.FREKKLS_TRACKER = true
  main()
}
