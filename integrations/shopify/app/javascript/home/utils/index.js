const BASE_API_URL = process.env.BASE_API_URL
const ENABLE_SHOP_URL = `${BASE_API_URL}/shop/enable`
const CURRENT_SHOP_URL = `${BASE_API_URL}/shop`

export const getCsrfToken = () => {
  const meta = document.getElementsByTagName('meta')['csrf-token']
  return meta && meta.getAttribute('content')
}

const authFetch = async (url, options) =>
  await fetch(url, {
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': getCsrfToken(),
    }),
    ...options,
  })

const apiPutRequest = async url =>
  await authFetch(url, {
    method: 'put',
  })

const apiGetRequest = async url =>
  await authFetch(url, {
    method: 'get',
  })

export const apiEnableApp = async () => {
  const result = await apiPutRequest(ENABLE_SHOP_URL)
  const json = await result.json().catch(() => null)
  return json
}

export const apiCurrentShop = async () => {
  const result = await apiGetRequest(CURRENT_SHOP_URL)
  const json = await result.json().catch(() => null)
  return json
}
