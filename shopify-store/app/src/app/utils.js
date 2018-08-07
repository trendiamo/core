import { entry } from 'index'

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

// export const formatMoney = amountInCents =>
//   amountInCents ? (amountInCents / 100).toLocaleString('de-DE', { currency: 'EUR', style: 'currency' }) : ''
