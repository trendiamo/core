import { authFetch, baseApiUrl } from 'utils'

const SIGNUP_URL = `${baseApiUrl}/consumers/sign_up`
const SIGNIN_URL = `${baseApiUrl}/consumers/sign_in`
const UPDATE_ME_URL = `${baseApiUrl}/consumers/me`

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
    return '<li>Invalid login credentials.</li>'
  } else {
    if (typeof json.errors === 'object') {
      return json.errors.map(error => `<li>${error}</li>`)
    } else {
      return '<li>Cannot create account.</li>'
    }
  }
}

export const apiSaga = async (url, body) => {
  const json = await apiRequest(url, body)
  if (json.error || json.errors) {
    document
      .querySelector('h1')
      .insertAdjacentHTML('afterend', `<div class="errors"><ul>${errorMessages(json)}</ul></div>`)
  } else {
    localStorage.setItem('consumerToken', json.authenticationToken)
    window.location = `/account/login/multipass/${json.shopifyToken}`
  }
}

export const apiSignUp = body => apiSaga(SIGNUP_URL, body)
export const apiSignIn = body => apiSaga(SIGNIN_URL, body)

export const updateMe = async params =>
  authFetch(UPDATE_ME_URL, {
    body: JSON.stringify({ consumer: params }),
    method: 'PATCH',
  })
