export const $ = document.querySelector.bind(document)
export const $$ = (selector, callback) => Array.prototype.map.call(document.querySelectorAll(selector), callback)

export const getMetadata = () => $('.metadata').dataset

const domain = process.env.API_ENDPOINT
export const baseApiUrl = `https://${domain}/api/v1`
export const gqlApiUrl = `https://${domain}/graphql`

export const authHeaders = () => {
  const userEmail = $('.metadata').dataset.userEmail
  const authToken = localStorage.getItem('authToken')
  return {
    'X-USER-EMAIL': userEmail,
    'X-USER-TOKEN': authToken,
  }
}

let isRedirectingToLogin = false

export const authFetch = async (url, options) => {
  const response = await fetch(url, {
    ...options,
    headers: new Headers({
      ...authHeaders(),
      'Content-Type': 'application/json',
    }),
  })
  if (response.status === 401 && !isRedirectingToLogin) {
    isRedirectingToLogin = true
    setTimeout(() => {
      alert('Please login again')
      window.location = '/account/login'
    }, 1)
  }
  return response
}
