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

// XXX: we'll remove this method after changing the fetching logic of flows, triggers, path, etc.
const getFlowFromPath = (flows, path) => {
  const match = path.match(/\/(.+)\/(.+)/)
  if (match && match.length < 3) return {}
  const idFromPath = path.match(/\/(.+)\/(.+)/)[2]
  for (let i = 0; i < flows.length; i++) {
    const flow = flows[i]
    if (flow.curation && flow.curation.id === idFromPath) return { flow: flow.curation, type: 'curation' }
    if (flow.chat && flow.chat.id === idFromPath) return { flow: flow.chat, type: 'scriptedChat' }
    if (flow.success && flow.success.id === idFromPath) return { flow: flow.success, type: 'success' }
  }
  return {}
}

const getMatchedInfluencer = ({ flow, data }) => {
  if (data.influencer) return data.influencer
  // XXX: maybe also save last influencer we interacted with, and use that if available here, finally fallback to this:
  if (flow) return flow.influencer
}

const setup = data => {
  const { /* persona,*/ open, path, picture } = optionsFromHash()
  const { flow, type: flowType } = path
    ? getFlowFromPath(data.hostname.website.flows, path)
    : getMatchedFlow(data.hostname.website.flows)

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
