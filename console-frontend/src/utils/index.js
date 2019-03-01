import auth from 'auth'
import {
  apiFlowsAutocomplete,
  apiFlowsList,
  apiGeneratedUrlCreate,
  apiGeneratedUrlList,
  apiGetSignedUrlFactory,
  apiMe,
  apiMeUpdate,
  apiNavigationCreate,
  apiNavigationDestroy,
  apiNavigationDuplicate,
  apiNavigationList,
  apiNavigationShow,
  apiNavigationUpdate,
  apiOutroCreate,
  apiOutroDestroy,
  apiOutroDuplicate,
  apiOutroList,
  apiOutroShow,
  apiOutroUpdate,
  apiPasswordChange,
  apiPathAutocomplete,
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
  apiShowcaseDuplicate,
  apiShowcaseList,
  apiShowcaseShow,
  apiShowcaseUpdate,
  apiSignOut,
  apiSimpleChatCreate,
  apiSimpleChatDestroy,
  apiSimpleChatDuplicate,
  apiSimpleChatList,
  apiSimpleChatShow,
  apiSimpleChatUpdate,
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
import { extractErrors } from 'utils/shared'

export { apiGetCsrfToken, apiPasswordEmailLink, apiPasswordReset, apiSignIn }
export {
  apiShowcaseCreate,
  apiShowcaseDestroy,
  apiShowcaseDuplicate,
  apiShowcaseList,
  apiShowcaseShow,
  apiShowcaseUpdate,
  apiFlowsList,
  apiGetSignedUrlFactory,
  apiMe,
  apiMeUpdate,
  apiOutroCreate,
  apiOutroDestroy,
  apiOutroDuplicate,
  apiOutroList,
  apiOutroShow,
  apiOutroUpdate,
  apiNavigationCreate,
  apiNavigationDestroy,
  apiNavigationDuplicate,
  apiNavigationList,
  apiNavigationShow,
  apiNavigationUpdate,
  apiPasswordChange,
  apiPathAutocomplete,
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
  apiSimpleChatCreate,
  apiSimpleChatDestroy,
  apiSimpleChatDuplicate,
  apiSimpleChatList,
  apiSimpleChatShow,
  apiSimpleChatUpdate,
  apiTriggerCreate,
  apiTriggerDestroy,
  apiTriggerList,
  apiTriggerShow,
  apiTriggerUpdate,
  apiTriggerSort,
  apiGeneratedUrlCreate,
  apiGeneratedUrlList,
  apiWebsiteShow,
  apiWebsiteUpdate,
}

const handleRequestError = response => {
  if (!response) {
    return { requestError: 'Network Error' }
  }
  if (response.status === 403 || response.status === 401) {
    auth.clear()
    throw new Error('Invalid Credentials')
  }
  if (response.status >= 500) {
    return { requestError: 'Server Error' }
  }
  if (response.status >= 400 && response.status !== 422) {
    // not displaying snackbar for 422, as it'll be handled via error forms
    return { requestError: 'Bad Request' }
  }
  return { requestError: undefined }
}

export const apiRequest = async (requestMethod, args) => {
  const promise = args.length === 0 ? requestMethod() : requestMethod(...args)
  const response = await promise.catch(() => null)
  const { requestError } = handleRequestError(response)
  const json = requestError ? {} : await response.json()
  const errors = extractErrors(json)
  return { json, requestError, errors, response }
}
