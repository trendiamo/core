const routes = {
  account() {
    return '/account'
  },
  isPasswordReset() {
    return window.location.pathname.includes('/password_reset')
  },
  login() {
    return '/login'
  },
  passwordReset() {
    return '/password_reset'
  },
  requestPasswordReset() {
    return '/request_password_reset'
  },
  root() {
    return '/'
  },
}

export default routes
