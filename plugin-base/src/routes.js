const routes = {
  showcase(showcaseId) {
    return `/showcase/${showcaseId}`
  },
  isShowcase(path) {
    return path.match(/\/showcase\/([^/]+)/)
  },
  isSpotlight(path) {
    return path.match(/\/showcase\/([^/]+)\/spotlight\/([^/]+)/)
  },
  outro(outroId) {
    return `/outro/${outroId}`
  },
  root() {
    return '/'
  },
  simpleChat(simpleChatId) {
    return `/simple-chat/${simpleChatId}`
  },
  spotlight(showcaseId, spotlightId) {
    return `/showcase/${showcaseId}/spotlight/${spotlightId}`
  },
}

export default routes
