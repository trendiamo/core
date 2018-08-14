import authFactory from 'auth'
import { entry } from 'index'
import qs from 'querystring'

export const $ = document.querySelector.bind(document)
export const $$ = (selector, callback) => Array.prototype.map.call(document.querySelectorAll(selector), callback)

// see app/router ExposeNav component.
export const navTo = path => {
  if (window.__reactRouterHistory) {
    window.__reactRouterHistory.push(path)
  } else {
    history.pushState({}, '', path)
    entry()
  }
}

export const getSignedUrl = (file, callback) => {
  const auth = authFactory()
  return fetch(
    `https://${process.env.API_ENDPOINT}/s3/sign?${qs.stringify({
      content_type: file.type,
      object_name: file.name,
    })}`,
    {
      headers: new Headers({
        'Content-Type': 'application/json',
        ...auth.headers(),
      }),
      redirect: 'error',
    }
  )
    .then(response => response.json())
    .then(json => {
      if (json.error) {
        throw json.error
      } else if (!json.signedUrl) {
        throw 'invalid server response'
      } else {
        return json
      }
    })
    .then(callback)
}

// export const formatMoney = amountInCents =>
//   amountInCents ? (amountInCents / 100).toLocaleString('de-DE', { currency: 'EUR', style: 'currency' }) : ''
