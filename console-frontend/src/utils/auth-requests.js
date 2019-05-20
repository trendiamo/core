import auth from 'auth'
import omitDeep from 'ext/lodash/omit-deep'
import { BASE_API_URL } from './shared'
import { stringify } from 'query-string'

const S3_URL = `${BASE_API_URL}/s3/sign`
const PERSONAS_URL = `${BASE_API_URL}/personas`
const PICTURES_URL = `${BASE_API_URL}/pictures`
const OUTROS_URL = `${BASE_API_URL}/outros`
const CURATIONS_URL = `${BASE_API_URL}/showcases`
const SIMPLE_CHATS_URL = `${BASE_API_URL}/simple_chats`
const TRIGGERS_URL = `${BASE_API_URL}/triggers`
const ME_URL = `${BASE_API_URL}/me`
const WEBSITES_URL = `${BASE_API_URL}/websites`
const FLOWS_URL = `${BASE_API_URL}/flows`
const SIGNOUT_URL = `${BASE_API_URL}/users/sign_out`
const PASSWORD_CHANGE_URL = `${BASE_API_URL}/users/change_password`
const ONBOARDING_URL = `${BASE_API_URL}/users/onboarding`
const GENERATED_URLS_URL = `${BASE_API_URL}/generated_urls`
const PATH_URL = `${BASE_API_URL}/path`
const ACCOUNTS_URL = `${BASE_API_URL}/accounts`
const CORS_PROXY_URL = `${BASE_API_URL}/cors_proxy`

const filterBody = body => omitDeep(body, key => key.startsWith('__'))

const authFetch = async (url, options) =>
  await fetch(url, {
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
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

const apiCreateRequest = async (url, body) =>
  await authFetch(url, {
    body: JSON.stringify(filterBody(body)),
    method: 'post',
  })

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

export const apiSignOut = async () => {
  const result = await apiDestroyRequest(SIGNOUT_URL)
  const json = await result.json()
  if (!json.errors && !json.error) return auth.clear()
  console.error('Error on Logout!')
}

export const apiGetSignedUrlFactory = () => (file, callback) =>
  authFetch(
    `${S3_URL}?${stringify({
      content_type: file.type,
      object_name: file.name,
    })}`,
    {
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

export const apiPasswordChange = body => apiUpdateRequest(PASSWORD_CHANGE_URL, body)

export const apiWebsiteShow = id => apiGetRequest(`${WEBSITES_URL}/${id}`)
export const apiWebsiteUpdate = (id, body) => apiUpdateRequest(`${WEBSITES_URL}/${id}`, body)

export const apiMe = () => apiGetRequest(ME_URL)
export const apiMeUpdate = body => apiUpdateRequest(ME_URL, body)
export const apiOnboardingSet = body => apiUpdateRequest(ONBOARDING_URL, body)

export const apiPersonaList = query => apiListRequest(`${PERSONAS_URL}/?${stringify(query)}`)
export const apiPersonaShow = id => apiGetRequest(`${PERSONAS_URL}/${id}`)
export const apiPersonaCreate = body => apiCreateRequest(PERSONAS_URL, body)
export const apiPersonaUpdate = (id, body) => apiUpdateRequest(`${PERSONAS_URL}/${id}`, body)
export const apiPersonaDestroy = body => apiDestroyMultipleRequest(PERSONAS_URL, body)
export const apiPersonasAutocomplete = query => apiGetRequest(`${PERSONAS_URL}/autocomplete/?${stringify(query)}`)

export const apiPictureList = query => apiListRequest(`${PICTURES_URL}/?${stringify(query)}`)
export const apiPictureDestroy = body => apiDestroyMultipleRequest(PICTURES_URL, body)

export const apiGetRemotePicture = url => apiGetRequest(`${CORS_PROXY_URL}/${url}`)

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

export const apiPathAutocomplete = query => apiGetRequest(`${PATH_URL}/autocomplete/?${stringify(query)}`)

export const apiAccount = () => apiGetRequest(ACCOUNTS_URL)
export const apiAccountCreate = body => apiCreateRequest(ACCOUNTS_URL, body)
export const apiAccountDestroy = id => apiDestroyRequest(`${ACCOUNTS_URL}/${id}`)
