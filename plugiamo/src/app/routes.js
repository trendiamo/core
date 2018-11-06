const routes = {
  isSpotlight(path) {
    return path.startsWith('/spotlight')
  },
  root() {
    return '/'
  },
  scriptedChat(chatId) {
    return `/scripted-chat/${chatId}`
  },
  spotlight(spotlightId) {
    return `/spotlight/${spotlightId}`
  },
}

export default routes
