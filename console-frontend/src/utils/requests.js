import auth from 'auth'
import routes from 'app/routes'
import { BASE_API_URL, convertToInfo } from './shared'

const CSRF_TOKEN_URL = `${BASE_API_URL}/csrf_token`
const SIGNIN_URL = `${BASE_API_URL}/users/sign_in`
const PASSWORD_FORM_URL = `${BASE_API_URL}/users/password`
const PASSWORD_RESET_URL = `${BASE_API_URL}/users/password`

const apiGetRequest = async url => {
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

const apiPostRequest = async (url, body) => {
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

const apiPutRequest = async (url, body) => {
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

const apiPasswordResetSaga = async (url, body, setInfo) => {
  const json = await apiPutRequest(url, body)
  const info = convertToInfo(json)
  if (info.status === 'success') {
    auth.setAuth({ user: json.user })
    window.location.href = routes.root()
  }
  setInfo(info)
}

const apiPasswordEmailLinkSaga = async (url, body, setInfo) => {
  const json = await apiPostRequest(url, body)
  setInfo(convertToInfo(json, 'Email sent!'))
}

const apiPostSaga = async (url, body, setInfo) => {
  const json = await apiPostRequest(url, body)
  const info = convertToInfo(json)
  if (info.status === 'success') auth.setAuth({ user: json.user })
  setInfo(info)
}

export const apiGetCsrfToken = async () => {
  const json = await apiGetRequest(CSRF_TOKEN_URL)
  auth.setCsrfToken(json)
  return json
}

export const apiSignIn = (body, setInfo) => apiPostSaga(SIGNIN_URL, body, setInfo)
export const apiPasswordEmailLink = (body, setInfo) => apiPasswordEmailLinkSaga(PASSWORD_FORM_URL, body, setInfo)
export const apiPasswordReset = (body, setInfo) => apiPasswordResetSaga(PASSWORD_RESET_URL, body, setInfo)
