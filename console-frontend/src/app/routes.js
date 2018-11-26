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
  personaShow(id) {
    return `/personas/${id}`
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
  outroShow(id) {
    return `/outros/${id}`
  },
  outroEdit(id) {
    return `/outros/${id}/edit`
  },
  curationsList() {
    return '/curations'
  },
  curationCreate() {
    return '/curations/create'
  },
  curationShow(id) {
    return `/curations/${id}`
  },
  curationEdit(id) {
    return `/curations/${id}/edit`
  },
}

export default routes
