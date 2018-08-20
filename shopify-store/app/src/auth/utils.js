import { navTo } from 'app/utils'

const baseApiUrl = `https://${process.env.API_ENDPOINT}/api/v1`
const SIGNUP_URL = `${baseApiUrl}/users/sign_up`
const SIGNIN_URL = `${baseApiUrl}/users/sign_in`
const PASSWORD_URL = `${baseApiUrl}/users/password`
const PASSWORD_RESET_URL = `${baseApiUrl}/users/password`

// export const isCurrentUser = user => user.email === localStorage.getItem('authEmail')

let isRedirectingToLogin = false
const handleAuthLost = auth => {
  if (isRedirectingToLogin) return
  isRedirectingToLogin = true
  auth.clear()
  setTimeout(() => {
    alert('Please login again')
    window.location = '/account/login'
  }, 1)
  return null
}

const matchAuthError = str => /You are not authorized to perform this action/.test(str)

export const checkAuthError = ({ data }) => data && data.error && matchAuthError(data.error.message)

export const treatAuthError = () => ({ auth }) => handleAuthLost(auth)

export const authGql = async (auth, action) => {
  try {
    await action()
  } catch (e) {
    if (matchAuthError(e.message)) {
      handleAuthLost(auth)
    } else {
      throw e
    }
  }
}

const apiRequest = async (url, body) => {
  const res = await fetch(url, {
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method: 'post',
  })
  return res.json()
}

const apiPasswordRequest = async (url, body) => {
  const res = await fetch(url, {
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method: 'put',
  })
  return res.json()
}

const errorMessages = json => {
  if (json.error) {
    return '<ul><li>Invalid Credentials</li></ul>'
  } else {
    return errorMessagesContent(json, 'Can not create account')
  }
}

const errorMessagesContent = (json, defaultMessage) => {
  if (typeof json.errors === 'object') {
    const listItems = json.errors.map(error => `<li>${error}</li>`)
    return `<ul>${listItems.join('')}</ul>`
  } else {
    return `<ul><li>${defaultMessage}</li></ul>`
  }
}

export const authRedirect = () => navTo('/u/account')

export const apiSaga = async (url, body, auth, setErrors) => {
  const json = await apiRequest(url, body)
  if (json.error || json.errors) {
    setErrors(errorMessages(json))
  } else {
    auth.set(json.user.email, json.authenticationToken)
    authRedirect()
  }
}

export const apiPasswordResetSaga = async (url, body, auth, setErrors) => {
  const json = await apiPasswordRequest(url, body)
  if (json.error || json.errors) {
    setErrors(errorMessagesContent(json, 'Can not reset password'))
  } else {
    auth.set(json.user.email, json.authenticationToken)
    authRedirect()
  }
}

export const apiSignUp = (body, auth, setErrors) => apiSaga(SIGNUP_URL, body, auth, setErrors)
export const apiSignIn = (body, auth, setErrors) => apiSaga(SIGNIN_URL, body, auth, setErrors)
export const apiPassword = body => apiRequest(PASSWORD_URL, body)
export const apiPasswordReset = (body, auth, setErrors) =>
  apiPasswordResetSaga(PASSWORD_RESET_URL, body, auth, setErrors)
