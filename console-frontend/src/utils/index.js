import auth from 'auth'
import routes from 'app/routes'
import {
  apiAccountCreate,
  apiAccountDestroy,
  apiAccountList,
  apiAccountsShow,
  apiEventList,
  apiFlowsAutocomplete,
  apiFlowsList,
  apiGeneratedUrlCreate,
  apiGeneratedUrlList,
  apiGetRemotePicture,
  apiGetSignedUrlFactory,
  apiMe,
  apiMeUpdate,
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
  apiPictureCreate,
  apiPictureDestroy,
  apiPictureList,
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
  apiUserCreate,
  apiUserDestroy,
  apiUserList,
  apiWebsiteSettingsShow,
  apiWebsiteSettingsUpdate,
  apiWebsiteShow,
  apiWebsiteUpdate,
} from './auth-requests'
import { apiGetCsrfToken, apiPasswordEmailLink, apiPasswordReset, apiSignIn, apiSignUp } from './requests'
import { extractErrors } from 'utils/shared'

export { apiGetCsrfToken, apiPasswordEmailLink, apiPasswordReset, apiSignIn, apiSignUp }
export {
  apiAccountList,
  apiAccountCreate,
  apiAccountDestroy,
  apiAccountsShow,
  apiEventList,
  apiShowcaseCreate,
  apiShowcaseDestroy,
  apiShowcaseDuplicate,
  apiShowcaseList,
  apiShowcaseShow,
  apiShowcaseUpdate,
  apiFlowsList,
  apiGetRemotePicture,
  apiGetSignedUrlFactory,
  apiMe,
  apiMeUpdate,
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
  apiPersonaShow,
  apiPersonaUpdate,
  apiPersonasAutocomplete,
  apiPictureCreate,
  apiPictureDestroy,
  apiPictureList,
  apiFlowsAutocomplete,
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
  apiUserCreate,
  apiUserDestroy,
  apiUserList,
  apiWebsiteShow,
  apiWebsiteUpdate,
  apiWebsiteSettingsShow,
  apiWebsiteSettingsUpdate,
}

const handleRequestError = async (response, isLoginRequest) => {
  if (!response) return { requestError: 'Network Error' }
  if (response.status === 403 || response.status === 401) {
    if (isLoginRequest) {
      return { requestError: undefined }
    } else {
      await apiSignOut()
      auth.clear()
      throw new Error('Invalid Credentials')
    }
  }
  if (response.status === 409) {
    return { requestError: 'Conflict: Please take note of your changes, reload and submit again.' }
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

export const apiRequest = async (requestMethod, args, options) => {
  const promise = args.length === 0 ? requestMethod() : requestMethod(...args)
  const response = await promise.catch(() => null)
  const { requestError } = await handleRequestError(response, options && options.isLoginRequest)
  const json = requestError
    ? null
    : response.headers.get('content-type').startsWith('image')
    ? await response.blob()
    : await response.json()
  const errors = extractErrors(json)
  return { json, requestError, errors, response }
}

export const atLeastOneNonBlankCharInputProps = { pattern: '.*\\S+.*' }
export const youtubeInputProps = { pattern: '^\\S*(youtu.be/|v/|u/w/|embed/|watch\\?v=|&v=|\\?v=)([^#&?]*).*' }

export const defaultSorting = { column: 'active', direction: 'asc' }

// refreshRoute goes to "/empty", and replaces that history entry by the original route,
// remounting the original component
export const refreshRoute = (history, route, query) => {
  history.push(routes.nullRoute())
  history.replace(route, query)
}

export const isLocalStorageAccurate = () => {
  const accounts = localStorage.getItem('accounts')
  const accountsObject = accounts && JSON.parse(accounts)
  const accurate = accountsObject && !Object.keys(accountsObject).find(itemKey => !accountsObject[itemKey])

  if (!auth.isLoggedIn() || accurate) {
    return true
  }
  apiSignOut()
}
