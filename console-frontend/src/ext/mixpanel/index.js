import mixpanel from 'mixpanel-browser'

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
    if (mpToken && process.env.NODE_ENV === 'production') {
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
      if (process.env.NODE_ENV !== 'production') {
        console.info(`%c mixpanel.track('${eventName}')`, 'color: #a271cf', properties)
      }
      if (callback) callback()
    }
  },
  reset() {
    if (this.initialized) {
      mixpanel.reset()
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.info('%c mixpanel.reset()', 'color: #a271cf')
      }
    }
  },
  identify(uniqueId) {
    if (this.initialized) {
      mixpanel.identify(uniqueId)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.info('%c mixpanel.identify()', 'color: #a271cf', uniqueId)
      }
    }
  },
  people: {
    set(prop, to, callback) {
      if (this.initialized) {
        mixpanel.track(prop, to, callback)
      } else {
        if (process.env.NODE_ENV !== 'production') {
          console.info('%c mixpanel.people.set()', 'color: #a271cf', prop, to)
        }
        if (callback) callback()
      }
    },
  },
}

export default trndMixpanel
