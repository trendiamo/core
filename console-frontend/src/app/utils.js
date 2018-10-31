import auth from './auth'
import qs from 'querystring'

const S3_URL = `${process.env.REACT_APP_API_ENDPOINT || ''}/s3/sign`

export const getSignedUrlFactory = type => (file, callback) =>
  fetch(
    `${S3_URL}?${qs.stringify({
      content_type: file.type,
      object_name: file.name,
      type,
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
