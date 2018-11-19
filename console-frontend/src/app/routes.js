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
  personaCreate() {
    return '/personas/create'
  },
  personaShow(id) {
    return `/personas/${id}`
  },
  personaEdit(id) {
    return `/personas/${id}/edit`
  },
}

export default routes
