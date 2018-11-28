import auth from 'auth'
import routes from 'app/routes'
import { stringify } from 'query-string'

const BASE_API_URL = `${process.env.REACT_APP_API_ENDPOINT || ''}/api/v1`
const CSRF_TOKEN_URL = `${BASE_API_URL}/csrf_token`
const PERSONAS_URL = `${BASE_API_URL}/personas`
const OUTROS_URL = `${BASE_API_URL}/outros`
const CURATIONS_URL = `${BASE_API_URL}/curations`
const SCRIPTED_CHATS_URL = `${BASE_API_URL}/scripted_chats`
const TRIGGERS_URL = `${BASE_API_URL}/triggers`
const SIGNUP_URL = `${BASE_API_URL}/users/sign_up`
const SIGNIN_URL = `${BASE_API_URL}/users/sign_in`
const SIGNOUT_URL = `${BASE_API_URL}/users/sign_out`
const PASSWORD_FORM_URL = `${BASE_API_URL}/users/password`
const PASSWORD_RESET_URL = `${BASE_API_URL}/users/password`
const PASSWORD_CHANGE_URL = `${BASE_API_URL}/users/change_password`
const ME_URL = `${BASE_API_URL}/me`
const WEBSITES_URL = `${BASE_API_URL}/websites`
const FLOWS_URL = `${BASE_API_URL}/flows`

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

// Gets generated from the backend CSRF token and saves it in the client-side (local storage).
export const getCsrfToken = async () => {
  const json = await apiMeRequest(CSRF_TOKEN_URL)
  auth.setCsrfToken(json)
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

export const authFetch = async (url, params) => {
  const result = await fetch(url, params)
  if (result.status === 403 || result.status === 401) {
    auth.clear()
    return {}
  }
  return result
}

const apiRequest = async (url, body) => {
  const res = await fetch(url, {
    body: JSON.stringify(body),
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': auth.getToken(),
    }),
    method: 'post',
  })
  return res.json()
}

const apiMeRequest = async url => {
  const res = await fetch(url, {
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })
  return res.json()
}

const apiMeUpdateRequest = async (url, body) => {
  const res = await authFetch(url, {
    body: JSON.stringify(body),
    credentials: 'include',
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
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'put',
  })
  return res.json()
}

const apiWebsiteShowRequest = async url => {
  const res = await authFetch(url, {
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })
  return res.json()
}

const apiWebsiteUpdateRequest = async (url, body) => {
  const res = await authFetch(url, {
    body: JSON.stringify(body),
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'put',
  })
  return res.json()
}

const apiListRequest = async url => {
  const res = await authFetch(url, {
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })
  const json = await res.json()
  const count = parseInt(
    res.headers
      .get('content-range')
      .split('/')
      .pop(),
    10
  )
  return {
    json,
    count,
  }
}

const apiPersonaShowRequest = async url => {
  const res = await authFetch(url, {
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })
  return res.json()
}

const apiPersonaCreateRequest = async (url, body) => {
  const res = await authFetch(url, {
    body: JSON.stringify(body),
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'post',
  })
  return res.json()
}

const apiDestroyRequest = async (url, body) => {
  const res = await authFetch(url, {
    body: JSON.stringify(body),
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'delete',
  })
  return res.json()
}

const apiPersonaUpdateRequest = async (url, body) => {
  const res = await authFetch(url, {
    body: JSON.stringify(body),
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'put',
  })
  return res.json()
}

const apiPasswordChangeRequest = async (url, body) => {
  const res = await authFetch(url, {
    body: JSON.stringify(body),
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'put',
  })
  return res.json()
}

const apiRequestSignout = async url => {
  const res = await authFetch(url, {
    credentials: 'include',
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
    auth.setAuth({ user: json.user })
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
    auth.setAuth({ user: json.user })
  }
  setInfo(info)
}

export const apiSagaSignout = async url => {
  const json = await apiRequestSignout(url)
  const info = convertToInfo(json)
  if (info.status === 'success') return auth.clear()
  console.error('Error on Logout!')
}

export const apiListSaga = async (url, setInfo) => {
  const { json, count } = await apiListRequest(url)
  const info = convertToInfo(json)
  if (info.status === 'success') return { json, count }
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

export const apiPersonaListSaga = async (url, setInfo) => {
  const json = await apiPersonaListRequest(url)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

const apiPersonaListRequest = async url => {
  const res = await fetch(url, {
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })
  return res.json()
}

export const apiDestroySaga = async (url, body, setInfo) => {
  const json = await apiDestroyRequest(url, body)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

export const apiTriggerListSaga = async (url, setInfo) => {
  const json = await apiTriggerListRequest(url)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

const apiTriggerListRequest = async url => {
  const res = await authFetch(url, {
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })
  return res.json()
}

export const apiTriggerDestroySaga = async (url, body, setInfo) => {
  const json = await apiTriggerDestroyRequest(url, body)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

const apiTriggerDestroyRequest = async (url, body) => {
  const res = await authFetch(url, {
    body: JSON.stringify(body),
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'delete',
  })
  return res.json()
}

export const apiTriggerCreateSaga = async (url, body, setInfo) => {
  const json = await apiTriggerCreateRequest(url, body)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

const apiTriggerCreateRequest = async (url, body) => {
  const res = await authFetch(url, {
    body: JSON.stringify(body),
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'post',
  })
  return res.json()
}

const apiTriggerShowRequest = async url => {
  const res = await authFetch(url, {
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })
  return res.json()
}

export const apiTriggerShowSaga = async (url, setInfo) => {
  const json = await apiTriggerShowRequest(url)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

const apiTriggerUpdateRequest = async (url, body) => {
  const res = await authFetch(url, {
    body: JSON.stringify(body),
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'put',
  })
  return res.json()
}

export const apiTriggerUpdateSaga = async (url, body, setInfo) => {
  const json = await apiTriggerUpdateRequest(url, body)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

export const apiScriptedChatListSaga = async (url, setInfo) => {
  const json = await apiScriptedChatListRequest(url)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

const apiScriptedChatListRequest = async url => {
  const res = await authFetch(url, {
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })
  return res.json()
}

export const apiOutroListSaga = async (url, setInfo) => {
  const json = await apiOutroListRequest(url)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

const apiOutroListRequest = async url => {
  const res = await authFetch(url, {
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })
  return res.json()
}

export const apiOutroCreateSaga = async (url, body, setInfo) => {
  const json = await apiOutroCreateRequest(url, body)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

const apiOutroCreateRequest = async (url, body) => {
  const res = await fetch(url, {
    body: JSON.stringify(body),
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'post',
  })
  return res.json()
}

const apiOutroShowRequest = async url => {
  const res = await fetch(url, {
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })
  return res.json()
}

export const apiOutroShowSaga = async (url, setInfo) => {
  const json = await apiOutroShowRequest(url)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

const apiOutroUpdateRequest = async (url, body) => {
  const res = await fetch(url, {
    credentials: 'include',
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'put',
  })
  return res.json()
}

export const apiOutroUpdateSaga = async (url, body, setInfo) => {
  const json = await apiOutroUpdateRequest(url, body)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

export const apiFlowsListSaga = async (url, setInfo) => {
  const json = await apiFlowListRequest(url)
  const info = convertToInfo(json)
  if (info.status === 'success') return json
  setInfo(info)
}

const apiFlowListRequest = async url => {
  const res = await authFetch(url, {
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })
  return res.json()
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

export const apiPersonaList = (setInfo, query) => apiListSaga(`${PERSONAS_URL}/?${stringify(query)}`, setInfo)
export const apiPersonaShow = (id, setInfo) => apiPersonaShowSaga(`${PERSONAS_URL}/${id}`, setInfo)
export const apiPersonaCreate = (body, setInfo) => apiPersonaCreateSaga(PERSONAS_URL, body, setInfo)
export const apiPersonaUpdate = (id, body, setInfo) => apiPersonaUpdateSaga(`${PERSONAS_URL}/${id}`, body, setInfo)
export const apiPersonaDestroy = (body, setInfo) => apiDestroySaga(PERSONAS_URL, body, setInfo)
export const apiPersonaSimpleList = (setInfo, query) =>
  apiPersonaListSaga(`${PERSONAS_URL}/?${stringify(query)}`, setInfo)

export const apiOutroList = (setInfo, query) => apiListSaga(`${OUTROS_URL}/?${stringify(query)}`, setInfo)
export const apiOutroDestroy = (body, setInfo) => apiDestroySaga(OUTROS_URL, body, setInfo)
export const apiOutroCreate = (body, setInfo) => apiOutroCreateSaga(OUTROS_URL, body, setInfo)
export const apiOutroShow = (id, setInfo) => apiOutroShowSaga(`${OUTROS_URL}/${id}`, setInfo)
export const apiOutroUpdate = (id, body, setInfo) => apiOutroUpdateSaga(`${OUTROS_URL}/${id}`, body, setInfo)

export const apiCurationList = (setInfo, query) => apiListSaga(`${CURATIONS_URL}/?${stringify(query)}`, setInfo)
export const apiCurationDestroy = (body, setInfo) => apiDestroySaga(CURATIONS_URL, body, setInfo)

export const apiScriptedChatList = (setInfo, query) =>
  apiListSaga(`${SCRIPTED_CHATS_URL}/?${stringify(query)}`, setInfo)
export const apiScriptedChatDestroy = (body, setInfo) => apiDestroySaga(SCRIPTED_CHATS_URL, body, setInfo)

export const apiTriggerList = setInfo => apiTriggerListSaga(TRIGGERS_URL, setInfo)
export const apiTriggerDestroy = (body, setInfo) => apiTriggerDestroySaga(TRIGGERS_URL, body, setInfo)
export const apiTriggerCreate = (body, setInfo) => apiTriggerCreateSaga(TRIGGERS_URL, body, setInfo)
export const apiTriggerShow = (id, setInfo) => apiTriggerShowSaga(`${TRIGGERS_URL}/${id}`, setInfo)
export const apiTriggerUpdate = (id, body, setInfo) => apiTriggerUpdateSaga(`${TRIGGERS_URL}/${id}`, body, setInfo)

export const apiFlowsList = setInfo => apiFlowsListSaga(`${FLOWS_URL}`, setInfo)
