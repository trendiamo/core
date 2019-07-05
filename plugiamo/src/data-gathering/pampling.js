import mixpanel from 'ext/mixpanel'

export default {
  setupDataGathering() {
    if (location.pathname.match(/contacto/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }
  },
}
