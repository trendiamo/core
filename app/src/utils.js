export const $ = document.querySelector.bind(document)
export const $$ = (selector, callback) => Array.prototype.map.call(document.querySelectorAll(selector), callback)

export const getMetadata = () => $('.metadata').dataset

const domain = process.env.API_ENDPOINT
export const baseApiUrl = `https://${domain}/api/v1`

const authHeaders = () => {
  const consumerEmail = $('.metadata').dataset.consumerEmail
  const consumerToken = localStorage.getItem('consumerToken')
  return new Headers({
    'Content-Type': 'application/json',
    'X-CONSUMER-EMAIL': consumerEmail,
    'X-CONSUMER-TOKEN': consumerToken,
  })
}

let isRedirectingToLogin = false

export const authFetch = async (url, options) => {
  const response = await fetch(url, { ...options, headers: authHeaders() })
  if (response.status === 401 && !isRedirectingToLogin) {
    isRedirectingToLogin = true
    setTimeout(() => {
      alert('Please login again')
      window.location = '/account/login'
    }, 1)
  }
  return response
}
