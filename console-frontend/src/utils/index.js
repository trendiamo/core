import auth from 'auth'
import {
  apiFlowsAutocomplete,
  apiFlowsList,
  apiGetSignedUrlFactory,
  apiMe,
  apiMeUpdate,
  apiNavigationCreate,
  apiNavigationDestroy,
  apiNavigationList,
  apiNavigationShow,
  apiNavigationUpdate,
  apiOutroCreate,
  apiOutroDestroy,
  apiOutroList,
  apiOutroShow,
  apiOutroUpdate,
  apiPasswordChange,
  apiPersonaCreate,
  apiPersonaDestroy,
  apiPersonaList,
  apiPersonasAutocomplete,
  apiPersonaShow,
  apiPersonaUpdate,
  apiScriptedChatCreate,
  apiScriptedChatDestroy,
  apiScriptedChatList,
  apiScriptedChatShow,
  apiScriptedChatUpdate,
  apiShowcaseCreate,
  apiShowcaseDestroy,
  apiShowcaseList,
  apiShowcaseShow,
  apiShowcaseUpdate,
  apiSignOut,
  apiTriggerCreate,
  apiTriggerDestroy,
  apiTriggerList,
  apiTriggerShow,
  apiTriggerSort,
  apiTriggerUpdate,
  apiWebsiteShow,
  apiWebsiteUpdate,
} from './auth-requests'
import { apiGetCsrfToken, apiPasswordEmailLink, apiPasswordReset, apiSignIn } from './requests'
import { includes } from 'lodash'

export { apiGetCsrfToken, apiPasswordEmailLink, apiPasswordReset, apiSignIn }
export {
  apiShowcaseCreate,
  apiShowcaseDestroy,
  apiShowcaseList,
  apiShowcaseShow,
  apiShowcaseUpdate,
  apiFlowsList,
  apiGetSignedUrlFactory,
  apiMe,
  apiMeUpdate,
  apiOutroCreate,
  apiOutroDestroy,
  apiOutroList,
  apiOutroShow,
  apiOutroUpdate,
  apiNavigationCreate,
  apiNavigationDestroy,
  apiNavigationList,
  apiNavigationShow,
  apiNavigationUpdate,
  apiPasswordChange,
  apiPersonaCreate,
  apiPersonaDestroy,
  apiScriptedChatUpdate,
  apiPersonaList,
  apiPersonaShow,
  apiPersonaUpdate,
  apiPersonasAutocomplete,
  apiFlowsAutocomplete,
  apiScriptedChatDestroy,
  apiScriptedChatList,
  apiScriptedChatShow,
  apiScriptedChatCreate,
  apiSignOut,
  apiTriggerCreate,
  apiTriggerDestroy,
  apiTriggerList,
  apiTriggerShow,
  apiTriggerUpdate,
  apiTriggerSort,
  apiWebsiteShow,
  apiWebsiteUpdate,
}

const handleStatus = (response, options) => {
  if (!response.status) {
    options.enqueueSnackbar('Network Error', { variant: 'error' })
    return false
  }
  if (response.status === 403 || response.status === 401) {
    auth.clear()
    throw new Error('Invalid Credentials')
  }
  const exceptionsStatusCodes = [400, 401, 403, 422]
  if (options && options.enqueueSnackbar && !includes(exceptionsStatusCodes, response.status)) {
    if (response.status >= 500) {
      options.enqueueSnackbar('Server Error', { variant: 'error' })
      return false
    } else if (response.status >= 400 && response.status < 500) {
      options.enqueueSnackbar('Bad Request', { variant: 'error' })
      return false
    } else if (response.status >= 200 && response.status < 400 && options.successMessage && options.successVariant) {
      options.enqueueSnackbar(options.successMessage, { variant: options.successVariant })
    }
  }
  return true
}

const extractCountFromHeaders = headers =>
  parseInt(
    headers
      .get('content-range')
      .split('/')
      .pop(),
    10
  )

const listRequestsExceptions = [
  'apiNavigationList',
  'apiScriptedChatList',
  'apiShowcaseList',
  'apiOutroList',
  'apiPersonaList',
]

export const apiRequest = async (request, args, options) => {
  const promise = args.length === 0 ? request() : request(...args)
  const response = await promise.catch(() => ({ error: 'network error' }))
  const success = handleStatus(response, options)
  const json = success ? await response.json() : { error: 'Bad Request' }
  return includes(listRequestsExceptions, request.name)
    ? { json, count: success ? extractCountFromHeaders(response.headers) : 0 }
    : json
}
