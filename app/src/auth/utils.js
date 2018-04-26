import { $, authFetch, baseApiUrl } from 'utils'

const SIGNUP_URL = `${baseApiUrl}/users/sign_up`
const SIGNIN_URL = `${baseApiUrl}/users/sign_in`
const UPDATE_ME_URL = `${baseApiUrl}/users/me`

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

const errorMessages = json => {
  if (json.error) {
    return '<ul><li>Ungültige Anmeldedaten.</li></ul>'
  } else {
    if (typeof json.errors === 'object') {
      const listItems = json.errors.map(error => `<li>${error}</li>`)
      return `<ul>${listItems}</ul>`
    } else {
      return '<ul><li>Kann keinen Account erstellen.</li></ul>'
    }
  }
}

export const apiSaga = async (url, body) => {
  const json = await apiRequest(url, body)
  if (json.error || json.errors) {
    const errors = $('.errors')
    if (errors) {
      errors.innerHTML = errorMessages(json)
    } else {
      $('h1').insertAdjacentHTML('afterend', `<div class="errors">${errorMessages(json)}</div>`)
    }
  } else {
    localStorage.setItem('authToken', json.authenticationToken)
    window.location = `/account/login/multipass/${json.shopifyToken}`
  }
}

export const apiSignUp = body => apiSaga(SIGNUP_URL, body)
export const apiSignIn = body => apiSaga(SIGNIN_URL, body)

export const updateMe = async params =>
  authFetch(UPDATE_ME_URL, {
    body: JSON.stringify({ user: params }),
    method: 'PATCH',
  })
