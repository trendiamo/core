import auth from 'auth'
import { BASE_API_URL } from './shared'

const CSRF_TOKEN_URL = `${BASE_API_URL}/csrf_token`
const SIGNIN_URL = `${BASE_API_URL}/users/sign_in`
const PASSWORD_FORM_URL = `${BASE_API_URL}/users/password`
const PASSWORD_RESET_URL = `${BASE_API_URL}/users/password`

const apiGetRequest = async url =>
  await fetch(url, {
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })

const apiPostRequest = async (url, body) =>
  await fetch(url, {
    body: JSON.stringify(body),
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'post',
  })

const apiPutRequest = async (url, body) =>
  await fetch(url, {
    body: JSON.stringify(body),
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'put',
  })

export const apiPasswordReset = body => apiPutRequest(PASSWORD_RESET_URL, body)

export const apiPasswordEmailLink = body => apiPostRequest(PASSWORD_FORM_URL, body)

export const apiSignIn = body => apiPostRequest(SIGNIN_URL, body)

export const apiGetCsrfToken = () => apiGetRequest(CSRF_TOKEN_URL)
