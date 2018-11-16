const routes = {
  curation(curationId) {
    return `/curation/${curationId}`
  },
  isCuration(path) {
    return path.match(/\/curation\/([^/]+)/)
  },
  isSpotlight(path) {
    return path.match(/\/curation\/([^/]+)\/spotlight\/([^/]+)/)
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
  spotlight(curationId, spotlightId) {
    return `/curation/${curationId}/spotlight/${spotlightId}`
  },
}

export default routes
