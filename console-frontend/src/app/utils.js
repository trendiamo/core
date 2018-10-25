import auth from './auth'
import qs from 'querystring'

export const getSignedUrl = (file, callback) => {
  return fetch(
    `https://${process.env.REACT_APP_API_ENDPOINT}/s3/sign?${qs.stringify({
      content_type: file.type,
      object_name: file.name,
    })}`,
    {
      headers: new Headers({
        'Content-Type': 'application/json',
        ...auth.getHeaders(),
      }),
      redirect: 'error',
    }
  )
    .then(response => response.json())
    .then(json => {
      if (json.error) {
        throw new Error(json.error)
      } else if (!json.signedUrl) {
        throw new Error('invalid server response')
      } else {
        return json
      }
    })
    .then(callback)
}
