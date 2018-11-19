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
  influencerCreate() {
    return '/influencers/create'
  },
  influencerShow(id) {
    return `/influencers/${id}`
  },
  influencerEdit(id) {
    return `/influencers/${id}/edit`
  },
}

export default routes
