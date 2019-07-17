import { getSlug } from 'utils/shared'

const routes = {
  account(accountSlug = getSlug()) {
    return `/${accountSlug}/account`
  },
  isPasswordReset() {
    return window.location.pathname.includes('/password-reset')
  },
  login() {
    return '/login'
  },
  signup() {
    return '/signup'
  },
  passwordChange() {
    return '/change-password'
  },
  passwordReset() {
    return '/password-reset'
  },
  requestPasswordReset() {
    return '/request-password-reset'
  },
  root(accountSlug = getSlug()) {
    return accountSlug ? `/${accountSlug}/` : '/'
  },
  personasList(accountSlug = getSlug()) {
    return `/${accountSlug}/personas`
  },
  personaCreate(accountSlug = getSlug()) {
    return `/${accountSlug}/personas/create`
  },
  personaEdit(id, accountSlug = getSlug()) {
    return `/${accountSlug}/personas/${id}/edit`
  },
  picturesList(accountSlug = getSlug()) {
    return `/${accountSlug}/pictures`
  },
  outrosList(accountSlug = getSlug()) {
    return `/${accountSlug}/outros`
  },
  outroCreate(accountSlug = getSlug()) {
    return `/${accountSlug}/outros/create`
  },
  outroEdit(id, accountSlug = getSlug()) {
    return `/${accountSlug}/outros/${id}/edit`
  },
  showcasesList(accountSlug = getSlug()) {
    return `/${accountSlug}/showcases`
  },
  showcaseCreate(accountSlug = getSlug()) {
    return `/${accountSlug}/showcases/create`
  },
  showcaseEdit(id, accountSlug = getSlug()) {
    return `/${accountSlug}/showcases/${id}/edit`
  },
  simpleChatsList(accountSlug = getSlug()) {
    return `/${accountSlug}/simple-chats`
  },
  simpleChatCreate(accountSlug = getSlug()) {
    return `/${accountSlug}/simple-chats/create`
  },
  simpleChatEdit(id, accountSlug = getSlug()) {
    return `/${accountSlug}/simple-chats/${id}/edit`
  },
  triggerCreate(accountSlug = getSlug()) {
    return `/${accountSlug}/triggers/create`
  },
  triggersList(accountSlug = getSlug()) {
    return `/${accountSlug}/triggers`
  },
  triggerEdit(id, accountSlug = getSlug()) {
    return `/${accountSlug}/triggers/${id}/edit`
  },
  urlGenerator(accountSlug = getSlug()) {
    return `/${accountSlug}/url-generator`
  },
  userCreate(accountSlug = getSlug()) {
    return `/${accountSlug}/account/users/create`
  },
  userEdit(id, accountSlug = getSlug()) {
    return `/${accountSlug}/account/users/${id}/edit`
  },
  accounts() {
    return '/accounts'
  },
  dataDashboard(accountSlug = getSlug()) {
    return `/${accountSlug}/data-dashboard`
  },
  nullRoute() {
    return '/empty'
  },
}

export default routes
