import mixpanel from 'mixpanel-browser'
import { production } from 'config'

const mockUniqueId = () => {
  if (!window.__mockUniqueId) {
    window.__mockUniqueId = Array.from(Array(4))
      .map(() =>
        Math.random()
          .toString(16)
          .substring(2, 15)
      )
      .join('-')
  }
  return window.__mockUniqueId
}

const trndMixpanel = {
  get_distinct_id() {
    return this.initialized ? mixpanel.get_distinct_id() : mockUniqueId()
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
