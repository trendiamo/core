import auth from 'auth'
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

export const apiPasswordReset = async body => {
  const json = await apiPutRequest(PASSWORD_RESET_URL, body)
  if (!json.errors && !json.error) auth.setAuth({ user: json.user })
  return json
}

export const apiPasswordEmailLink = async (body, setInfo) => {
  const json = await apiPostRequest(PASSWORD_FORM_URL, body)
  setInfo(convertToInfo(json, 'Email sent!'))
  return json
}

export const apiSignIn = async body => {
  const json = await apiPostRequest(SIGNIN_URL, body)
  if (!json.errors && !json.error) auth.setAuth({ user: json.user })
  return json
}

export const apiGetCsrfToken = async () => {
  const json = await apiGetRequest(CSRF_TOKEN_URL)
  auth.setCsrfToken(json)
  return json
}
