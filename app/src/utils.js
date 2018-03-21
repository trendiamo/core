export const $ = document.querySelector.bind(document)
export const $$ = (selector, callback) => Array.prototype.map.call(document.querySelectorAll(selector), callback)

export const getMetadata = () => $('.metadata').dataset

const domain = process.env.API_ENDPOINT
export const baseApiUrl = `https://${domain}/api/v1`
export const gqlApiUrl = `https://${domain}/graphql`

export const isLoggedIn = () => {
  return $('.metadata').dataset.userEmail && localStorage.getItem('authToken')
}

export const authHeaders = () => {
  const userEmail = $('.metadata').dataset.userEmail
  const authToken = localStorage.getItem('authToken')
  return {
    'X-USER-EMAIL': userEmail,
    'X-USER-TOKEN': authToken,
  }
}

let isRedirectingToLogin = false

const handleAuthLost = () => {
  if (isRedirectingToLogin) return
  isRedirectingToLogin = true
  localStorage.removeItem('authToken')
  setTimeout(() => {
    alert('Please login again')
    window.location = '/account/login'
  }, 1)
}

export const authFetch = async (url, options) => {
  const response = await fetch(url, {
    ...options,
    headers: new Headers({
      ...authHeaders(),
      'Content-Type': 'application/json',
    }),
  })
  if (response.status === 401) {
    handleAuthLost()
  }
  return response
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
