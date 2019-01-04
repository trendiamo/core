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
    if (options && options.enqueueSnackbar) options.enqueueSnackbar('Network Error', { variant: 'error' })
    return false
  }
  if (response.status === 403 || response.status === 401) {
    auth.clear()
    throw new Error('Invalid Credentials')
  }
  if (response.status >= 500) {
    if (options && options.enqueueSnackbar) options.enqueueSnackbar('Server Error', { variant: 'error' })
    return false
  }
  if (response.status >= 400) {
    if (response.status !== 422) {
      // not displaying snackbar for 422, as it'll be handled via error forms
      if (options && options.enqueueSnackbar) options.enqueueSnackbar('Bad Request', { variant: 'error' })
    }
    return false
  }
  if (options && options.successMessage && options.successVariant && options.enqueueSnackbar) {
    options.enqueueSnackbar(options.successMessage, { variant: options.successVariant })
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

export const apiRequest = async (requestMethod, args, options) => {
  const promise = args.length === 0 ? requestMethod() : requestMethod(...args)
  const response = await promise.catch(() => ({ json: () => ({ error: 'network error' }) }))
  console.log('response', response)
  const success = handleStatus(response, options)
  console.log('success', success)
  const json = success ? await response.json() : { error: 'Bad Request' }
  console.log('json', json)
  console.log('requestMethod.name', requestMethod.name, listRequestsExceptions.includes(requestMethod.name))
  const result = listRequestsExceptions.includes(requestMethod.name)
    ? { json, count: success ? extractCountFromHeaders(response.headers) : 0 }
    : json
  console.log('result', result)
  return result
}
