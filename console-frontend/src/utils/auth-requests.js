import auth from 'auth'
import omitDeep from 'ext/lodash/omit-deep'
import { BASE_API_URL, convertToInfo } from './shared'
import { stringify } from 'query-string'

const S3_URL = `${process.env.REACT_APP_API_ENDPOINT || ''}/s3/sign`
const PERSONAS_URL = `${BASE_API_URL}/personas`
const OUTROS_URL = `${BASE_API_URL}/outros`
const CURATIONS_URL = `${BASE_API_URL}/curations`
const SCRIPTED_CHATS_URL = `${BASE_API_URL}/scripted_chats`
const TRIGGERS_URL = `${BASE_API_URL}/triggers`
const ME_URL = `${BASE_API_URL}/me`
const WEBSITES_URL = `${BASE_API_URL}/websites`
const FLOWS_URL = `${BASE_API_URL}/flows`
const SIGNOUT_URL = `${BASE_API_URL}/users/sign_out`
const PASSWORD_CHANGE_URL = `${BASE_API_URL}/users/change_password`
const CHAT_STEPS_URL = `${BASE_API_URL}/chat_steps`

const filterBody = body => omitDeep(body, key => key.startsWith('__') || key === 'label')

const authFetch = async (url, params) => {
  const result = await fetch(url, params)
  if (result.status === 403 || result.status === 401) {
    auth.clear()
    return {}
  }
  return result
}

const apiDestroyRequest = async url => {
  const res = await authFetch(url, {
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'delete',
  })
  return res.json()
}

const apiDestroyMultipleRequest = async (url, body) => {
  const res = await authFetch(url, {
    body: JSON.stringify(filterBody(body)),
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'delete',
  })
  return res.json()
}

const apiCreateRequest = async (url, body) => {
  const res = await authFetch(url, {
    body: JSON.stringify(filterBody(body)),
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'post',
  })
  return res.json()
}

const apiUpdateRequest = async (url, body) => {
  const res = await authFetch(url, {
    body: JSON.stringify(filterBody(body)),
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'put',
  })
  return res.json()
}

const apiGetRequest = async url => {
  const res = await authFetch(url, {
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })
  return res.json()
}

const apiListRequest = async url => {
  const res = await authFetch(url, {
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      ...auth.getHeaders(),
    }),
    method: 'get',
  })
  const json = await res.json()
  const count = parseInt(
    res.headers
      .get('content-range')
      .split('/')
      .pop(),
    10
  )
  return {
    json,
    count,
  }
}

const apiSignoutSaga = async url => {
  const json = await apiDestroyRequest(url)
  const info = convertToInfo(json)
  if (info.status === 'success') return auth.clear()
  console.error('Error on Logout!')
}

const apiPasswordChangeSaga = async (url, body, setInfo) => {
  const json = await apiUpdateRequest(url, body)
  const info = convertToInfo(json)
  if (info.status === 'error') {
    setInfo(info)
  }
  return info.status !== 'error'
}

export const apiGetSignedUrlFactory = type => (file, callback) =>
  authFetch(
    `${S3_URL}?${stringify({
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

export const apiPasswordChange = (body, setInfo) => apiPasswordChangeSaga(PASSWORD_CHANGE_URL, body, setInfo)
export const apiSignOut = () => apiSignoutSaga(SIGNOUT_URL)

export const apiWebsiteShow = id => apiGetRequest(`${WEBSITES_URL}/${id}`)
export const apiWebsiteUpdate = (id, body) => apiUpdateRequest(`${WEBSITES_URL}/${id}`, body)

export const apiMe = () => apiGetRequest(ME_URL)
export const apiMeUpdate = body => apiUpdateRequest(ME_URL, body)

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

export const apiCurationList = query => apiListRequest(`${CURATIONS_URL}/?${stringify(query)}`)
export const apiCurationDestroy = body => apiDestroyMultipleRequest(CURATIONS_URL, body)
export const apiCurationCreate = body => apiCreateRequest(CURATIONS_URL, body)
export const apiCurationShow = id => apiGetRequest(`${CURATIONS_URL}/${id}`)
export const apiCurationUpdate = (id, body) => apiUpdateRequest(`${CURATIONS_URL}/${id}`, body)

export const apiScriptedChatList = query => apiListRequest(`${SCRIPTED_CHATS_URL}/?${stringify(query)}`)
export const apiScriptedChatDestroy = body => apiDestroyMultipleRequest(SCRIPTED_CHATS_URL, body)
export const apiScriptedChatCreate = body => apiCreateRequest(SCRIPTED_CHATS_URL, body)
export const apiScriptedChatShow = id => apiGetRequest(`${SCRIPTED_CHATS_URL}/${id}`)
export const apiScriptedChatUpdate = (id, body) => apiUpdateRequest(`${SCRIPTED_CHATS_URL}/${id}`, body)

export const apiTriggerList = () => apiGetRequest(TRIGGERS_URL)
export const apiTriggerDestroy = body => apiDestroyMultipleRequest(TRIGGERS_URL, body)
export const apiTriggerCreate = body => apiCreateRequest(TRIGGERS_URL, body)
export const apiTriggerShow = id => apiGetRequest(`${TRIGGERS_URL}/${id}`)
export const apiTriggerUpdate = (id, body) => apiUpdateRequest(`${TRIGGERS_URL}/${id}`, body)
export const apiTriggerSort = body => apiCreateRequest(`${TRIGGERS_URL}/sort`, body)

export const apiFlowsList = () => apiGetRequest(FLOWS_URL)
export const apiFlowsAutocomplete = query => apiGetRequest(`${FLOWS_URL}/autocomplete/?${stringify(query)}`)

export const apiChatStepsAutocomplete = query => apiGetRequest(`${CHAT_STEPS_URL}/autocomplete/?${stringify(query)}`)
