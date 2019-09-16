import auth from 'auth'
import omitDeep from 'ext/lodash/omit-deep'
import { BASE_API_URL } from './shared'
import { stringify } from 'query-string'

const S3_URL = `${BASE_API_URL}/s3/sign`
const SELLERS_URL = `${BASE_API_URL}/sellers`
const IMAGES_URL = `${BASE_API_URL}/images`
const OUTROS_URL = `${BASE_API_URL}/outros`
const CURATIONS_URL = `${BASE_API_URL}/showcases`
const SIMPLE_CHATS_URL = `${BASE_API_URL}/simple_chats`
const TRIGGERS_URL = `${BASE_API_URL}/triggers`
const ME_URL = `${BASE_API_URL}/me`
const WEBSITES_URL = `${BASE_API_URL}/websites`
const WEBSITE_SETTINGS_URL = `${BASE_API_URL}/website_settings`
const FLOWS_URL = `${BASE_API_URL}/flows`
const SIGNOUT_URL = `${BASE_API_URL}/users/sign_out`
const PASSWORD_CHANGE_URL = `${BASE_API_URL}/users/change_password`
const ONBOARDING_URL = `${BASE_API_URL}/users/onboarding`
const GENERATED_URLS_URL = `${BASE_API_URL}/generated_urls`
const PATH_URL = `${BASE_API_URL}/path`
const ACCOUNTS_URL = `${BASE_API_URL}/accounts`
const USERS_URL = `${BASE_API_URL}/users`
const CORS_PROXY_URL = `${BASE_API_URL}/cors_proxy`
const EVENTS_URL = `${BASE_API_URL}/events`
const BRANDS_URL = `${BASE_API_URL}/brands`
const AFFILIATIONS_URL = `${BASE_API_URL}/affiliations`

const filterBody = body => omitDeep(body, key => key.startsWith('__'))

const authFetch = async (url, options, isUntenanted = false) =>
  await fetch(url, {
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(isUntenanted),
    }),
    ...options,
  })

const apiDestroyRequest = async url =>
  await authFetch(url, {
    method: 'delete',
  })

const apiDestroyMultipleRequest = async (url, body) =>
  await authFetch(url, {
    body: JSON.stringify(filterBody(body)),
    method: 'delete',
  })

const apiCreateRequest = async (url, body, isUntenanted = false) =>
  await authFetch(
    url,
    {
      body: JSON.stringify(filterBody(body)),
      method: 'post',
    },
    isUntenanted
  )

const apiUpdateRequest = async (url, body) =>
  await authFetch(url, {
    body: JSON.stringify(filterBody(body)),
    method: 'put',
  })

const apiGetRequest = async url =>
  await authFetch(url, {
    method: 'get',
  })

const apiListRequest = async url =>
  await authFetch(url, {
    method: 'get',
  })

const apiPostRequest = async url =>
  await authFetch(url, {
    method: 'post',
  })

const apiPutRequest = async url =>
  await authFetch(url, {
    method: 'put',
  })

export const apiSignOut = async () => {
  const result = await apiDestroyRequest(SIGNOUT_URL)
  const json = await result.json()
  if (!json.errors && !json.error) return auth.clear()
  console.error('Error on Logout!')
}

export const apiGetSignedUrlFactory = (isUntenanted = false) => (file, callback) =>
  authFetch(
    `${S3_URL}?${stringify({
      content_type: file.type,
      object_name: file.name,
    })}`,
    {
      redirect: 'error',
    },
    isUntenanted
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
    .catch(callback)

export const apiPasswordChange = body => apiUpdateRequest(PASSWORD_CHANGE_URL, body)

export const apiWebsiteShow = id => apiGetRequest(`${WEBSITES_URL}/${id}`)
export const apiWebsiteUpdate = (id, body) => apiUpdateRequest(`${WEBSITES_URL}/${id}`, body)

export const apiWebsiteSettingsShow = () => apiGetRequest(WEBSITE_SETTINGS_URL)
export const apiWebsiteSettingsUpdate = (id, body) => apiUpdateRequest(`${WEBSITE_SETTINGS_URL}/${id}`, body)

export const apiMe = () => apiGetRequest(ME_URL)
export const apiMeUpdate = body => apiUpdateRequest(ME_URL, body)
export const apiMeReferrals = () => apiGetRequest(`${ME_URL}/referrals`)
export const apiMeRequestUpgrade = () => apiPostRequest(`${ME_URL}/request_upgrade`)
export const apiOnboardingSet = body => apiUpdateRequest(ONBOARDING_URL, body)

export const apiSellerList = query => apiListRequest(`${SELLERS_URL}/?${stringify(query)}`)
export const apiSellerShow = id => apiGetRequest(`${SELLERS_URL}/${id}`)
export const apiSellerCreate = body => apiCreateRequest(SELLERS_URL, body)
export const apiSellerUpdate = (id, body) => apiUpdateRequest(`${SELLERS_URL}/${id}`, body)
export const apiSellerDestroy = body => apiDestroyMultipleRequest(SELLERS_URL, body)
export const apiSellersAutocomplete = query => apiGetRequest(`${SELLERS_URL}/autocomplete/?${stringify(query)}`)

export const apiImageList = query => apiListRequest(`${IMAGES_URL}/?${stringify(query)}`)
export const apiImageCreate = (body, isUntenanted = false) => apiCreateRequest(IMAGES_URL, body, isUntenanted)
export const apiImageDestroy = body => apiDestroyMultipleRequest(IMAGES_URL, body)

export const apiGetRemoteImage = url => apiGetRequest(`${CORS_PROXY_URL}/${encodeURIComponent(url)}`)

export const apiOutroList = query => apiListRequest(`${OUTROS_URL}/?${stringify(query)}`)
export const apiOutroDestroy = body => apiDestroyMultipleRequest(OUTROS_URL, body)
export const apiOutroCreate = body => apiCreateRequest(OUTROS_URL, body)
export const apiOutroShow = id => apiGetRequest(`${OUTROS_URL}/${id}`)
export const apiOutroUpdate = (id, body) => apiUpdateRequest(`${OUTROS_URL}/${id}`, body)
export const apiOutroDuplicate = id => apiPostRequest(`${OUTROS_URL}/${id}/duplicate`)

export const apiShowcaseList = query => apiListRequest(`${CURATIONS_URL}/?${stringify(query)}`)
export const apiShowcaseDestroy = body => apiDestroyMultipleRequest(CURATIONS_URL, body)
export const apiShowcaseCreate = body => apiCreateRequest(CURATIONS_URL, body)
export const apiShowcaseShow = id => apiGetRequest(`${CURATIONS_URL}/${id}`)
export const apiShowcaseUpdate = (id, body) => apiUpdateRequest(`${CURATIONS_URL}/${id}`, body)
export const apiShowcaseDuplicate = id => apiPostRequest(`${CURATIONS_URL}/${id}/duplicate`)

export const apiSimpleChatList = query => apiListRequest(`${SIMPLE_CHATS_URL}/?${stringify(query)}`)
export const apiSimpleChatDestroy = body => apiDestroyMultipleRequest(SIMPLE_CHATS_URL, body)
export const apiSimpleChatCreate = body => apiCreateRequest(SIMPLE_CHATS_URL, body)
export const apiSimpleChatShow = id => apiGetRequest(`${SIMPLE_CHATS_URL}/${id}`)
export const apiSimpleChatUpdate = (id, body) => apiUpdateRequest(`${SIMPLE_CHATS_URL}/${id}`, body)
export const apiSimpleChatDuplicate = id => apiPostRequest(`${SIMPLE_CHATS_URL}/${id}/duplicate`)
export const apiSimpleChatSubmit = (id, body) => apiUpdateRequest(`${SIMPLE_CHATS_URL}/${id}/submit`, body)
export const apiSimpleChatReject = id => apiPutRequest(`${SIMPLE_CHATS_URL}/${id}/reject`)

export const apiTriggerList = () => apiGetRequest(TRIGGERS_URL)
export const apiTriggerDestroy = body => apiDestroyMultipleRequest(TRIGGERS_URL, body)
export const apiTriggerCreate = body => apiCreateRequest(TRIGGERS_URL, body)
export const apiTriggerShow = id => apiGetRequest(`${TRIGGERS_URL}/${id}`)
export const apiTriggerUpdate = (id, body) => apiUpdateRequest(`${TRIGGERS_URL}/${id}`, body)
export const apiTriggerSort = body => apiCreateRequest(`${TRIGGERS_URL}/sort`, body)

export const apiGeneratedUrlList = () => apiGetRequest(GENERATED_URLS_URL)
export const apiGeneratedUrlCreate = body => apiCreateRequest(GENERATED_URLS_URL, body)

export const apiFlowsList = () => apiGetRequest(FLOWS_URL)
export const apiFlowsAutocomplete = query => apiGetRequest(`${FLOWS_URL}/autocomplete/?${stringify(query)}`)

export const apiBrandsList = query => apiGetRequest(`${BRANDS_URL}/?${stringify(query)}`)
export const apiBrandsAutocomplete = query => apiGetRequest(`${BRANDS_URL}/autocomplete/?${stringify(query)}`)

export const apiPathAutocomplete = query => apiGetRequest(`${PATH_URL}/autocomplete/?${stringify(query)}`)

export const apiAccountList = query => apiGetRequest(`${ACCOUNTS_URL}/?${stringify(query)}`)
export const apiAccountCreate = body => apiCreateRequest(ACCOUNTS_URL, body)
export const apiAccountsShow = slug => apiGetRequest(`${ACCOUNTS_URL}/${slug}`)
export const apiAccountDestroy = slug => apiDestroyRequest(`${ACCOUNTS_URL}/${slug}`)

export const apiUserList = query => apiListRequest(`${USERS_URL}/?${stringify(query)}`)
export const apiUserDestroy = body => apiDestroyMultipleRequest(USERS_URL, body)
export const apiUserInvite = body => apiCreateRequest(`${USERS_URL}/invites`, body)

export const apiAffiliationsList = query => apiListRequest(`${AFFILIATIONS_URL}/${stringify(query)}`)
export const apiAffiliationCreate = body => apiCreateRequest(AFFILIATIONS_URL, body)

export const apiEventList = query => apiGetRequest(`${EVENTS_URL}/?${stringify(query)}`)
