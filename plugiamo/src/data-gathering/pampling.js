import mixpanel from 'ext/mixpanel'

export default {
  setupDataGathering() {
    if (location.pathname.match(/pedido-finalizado/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }
  },
}
