const routes = {
  root() {
    return '/'
  },
  isPasswordReset() {
    return window.location.pathname.includes('/password_reset')
  },
  passwordReset() {
    return '/password_reset'
  },
  account() {
    return '/account'
  },
  login() {
    return '/login'
  },
  requestPasswordReset() {
    return '/request_password_reset'
  },
}

export default routes
