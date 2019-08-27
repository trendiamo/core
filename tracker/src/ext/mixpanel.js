import mixpanel from 'mixpanel-browser'
import { production } from 'config'

const mockUniqueId = () => {
  let mockUniqueId = localStorage.getItem('mockUniqueId')
  if (!mockUniqueId) {
    mockUniqueId = Array.from(Array(4))
      .map(() =>
        Math.random()
          .toString(16)
          .substring(2, 15)
      )
      .join('-')
    localStorage.setItem('mockUniqueId', mockUniqueId)
  }
  return mockUniqueId
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
    } else {
      if (!production) console.info(`%c mixpanel.track('${eventName}')`, 'color: #a271cf', properties)
      if (callback) callback()
    }
  },
}

export default trndMixpanel
