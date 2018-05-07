export const $ = document.querySelector.bind(document)
export const $$ = (selector, callback) => Array.prototype.map.call(document.querySelectorAll(selector), callback)

const domain = process.env.API_ENDPOINT
export const baseApiUrl = `https://${domain}/api/v1`
export const gqlApiUrl = `https://${domain}/graphql`

export const isLoggedIn = () => {
  return localStorage.getItem('authEmail') && localStorage.getItem('authToken')
}

export const authHeaders = () => ({
  'X-USER-EMAIL': localStorage.getItem('authEmail'),
  'X-USER-TOKEN': localStorage.getItem('authToken'),
})

export const authSuccess = (authToken, authEmail) => {
  localStorage.setItem('authToken', authToken)
  localStorage.setItem('authEmail', authEmail)
}

export const removeAuth = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('authEmail')
}

export const isCurrentUser = user => user.email === localStorage.getItem('authEmail')

let isRedirectingToLogin = false

const handleAuthLost = () => {
  if (isRedirectingToLogin) return
  isRedirectingToLogin = true
  removeAuth()
  setTimeout(() => {
    alert('Please login again')
  }, 1)
}

export const authGql = async action => {
  try {
    await action()
  } catch (e) {
    if (/You are not authorized to perform this action/.test(e.message)) {
      handleAuthLost()
    }
  }
}

export const formatMoney = amountInCents =>
  amountInCents ? (amountInCents / 100).toLocaleString('de-DE', { currency: 'EUR', style: 'currency' }) : ''

const post = (path, params, method = 'post') => {
  const form = document.createElement('form')
  form.setAttribute('method', method)
  form.setAttribute('action', path)

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input')
      hiddenField.setAttribute('type', 'hidden')
      hiddenField.setAttribute('name', key)
      hiddenField.setAttribute('value', params[key])

      form.appendChild(hiddenField)
    }
  }

  document.body.appendChild(form)
  form.submit()
}

export const addToCart = variantId => {
  post('/cart/add', { id: variantId, return_to: 'back' })
}
