const routes = {
  isSpotlight(path) {
    return path.startsWith('/spotlight')
  },
  root() {
    return '/'
  },
  spotlight(spotlightId) {
    return `/spotlight/${spotlightId}`
  },
}

export default routes
