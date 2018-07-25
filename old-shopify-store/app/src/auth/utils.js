import { $, authSuccess, baseApiUrl } from 'utils'

const SIGNUP_URL = `${baseApiUrl}/users/sign_up`
const SIGNIN_URL = `${baseApiUrl}/users/sign_in`

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
    return '<ul><li>Invalid Credentials</li></ul>'
  } else {
    if (typeof json.errors === 'object') {
      const listItems = json.errors.map(error => `<li>${error}</li>`)
      return `<ul>${listItems.join('')}</ul>`
    } else {
      return '<ul><li>Can not create account</li></ul>'
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
      $('.ReactModal__Content h1').insertAdjacentHTML('afterend', `<div class="errors">${errorMessages(json)}</div>`)
    }
  } else {
    authSuccess(json.authenticationToken, json.user.email)
  }
}

export const apiSignUp = body => apiSaga(SIGNUP_URL, body)
export const apiSignIn = body => apiSaga(SIGNIN_URL, body)
