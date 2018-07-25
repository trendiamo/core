import { entry } from 'index'

const baseApiUrl = `https://${process.env.API_ENDPOINT}/api/v1`
const SIGNUP_URL = `${baseApiUrl}/users/sign_up`
const SIGNIN_URL = `${baseApiUrl}/users/sign_in`

// export const isCurrentUser = user => user.email === localStorage.getItem('authEmail')

// let isRedirectingToLogin = false
// const handleAuthLost = () => {
//   if (isRedirectingToLogin) return
//   isRedirectingToLogin = true
//   // auth.clear()
//   setTimeout(() => {
//     alert('Please login again')
//   }, 1)
// }

// export const authGql = async action => {
//   try {
//     await action()
//   } catch (e) {
//     if (/You are not authorized to perform this action/.test(e.message)) {
//       handleAuthLost()
//     }
//   }
// }

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

export const authRedirect = () => {
  history.pushState({}, 'Account', '/u/account')
  entry()
}

export const apiSaga = async (url, body, auth, setErrors) => {
  const json = await apiRequest(url, body)
  if (json.error || json.errors) {
    setErrors(errorMessages(json))
  } else {
    auth.set(json.user.email, json.authenticationToken)
    authRedirect()
  }
}

export const apiSignUp = (body, auth, setErrors) => apiSaga(SIGNUP_URL, body, auth, setErrors)
export const apiSignIn = (body, auth, setErrors) => apiSaga(SIGNIN_URL, body, auth, setErrors)
