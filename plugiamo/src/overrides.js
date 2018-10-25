import { location } from './config'
import { matchUrl } from 'ext/simple-router'
import querystring from 'querystring'

const removeFbChat = () => {
  const fbRoot = document.querySelector('#fb-root')
  if (fbRoot) fbRoot.remove()
}

const overrides = () => {
  removeFbChat()

  if (location.hostname === 'www.uniplaces.com') {
    // TODO: to properly implement this, we need to allow multiple url matchers to a flow
    if (
      matchUrl(location.pathname, '/accommodation/:city/:id') ||
      matchUrl(location.pathname, '/:lang/accommodation/:city/:id')
    ) {
      return '/chat/cjnmynzkfdwgz09328tz7i6ha'
    }

    // TODO: to properly implement this, we need to have the url matchers per flow and not only per chat, also check if we can filter by query params
    if (
      matchUrl(location.pathname, '/accommodation/:city') ||
      matchUrl(location.pathname, '/:lang/accommodation/:city')
    ) {
      const queryKeys = Object.keys(querystring.parse(location.search.substr(1)))
      // console.log('query', querystring.parse(location.search.substr(1)))
      if (
        queryKeys.includes('order') ||
        queryKeys.includes('rent-type[]') ||
        queryKeys.includes('restrictions-occupancy[]') ||
        queryKeys.includes('university')
      ) {
        return '/onboarding/uniplaces/3'
      }
      return '/onboarding/uniplaces'
    }
  }
}

export default overrides
