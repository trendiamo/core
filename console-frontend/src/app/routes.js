const routes = {
  account() {
    return '/account'
  },
  isPasswordReset() {
    return window.location.pathname.includes('/password-reset')
  },
  login() {
    return '/login'
  },
  passwordChange() {
    return '/account/change-password'
  },
  passwordReset() {
    return '/password-reset'
  },
  requestPasswordReset() {
    return '/request-password-reset'
  },
  root() {
    return '/'
  },
  personasList() {
    return '/personas'
  },
  personaCreate() {
    return '/personas/create'
  },
  personaEdit(id) {
    return `/personas/${id}/edit`
  },
  outrosList() {
    return '/outros'
  },
  outroCreate() {
    return '/outros/create'
  },
  outroEdit(id) {
    return `/outros/${id}/edit`
  },
  navigationsList() {
    return '/navigations'
  },
  navigationCreate() {
    return '/navigations/create'
  },
  navigationEdit(id) {
    return `/navigations/${id}/edit`
  },
  showcasesList() {
    return '/showcases'
  },
  showcaseCreate() {
    return '/showcases/create'
  },
  showcaseEdit(id) {
    return `/showcases/${id}/edit`
  },
  scriptedChatsList() {
    return '/scripted-chats'
  },
  scriptedChatCreate() {
    return '/scripted-chats/create'
  },
  scriptedChatEdit(id) {
    return `/scripted-chats/${id}/edit`
  },
  triggerCreate() {
    return '/triggers/create'
  },
  triggersList() {
    return '/triggers'
  },
  triggerEdit(id) {
    return `/triggers/${id}/edit`
  },
  urlGenerator() {
    return '/url-generator'
  },
}

export default routes
