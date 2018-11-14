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
  root() {
    return '/'
  },
  scriptedChat(chatId) {
    return `/scripted-chat/${chatId}`
  },
  spotlight(curationId, spotlightId) {
    return `/curation/${curationId}/spotlight/${spotlightId}`
  },
  success(successId) {
    return `/success/${successId}`
  },
}

export default routes
