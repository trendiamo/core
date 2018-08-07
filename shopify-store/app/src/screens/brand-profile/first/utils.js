import qs from 'querystring'

// TODO: fetchWithCredentials
export const getSignedUrl = (file, callback) =>
  fetch(
    `https://${process.env.API_ENDPOINT}/s3/sign?${qs.stringify({
      content_type: file.type,
      object_name: file.name,
    })}`,
    {
      // credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      redirect: 'error',
    }
  )
    .then(response => response.json())
    .then(callback)
