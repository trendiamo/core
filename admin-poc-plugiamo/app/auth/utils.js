const baseApiUrl = `https://${process.env.API_ENDPOINT}/api/v1`
const SIGNUP_URL = `${baseApiUrl}/users/sign_up`
const SIGNIN_URL = `${baseApiUrl}/users/sign_in`
// const PASSWORD_RESET_URL = `${baseApiUrl}/users/password`

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

export const apiSaga = async (url, body, auth) => {
  const json = await apiRequest(url, body)
  if (json.error || json.errors) {
    console.log('error')
  } else {
    auth.set(json.user.email, json.authenticationToken)
  }
}

export const apiSignUp = (body, auth) => apiSaga(SIGNUP_URL, body, auth)
export const apiSignIn = (body, auth) => apiSaga(SIGNIN_URL, body, auth)
