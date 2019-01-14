const routes = {
  showcase(showcaseId) {
    return `/showcase/${showcaseId}`
  },
  navigation(navigationId) {
    return `/navigation/${navigationId}`
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
  scriptedChat(scriptedChatId) {
    return `/scripted-chat/${scriptedChatId}`
  },
  spotlight(showcaseId, spotlightId) {
    return `/showcase/${showcaseId}/spotlight/${spotlightId}`
  },
}

export default routes
