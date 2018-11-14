import addPicture from './add-picture'
import history from 'ext/history'
import routes from 'app/routes'
import { location } from 'config'
import { matchUrl } from 'ext/simple-router'

export const optionsFromHash = () => {
  if (!window.__trendiamoOptionsFromHash) {
    const result = {}
    if (!location.hash) return result
    const match = /trnd:([^&]+)/.exec(location.hash)
    if (!match) return result
    match[1].split(',').forEach(pairStr => {
      const matches = /(.+):(.+)/.exec(pairStr)
      result[matches[1]] = matches[2]
    })
    window.__trendiamoOptionsFromHash = result
  }
  return window.__trendiamoOptionsFromHash
}

const getMatchedFlow = flows => {
  const matchedFlow = flows
    .sort((a, b) => a.order - b.order)
    .find(flow =>
      flow.urlMatchers.some(urlMatcher => urlMatcher.regexp === '*' || matchUrl(location.pathname, urlMatcher.regexp))
    )
  if (matchedFlow && matchedFlow.curation) {
    return { flow: matchedFlow.curation, type: 'curation' }
  } else if (matchedFlow.chat) {
    return { flow: matchedFlow.chat, type: 'scriptedChat' }
  } else if (matchedFlow.success) {
    return { flow: matchedFlow.success, type: 'success' }
  }
}

const getMatchedInfluencer = ({ flow, data }) => {
  if (data.influencer) return data.influencer
  // XXX: maybe also save last influencer we interacted with, and use that if available here, finally fallback to this:
  if (flow) return flow.influencer
}

const setup = data => {
  const { /* influencer,*/ open, path, picture } = optionsFromHash()
  const { flow, type: flowType } = getMatchedFlow(data.hostname.website.flows)

  if (picture) addPicture(picture)

  if (path) {
    history.replace(path)
  } else if (flow) {
    history.replace(routes[flowType](flow.id))
  }

  return {
    influencer: getMatchedInfluencer({ flow, data }),
    open: open && open.match(/1|true/),
  }
}

export default setup
