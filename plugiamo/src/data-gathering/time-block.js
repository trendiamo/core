import mixpanel from 'ext/mixpanel'

export default {
  setupDataGathering() {
    if (location.pathname.match(/order-received/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }
  },
}
