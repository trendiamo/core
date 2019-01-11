import auth from 'auth'
import omitDeep from 'ext/lodash/omit-deep'
import { BASE_API_URL } from './shared'
import { stringify } from 'query-string'

const S3_URL = `${process.env.REACT_APP_API_ENDPOINT || ''}/s3/sign`
const PERSONAS_URL = `${BASE_API_URL}/personas`
const OUTROS_URL = `${BASE_API_URL}/outros`
const CURATIONS_URL = `${BASE_API_URL}/showcases`
const SPOTLIGHTS_URL = `${BASE_API_URL}/spotlights`
const SCRIPTED_CHATS_URL = `${BASE_API_URL}/scripted_chats`
const NAVIGATIONS_URL = `${BASE_API_URL}/navigations`
const NAVIGATION_ITEMS_URL = `${BASE_API_URL}/navigation_items`
const TRIGGERS_URL = `${BASE_API_URL}/triggers`
const ME_URL = `${BASE_API_URL}/me`
const WEBSITES_URL = `${BASE_API_URL}/websites`
const FLOWS_URL = `${BASE_API_URL}/flows`
const SIGNOUT_URL = `${BASE_API_URL}/users/sign_out`
const PASSWORD_CHANGE_URL = `${BASE_API_URL}/users/change_password`
const ONBOARDING_URL = `${BASE_API_URL}/users/onboarding`
const PATH_URL = `${BASE_API_URL}/path`

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

export const apiSignOut = async () => {
  const result = await apiDestroyRequest(SIGNOUT_URL)
  const json = await result.json()
  if (!json.errors && !json.error) return auth.clear()
  console.error('Error on Logout!')
}

export const apiGetSignedUrlFactory = type => (file, callback) =>
  authFetch(
    `${S3_URL}?${stringify({
      content_type: file.type,
      object_name: file.name,
      type,
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

export const apiOutroList = query => apiListRequest(`${OUTROS_URL}/?${stringify(query)}`)
export const apiOutroDestroy = body => apiDestroyMultipleRequest(OUTROS_URL, body)
export const apiOutroCreate = body => apiCreateRequest(OUTROS_URL, body)
export const apiOutroShow = id => apiGetRequest(`${OUTROS_URL}/${id}`)
export const apiOutroUpdate = (id, body) => apiUpdateRequest(`${OUTROS_URL}/${id}`, body)

export const apiShowcaseList = query => apiListRequest(`${CURATIONS_URL}/?${stringify(query)}`)
export const apiShowcaseDestroy = body => apiDestroyMultipleRequest(CURATIONS_URL, body)
export const apiShowcaseCreate = body => apiCreateRequest(CURATIONS_URL, body)
export const apiShowcaseShow = id => apiGetRequest(`${CURATIONS_URL}/${id}`)
export const apiShowcaseUpdate = (id, body) => apiUpdateRequest(`${CURATIONS_URL}/${id}`, body)

export const apiSpotlightSort = body => apiCreateRequest(`${SPOTLIGHTS_URL}/sort`, body)

export const apiScriptedChatList = query => apiListRequest(`${SCRIPTED_CHATS_URL}/?${stringify(query)}`)
export const apiScriptedChatDestroy = body => apiDestroyMultipleRequest(SCRIPTED_CHATS_URL, body)
export const apiScriptedChatCreate = body => apiCreateRequest(SCRIPTED_CHATS_URL, body)
export const apiScriptedChatShow = id => apiGetRequest(`${SCRIPTED_CHATS_URL}/${id}`)
export const apiScriptedChatUpdate = (id, body) => apiUpdateRequest(`${SCRIPTED_CHATS_URL}/${id}`, body)

export const apiNavigationList = query => apiListRequest(`${NAVIGATIONS_URL}/?${stringify(query)}`)
export const apiNavigationDestroy = body => apiDestroyMultipleRequest(NAVIGATIONS_URL, body)
export const apiNavigationCreate = body => apiCreateRequest(NAVIGATIONS_URL, body)
export const apiNavigationShow = id => apiGetRequest(`${NAVIGATIONS_URL}/${id}`)
export const apiNavigationUpdate = (id, body) => apiUpdateRequest(`${NAVIGATIONS_URL}/${id}`, body)

export const apiNavigationItemSort = body => apiCreateRequest(`${NAVIGATION_ITEMS_URL}/sort`, body)

export const apiTriggerList = () => apiGetRequest(TRIGGERS_URL)
export const apiTriggerDestroy = body => apiDestroyMultipleRequest(TRIGGERS_URL, body)
export const apiTriggerCreate = body => apiCreateRequest(TRIGGERS_URL, body)
export const apiTriggerShow = id => apiGetRequest(`${TRIGGERS_URL}/${id}`)
export const apiTriggerUpdate = (id, body) => apiUpdateRequest(`${TRIGGERS_URL}/${id}`, body)
export const apiTriggerSort = body => apiCreateRequest(`${TRIGGERS_URL}/sort`, body)

export const apiFlowsList = () => apiGetRequest(FLOWS_URL)
export const apiFlowsAutocomplete = query => apiGetRequest(`${FLOWS_URL}/autocomplete/?${stringify(query)}`)

export const apiPathAutocomplete = query => apiGetRequest(`${PATH_URL}/autocomplete/?${stringify(query)}`)
