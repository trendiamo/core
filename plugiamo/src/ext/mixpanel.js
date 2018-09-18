import config from '../config'
import mixpanel from 'mixpanel-browser'

const trndMixpanel = {
  init(mpToken, mpConfig, name) {
    if (config.mixpanelToken) {
      mixpanel.init(mpToken, mpConfig, name)
      this.initialized = true
    }
  },
  initialized: false,
  time_event(eventName) {
    if (this.initialized) {
      mixpanel.time_event(eventName)
    }
  },
  track(eventName, properties, callback) {
    if (this.initialized) {
      mixpanel.track(eventName, properties, callback)
    } else if (callback) {
      callback()
    }
  },
}

export default trndMixpanel
