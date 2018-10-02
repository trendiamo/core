const baseApiUrl = `https://${process.env.API_ENDPOINT}/api/v1`
const SIGNUP_URL = `${baseApiUrl}/users/sign_up`
const SIGNIN_URL = `${baseApiUrl}/users/sign_in`
const SIGNOUT_URL = `${baseApiUrl}/users/sign_out`
// const PASSWORD_RESET_URL = `${baseApiUrl}/users/password`

const apiRequest = async (url, body) => {
  const res = await fetch(url, {
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-USER-EMAIL': localStorage.getItem('authEmail'),
      'X-USER-TOKEN': localStorage.getItem('authToken'),
    }),
    method: 'post',
  })
  return res.json()
}

const apiRequestSignout = async url => {
  const res = await fetch(url, {
    // body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method: 'delete',
  })
  return res.json()
}

export const apiSaga = async (url, body) => {
  const json = await apiRequest(url, body)
  if (json.error || json.errors) {
    console.log(json.error)
  } else {
    // auth.set(json.user.email, json.authenticationToken)
    localStorage.setItem('authToken', json.authenticationToken)
    localStorage.setItem('authEmail', json.user.email)
  }
}

export const apiSagaSignout = async (url, body) => {
  const json = await apiRequestSignout(url, body)
  if (json.error || json.errors) {
    console.log(json.error)
  } else {
    // auth.set(json.user.email, json.authenticationToken)
    localStorage.removeItem('authToken')
    localStorage.removeItem('authEmail')
  }
}

export const apiSignUp = body => apiSaga(SIGNUP_URL, body)
export const apiSignIn = body => apiSaga(SIGNIN_URL, body)
export const apiSignOut = () => apiSagaSignout(SIGNOUT_URL)
