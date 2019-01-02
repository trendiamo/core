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

const handleStatus = (result, options) => {
  if (!result.status) {
    options.enqueueSnackbar('Network Error', { variant: 'error' })
    return false
  }
  if (result.status === 403 || result.status === 401) {
    auth.clear()
    throw new Error('Invalid Credentials')
  }
  const exceptionsStatusCodes = [400, 401, 403, 422]
  if (options && options.enqueueSnackbar && !includes(exceptionsStatusCodes, result.status)) {
    if (result.status >= 500) {
      options.enqueueSnackbar('Server Error', { variant: 'error' })
      return false
    } else if (result.status >= 400 && result.status < 500) {
      options.enqueueSnackbar('Bad Request', { variant: 'error' })
      return false
    } else if (result.status >= 200 && result.status < 300 && options.successMessage && options.successVariant) {
      options.enqueueSnackbar(options.successMessage, { variant: options.successVariant })
      return false
    }
  }
  return true
}

const listRequest = async result => {
  const json = await result.json()
  const count = parseInt(
    result.headers
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

export const apiRequest = async (request, args, options) => {
  const method = args.length === 0 ? request() : request(...args)
  const result = await method.catch(() => ({ error: 'network error' }))
  const success = handleStatus(result, options)
  if (!success) return result
  const listRequestsExceptions = [
    'apiNavigationList',
    'apiScriptedChatList',
    'apiShowcaseList',
    'apiOutroList',
    'apiPersonaList',
  ]
  return includes(listRequestsExceptions, request.name) ? listRequest(result) : await result.json()
}
