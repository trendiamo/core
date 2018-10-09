const routes = {
  chat(chatId) {
    return `/chat/${chatId}`
  },
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
