import auth from './index'
import routes from 'app/routes'

const BASE_API_PATH = `https://${process.env.REACT_APP_API_ENDPOINT}/api/v1`
const SIGNUP_URL = `${BASE_API_PATH}/users/sign_up`
const SIGNIN_URL = `${BASE_API_PATH}/users/sign_in`
const SIGNOUT_URL = `${BASE_API_PATH}/users/sign_out`
const PASSWORD_FORM_URL = `${BASE_API_PATH}/users/password`
const PASSWORD_RESET_URL = `${BASE_API_PATH}/users/password`
const PASSWORD_CHANGE_URL = `${BASE_API_PATH}/users/change_password`

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

const apiPasswordChangeRequest = async (url, body) => {
  const res = await fetch(url, {
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'put',
  })
  return res.json()
}

const apiRequestSignout = async url => {
  const res = await fetch(url, {
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'delete',
  })
  return res.json()
}

export const apiPasswordResetSaga = async (url, body, setErrors) => {
  const json = await apiPasswordRequest(url, body)
  if (json.error || json.errors) {
    setErrors(errorMessages(json))
  } else {
    auth.setAuth({ token: json.authenticationToken, user: json.user })
    window.location.href = routes.root()
  }
}

export const apiPasswordChangeSaga = async (url, body, setErrors) => {
  const json = await apiPasswordChangeRequest(url, body)
  if (json.error || json.errors) {
    setErrors(errorMessages(json))
  } else {
    auth.setAuth({ token: auth.getToken(), user: json.user })
    window.location.href = routes.root()
  }
}

const errorMessages = json => {
  if (json.error) {
    return 'Invalid Credentials'
  } else {
    return errorMessagesContent(json, 'Can not create account')
  }
}

const errorMessagesContent = (json, defaultMessage) => {
  if (typeof json.errors === 'object') {
    return json.errors.map(error => `${error}`).join('')
  } else {
    return defaultMessage
  }
}

export const apiSaga = async (url, body, setErrors) => {
  const json = await apiRequest(url, body)
  if (json.error || json.errors) {
    setErrors(errorMessages(json))
  } else {
    auth.setAuth({ token: json.authenticationToken, user: json.user })
  }
}

export const apiSagaSignout = async (url, body) => {
  const json = await apiRequestSignout(url, body)
  if (json.error || json.errors) {
    console.error(json.error)
  } else {
    auth.clear()
  }
}

export const apiPasswordEmailLinkSaga = async (url, body, setErrors, setNotification) => {
  const json = await apiRequest(url, body)
  if (json.error || json.errors) {
    setErrors(errorMessages(json))
  } else {
    setNotification('Email sent!')
  }
}

export const apiSignUp = body => apiSaga(SIGNUP_URL, body)
export const apiSignIn = (body, setErrors) => apiSaga(SIGNIN_URL, body, setErrors)
export const apiSignOut = () => apiSagaSignout(SIGNOUT_URL)
export const apiPasswordEmailLink = (body, setErrors, setNotification) =>
  apiPasswordEmailLinkSaga(PASSWORD_FORM_URL, body, setErrors, setNotification)
export const apiPasswordReset = (body, setErrors) => apiPasswordResetSaga(PASSWORD_RESET_URL, body, setErrors)
export const apiPasswordChange = (body, setErrors) => apiPasswordChangeSaga(PASSWORD_CHANGE_URL, body, setErrors)
