import mixpanel from 'ext/mixpanel'
import setupDataGathering from 'data-gathering'
import { loadRollbar } from 'ext/rollbar'
import { location, mixpanelToken } from './config'
import { setAffiliateToken } from 'utils'

const addTrackerLoadingFrame = () => {
  const iframe = document.createElement('iframe')
  iframe.className = 'frekkls-tracker-loading-frame'
  iframe.title = 'Frekkls Tracker Loading Frame'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = '0'
  iframe.style.display = 'none'
  iframe.style.position = 'absolute'
  document.body.appendChild(iframe)
  const script = document.createElement('script')
  iframe.contentDocument.body.appendChild(script)
  return iframe
}

const initApp = () => {
  setAffiliateToken()
  mixpanel.init(mixpanelToken)
  mixpanel.track('Visited Page', { hostname: location.hostname })
  setupDataGathering()
}

const main = () => initApp()

if (!window.FREKKLS_TRACKER) {
  window.FREKKLS_TRACKER = true
  const trackerLoadingFrame = addTrackerLoadingFrame()
  loadRollbar(trackerLoadingFrame)
  main()
}
