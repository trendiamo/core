import auth from 'auth'

const routes = {
  account(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/account`
  },
  accountRoot(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}`
  },
  accounts() {
    return '/accounts'
  },
  dataDashboard(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/data-dashboard`
  },
  isPasswordReset() {
    return window.location.pathname.includes('/password-reset')
  },
  login() {
    return '/login'
  },
  outrosList(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/outros`
  },
  outroCreate(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/outros/create`
  },
  outroEdit(id, accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/outros/${id}/edit`
  },
  passwordChange() {
    return '/change-password'
  },
  passwordReset() {
    return '/password-reset'
  },
  personasList(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/personas`
  },
  personaCreate(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/personas/create`
  },
  personaEdit(id, accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/personas/${id}/edit`
  },
  picturesList(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/pictures`
  },
  requestPasswordReset() {
    return '/request-password-reset'
  },
  root() {
    return '/'
  },
  signup() {
    return '/signup'
  },
  simpleChatsList(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/simple-chats`
  },
  simpleChatCreate(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/simple-chats/create`
  },
  simpleChatEdit(id, accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/simple-chats/${id}/edit`
  },
  showcasesList(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/showcases`
  },
  showcaseCreate(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/showcases/create`
  },
  showcaseEdit(id, accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/showcases/${id}/edit`
  },
  triggerCreate(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/triggers/create`
  },
  triggersList(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/triggers`
  },
  triggerEdit(id, accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/triggers/${id}/edit`
  },
  welcome(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/welcome`
  },
  urlGenerator(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/url-generator`
  },
  userCreate(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/account/users/create`
  },
  userEdit(id, accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/account/users/${id}/edit`
  },
  nullRoute() {
    return '/empty'
  },
}

export default routes
