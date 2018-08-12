import authFactory from 'auth'
import qs from 'querystring'

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
