import { authFetch, baseApiUrl } from 'utils'

const LIKES_URL = `${baseApiUrl}/likes`
const PRODUCTS_URL = `${baseApiUrl}/products`

const post = (path, params, method = 'post') => {
  const form = document.createElement('form')
  form.setAttribute('method', method)
  form.setAttribute('action', path)

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input')
      hiddenField.setAttribute('type', 'hidden')
      hiddenField.setAttribute('name', key)
      hiddenField.setAttribute('value', params[key])

      form.appendChild(hiddenField)
    }
  }

  document.body.appendChild(form)
  form.submit()
}

export const fetchLikesCount = async productId => {
  const url = `${PRODUCTS_URL}/${productId}`
  const response = await fetch(url)
  const json = await response.json()
  return json.likesCount
}

export const fetchLike = async (consumerId, productId) => {
  const url = `${LIKES_URL}/id?consumer_ref=${consumerId}&product_ref=${productId}`
  const response = await authFetch(url)
  const json = await response.json()
  return json
}

export const createLike = async (consumerId, productId) => {
  const params = {
    like: {
      consumerRef: consumerId,
      productRef: productId,
    },
  }
  const response = await authFetch(LIKES_URL, {
    body: JSON.stringify(params),
    method: 'POST',
  })
  const json = await response.json()
  return { ...json, ok: response.ok }
}

export const removeLike = async likeId => {
  const url = `${LIKES_URL}/${likeId}`
  const response = await authFetch(url, { method: 'DELETE' })
  if (response.ok) {
    return response
  } else {
    const json = await response.json()
    return json
  }
}

export const addToCart = variantId => {
  post('/cart/add', { id: variantId, return_to: 'back' })
}
