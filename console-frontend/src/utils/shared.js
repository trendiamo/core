export const BASE_API_URL = `${process.env.REACT_APP_API_ENDPOINT || ''}/api/v1`

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

export const getSlug = () => window.location.pathname.split('/')[1]
