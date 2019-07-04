import mixpanel from 'ext/mixpanel'

export default {
  setupDataGathering() {
    if (location.pathname.match(/9662595172/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }
  },
}
