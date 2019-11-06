const endpoint = window.location.hostname.match(/uptous\.co$/)
  ? process.env.REACT_APP_U2U_API_ENDPOINT
  : process.env.REACT_APP_API_ENDPOINT

export const BASE_API_URL = `${endpoint || ''}/api/v1`

export const CURRENCY_SYMBOLS = {
  EUR: '€',
  GBP: '£',
  CHF: 'CHF',
  USD: '$',
}

const mapErrors = json => {
  return json.errors.map(error => error.title).join(', ')
}

const errorMessages = json => {
  if (json.error) {
    return json.error
  } else {
    return typeof json === 'object' && Array.isArray(json.errors) ? mapErrors(json) : 'Something went wrong!'
  }
}

export const extractErrors = json => {
  if (!json || (!json.errors && !json.error)) return false
  const message = errorMessages(json)
  return { message, status: 'error' }
}
