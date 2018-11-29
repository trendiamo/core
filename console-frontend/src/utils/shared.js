import auth from 'auth'

export const BASE_API_URL = `${process.env.REACT_APP_API_ENDPOINT || ''}/api/v1`

const defaultErrorMessage = 'Something went wrong!'

const mapErrors = json => {
  return Array.isArray(json.errors) ? json.errors.map(error => error.title).join(', ') : defaultErrorMessage
}

const checkAuth = json => (json.errors || []).find(error => error.title === 'Invalid email or token')

const errorMessages = json => {
  if (json.error) {
    return 'Invalid Credentials'
  } else {
    return typeof json === 'object' ? mapErrors(json) : defaultErrorMessage
  }
}

// Converts the input (json) to an object where the status keyword is always present.
// Simplifies the use in the <Notification /> component
export const convertToInfo = (json, defaultMessage) => {
  defaultMessage = defaultMessage || 'Success!'
  const hasError = json.errors || json.error
  const status = hasError ? 'error' : 'success'
  const message = hasError ? errorMessages(json) : defaultMessage
  const isAuthError = hasError ? checkAuth(json) : false
  return isAuthError ? auth.clear() : { message, status }
}

export const extractErrors = json => {
  if (!json.errors && !json.error) return false
  const message = errorMessages(json)
  return { message, status: 'error' }
}
