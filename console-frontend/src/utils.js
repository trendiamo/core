import auth from 'auth'
import routes from 'app/routes'

const BASE_API_URL = `${process.env.REACT_APP_API_ENDPOINT || ''}/api/v1`
const PERSONAS_URL = `${BASE_API_URL}/personas`
const SIGNUP_URL = `${BASE_API_URL}/users/sign_up`
const SIGNIN_URL = `${BASE_API_URL}/users/sign_in`
const SIGNOUT_URL = `${BASE_API_URL}/users/sign_out`
const PASSWORD_FORM_URL = `${BASE_API_URL}/users/password`
const PASSWORD_RESET_URL = `${BASE_API_URL}/users/password`
const PASSWORD_CHANGE_URL = `${BASE_API_URL}/users/change_password`
const ME_URL = `${BASE_API_URL}/me`
const WEBSITES_URL = `${BASE_API_URL}/websites`

const defaultErrorMessage = 'Something went wrong!'

// Converts the input (json) to an object where the status keyword is always present.
// Simplifies the use in the <Notification /> component
const convertToInfo = (json, defaultMessage) => {
  defaultMessage = defaultMessage || 'Success!'
  const hasError = json.errors || json.error
  const status = hasError ? 'error' : 'success'
  const message = hasError ? errorMessages(json) : defaultMessage
  const isAuthError = hasError ? checkAuth(json) : false
  return isAuthError ? auth.clear() : { message, status }
}

const checkAuth = json => (json.errors || []).find(error => error.title === 'Invalid email or token')

const errorMessages = json => {
  if (json.error) {
    return 'Invalid Credentials'
  } else {
    return typeof json === 'object' ? mapErrors(json) : defaultErrorMessage
  }
}

const mapErrors = json => {
  return Array.isArray(json.errors) ? json.errors.map(error => error.title).join(', ') : defaultErrorMessage
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

const apiMeRequest = async url => {
  const res = await fetch(url, {
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })
  return res.json()
}

const apiMeUpdateRequest = async (url, body) => {
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

const apiWebsiteShowRequest = async url => {
  const res = await fetch(url, {
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })
  return res.json()
}

const apiWebsiteUpdateRequest = async (url, body) => {
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

const apiPersonaListRequest = async url => {
  const res = await fetch(url, {
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })
  return res.json()
}

const apiPersonalListHeaders = async url => {
  const res = await fetch(url, {
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })
  return { page: res.headers.get('Content-Page'), range: res.headers.get('Content-Range') }
}

const apiPersonaShowRequest = async url => {
  const res = await fetch(url, {
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })
  return res.json()
}

const apiPersonaCreateRequest = async (url, body) => {
  const res = await fetch(url, {
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'post',
  })
  return res.json()
}

const apiPersonaDestroyRequest = async (url, body) => {
  const res = await fetch(url, {
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'delete',
  })
  return res.json()
}

const apiPersonaUpdateRequest = async (url, body) => {
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

export const apiPasswordResetSaga = async (url, body, setInfo) => {
  const json = await apiPasswordRequest(url, body)
  const info = convertToInfo(json)
  if (info.status === 'success') {
    auth.setAuth({ token: json.authenticationToken, user: json.user })
    window.location.href = routes.root()
  }
  setInfo(info)
}

export const apiPasswordChangeSaga = async (url, body, setInfo) => {
  const json = await apiPasswordChangeRequest(url, body)
  const info = convertToInfo(json)
  if (info.status === 'error') {
    setInfo(info)
  }
  return info.status !== 'error'
}

export const apiWebsiteShowSaga = async (url, setInfo) => {
  const json = await apiWebsiteShowRequest(url)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

export const apiWebsiteUpdateSaga = async (url, body, setInfo) => {
  const json = await apiWebsiteUpdateRequest(url, body)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

export const apiMeSaga = async (url, body, setInfo) => {
  const json = await apiMeRequest(url)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

export const apiMeUpdateSaga = async (url, body, setInfo) => {
  const json = await apiMeUpdateRequest(url, body)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

export const apiPasswordEmailLinkSaga = async (url, body, setInfo) => {
  const json = await apiRequest(url, body)
  setInfo(convertToInfo(json, 'Email sent!'))
}

export const apiSaga = async (url, body, setInfo) => {
  const json = await apiRequest(url, body)
  const info = convertToInfo(json)
  if (info.status === 'success') {
    auth.setAuth({ token: json.authenticationToken, user: json.user })
  }
  setInfo(info)
}

export const apiSagaSignout = async url => {
  const json = await apiRequestSignout(url)
  const info = convertToInfo(json)
  if (info.status === 'success') return auth.clear()
  console.error('Error on Logout!')
}

export const apiPersonaListSaga = async (url, setInfo) => {
  const body = await apiPersonaListRequest(url)
  const headers = await apiPersonalListHeaders(url)
  const info = convertToInfo(body)
  if (info.status === 'success') return { body, headers }
  setInfo(info)
}

export const apiPersonaUpdateSaga = async (url, body, setInfo) => {
  const json = await apiPersonaUpdateRequest(url, body)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

export const apiPersonaShowSaga = async (url, setInfo) => {
  const json = await apiPersonaShowRequest(url)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

export const apiPersonaCreateSaga = async (url, body, setInfo) => {
  const json = await apiPersonaCreateRequest(url, body)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

export const apiPersonaDestroySaga = async (url, body, setInfo) => {
  const json = await apiPersonaDestroyRequest(url, body)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

export const apiSignUp = body => apiSaga(SIGNUP_URL, body)
export const apiSignIn = (body, setInfo) => apiSaga(SIGNIN_URL, body, setInfo)
export const apiSignOut = () => apiSagaSignout(SIGNOUT_URL)

export const apiPasswordEmailLink = (body, setInfo) => apiPasswordEmailLinkSaga(PASSWORD_FORM_URL, body, setInfo)
export const apiPasswordReset = (body, setInfo) => apiPasswordResetSaga(PASSWORD_RESET_URL, body, setInfo)
export const apiPasswordChange = (body, setInfo) => apiPasswordChangeSaga(PASSWORD_CHANGE_URL, body, setInfo)

export const apiWebsiteShow = (id, setInfo) => apiWebsiteShowSaga(`${WEBSITES_URL}/${id}`, setInfo)
export const apiWebsiteUpdate = (id, body, setInfo) => apiWebsiteUpdateSaga(`${WEBSITES_URL}/${id}`, body, setInfo)

export const apiMe = setInfo => apiMeSaga(ME_URL, setInfo)
export const apiMeUpdate = (body, setInfo) => apiMeUpdateSaga(ME_URL, body, setInfo)

export const apiPersonaDestroy = (body, setInfo) => apiPersonaDestroySaga(PERSONAS_URL, body, setInfo)
export const apiPersonaList = (setInfo, pagRows) => apiPersonaListSaga(`${PERSONAS_URL}/?${pagRows}`, setInfo)
export const apiPersonaShow = (id, setInfo) => apiPersonaShowSaga(`${PERSONAS_URL}/${id}`, setInfo)
export const apiPersonaCreate = (body, setInfo) => apiPersonaCreateSaga(PERSONAS_URL, body, setInfo)
export const apiPersonaUpdate = (id, body, setInfo) => apiPersonaUpdateSaga(`${PERSONAS_URL}/${id}`, body, setInfo)
