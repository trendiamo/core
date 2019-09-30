import auth from 'auth'
import routes from 'app/routes'
import {
  apiAccountCreate,
  apiAccountDestroy,
  apiAccountList,
  apiAccountsShow,
  apiAffiliationCreate,
  apiAffiliationDestroy,
  apiAffiliationsList,
  apiBrandsAutocomplete,
  apiBrandsList,
  apiConnectStripe,
  apiEventList,
  apiFlowsAutocomplete,
  apiFlowsList,
  apiGeneratedUrlCreate,
  apiGeneratedUrlList,
  apiGetRemoteImage,
  apiGetSignedUrlFactory,
  apiImageCreate,
  apiImageDestroy,
  apiImageList,
  apiMe,
  apiMeDetails,
  apiMeReferrals,
  apiMeRequestUpgrade,
  apiMeUpdate,
  apiMeUpdateDetails,
  apiOrdersList,
  apiOutroCreate,
  apiOutroDestroy,
  apiOutroDuplicate,
  apiOutroList,
  apiOutroShow,
  apiOutroUpdate,
  apiPasswordChange,
  apiPathAutocomplete,
  apiSellerCreate,
  apiSellerDestroy,
  apiSellerList,
  apiSellersAutocomplete,
  apiSellerShow,
  apiSellerUpdate,
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
  apiSimpleChatReject,
  apiSimpleChatShow,
  apiSimpleChatSubmit,
  apiSimpleChatUpdate,
  apiTriggerCreate,
  apiTriggerDestroy,
  apiTriggerList,
  apiTriggerShow,
  apiTriggerSort,
  apiTriggerUpdate,
  apiUserDestroy,
  apiUserInvite,
  apiUserList,
  apiWebsiteSettingsShow,
  apiWebsiteSettingsUpdate,
  apiWebsiteShow,
  apiWebsiteUpdate,
} from './auth-requests'
import {
  apiGetCsrfToken,
  apiPasswordEmailLink,
  apiPasswordReset,
  apiSignIn,
  apiSignUp,
  apiSignUpWithInvite,
} from './requests'
import { extractErrors } from 'utils/shared'
import { parse } from 'query-string'

export { apiGetCsrfToken, apiPasswordEmailLink, apiPasswordReset, apiSignIn, apiSignUp, apiSignUpWithInvite }
export {
  apiAccountList,
  apiAccountCreate,
  apiAccountDestroy,
  apiAccountsShow,
  apiAffiliationsList,
  apiAffiliationCreate,
  apiAffiliationDestroy,
  apiBrandsAutocomplete,
  apiBrandsList,
  apiConnectStripe,
  apiEventList,
  apiShowcaseCreate,
  apiShowcaseDestroy,
  apiShowcaseDuplicate,
  apiShowcaseList,
  apiShowcaseShow,
  apiShowcaseUpdate,
  apiFlowsList,
  apiGetRemoteImage,
  apiGetSignedUrlFactory,
  apiMe,
  apiMeReferrals,
  apiMeDetails,
  apiMeUpdateDetails,
  apiMeRequestUpgrade,
  apiMeUpdate,
  apiOrdersList,
  apiOutroCreate,
  apiOutroDestroy,
  apiOutroDuplicate,
  apiOutroList,
  apiOutroShow,
  apiOutroUpdate,
  apiPasswordChange,
  apiPathAutocomplete,
  apiSellerCreate,
  apiSellerDestroy,
  apiSellerList,
  apiSellerShow,
  apiSellerUpdate,
  apiSellersAutocomplete,
  apiImageCreate,
  apiImageDestroy,
  apiImageList,
  apiFlowsAutocomplete,
  apiSignOut,
  apiSimpleChatCreate,
  apiSimpleChatDestroy,
  apiSimpleChatDuplicate,
  apiSimpleChatList,
  apiSimpleChatReject,
  apiSimpleChatShow,
  apiSimpleChatSubmit,
  apiSimpleChatUpdate,
  apiTriggerCreate,
  apiTriggerDestroy,
  apiTriggerList,
  apiTriggerShow,
  apiTriggerUpdate,
  apiTriggerSort,
  apiGeneratedUrlCreate,
  apiGeneratedUrlList,
  apiUserDestroy,
  apiUserInvite,
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
  if (auth.isAffiliate()) return true
  const accounts = localStorage.getItem('accounts')
  const accountsObject = accounts && JSON.parse(accounts)
  const accurate = accountsObject && !Object.keys(accountsObject).find(itemKey => !accountsObject[itemKey])

  if (!auth.isLoggedIn() || accurate) {
    return true
  }
  apiSignOut()
}

export const changeFavicon = src => {
  const documentHead = document.head || (document.head = document.getElementsByTagName('head')[0])
  let link = document.createElement('link')
  link.rel = 'icon'
  link.type = 'image/png'
  link.href = src
  const oldLink = document.querySelector("link[rel*='icon']")
  if (oldLink) {
    documentHead.removeChild(oldLink)
  }
  documentHead.appendChild(link)
}

const isProduction = process.env.NODE_ENV === 'production'

export const showUpToUsBranding = () => {
  if (isProduction) {
    return ['app.uptous.co', 'app-staging.uptous.co'].includes(window.location.hostname)
  }
  if (parse(window.location.search).branding) {
    return parse(window.location.search).branding === 'uptous'
  }
  return process.env.REACT_APP_BRANDING === 'uptous'
}

export const loadFonts = () => {
  const documentHead = document.head || (document.head = document.getElementsByTagName('head')[0])
  const fontsUrl = showUpToUsBranding()
    ? 'https://fonts.googleapis.com/css?family=Lato:400,700|Nunito+Sans:300,400,900&display=swap'
    : 'https://fonts.googleapis.com/css?family=Roboto:300,500,700'

  const defaultFont = showUpToUsBranding() ? 'Nunito Sans' : 'Roboto'

  const css = `@import url('${fontsUrl}');
  body {
    font-family: '${defaultFont}', 'Helvetica', 'Arial', sans-serif;
  }
  `

  const linkElement = document.createElement('style')
  linkElement.type = 'text/css'
  linkElement.appendChild(document.createTextNode(css))
  documentHead.appendChild(linkElement)
}

const trendiamoEmailDomains = /@(trendiamo\.com)|(uptous\.co)|(frekkls\.com)/g
export const isTrendiamoUser = () => !!auth.getUser().email.match(trendiamoEmailDomains)
