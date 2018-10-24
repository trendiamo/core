import mixpanel from 'mixpanel-browser'
import { production } from 'config'

const trndMixpanel = {
  get_distinct_id() {
    return mixpanel.get_distinct_id()
  },
  init(mpToken, mpConfig, name) {
    if (mpToken && production) {
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
