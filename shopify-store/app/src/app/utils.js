export const $ = document.querySelector.bind(document)
export const $$ = (selector, callback) => Array.prototype.map.call(document.querySelectorAll(selector), callback)

// export const formatMoney = amountInCents =>
//   amountInCents ? (amountInCents / 100).toLocaleString('de-DE', { currency: 'EUR', style: 'currency' }) : ''
