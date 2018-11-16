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
  scriptedChat(chatId) {
    return `/scripted-chat/${chatId}`
  },
  spotlight(curationId, spotlightId) {
    return `/curation/${curationId}/spotlight/${spotlightId}`
  },
}

export default routes
