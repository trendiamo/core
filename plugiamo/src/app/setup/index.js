import addPicture from './add-picture'
import routes from 'app/routes'
import { isGraphCMS, location } from 'config'
import { isSmall } from 'utils'
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

// XXX: we'll remove this method after changing the fetching logic of flows, triggers, path, etc.
const getFlowFromPath = (triggers, path) => {
  const idFromPath = getFlowIdFromPath(path)
  if (!idFromPath) return
  for (let i = 0; i < triggers.length; i++) {
    const trigger = triggers[i]
    if (trigger.curation && trigger.curation.id === idFromPath) return { flow: trigger.curation, type: 'curation' }
    if (trigger.scriptedChat && trigger.scriptedChat.id === idFromPath)
      return { flow: trigger.scriptedChat, type: 'scriptedChat' }
    if (trigger.outro && trigger.outro.id === idFromPath) return { flow: trigger.outro, type: 'outro' }
  }
  return {}
}

const getFlowIdFromPath = path => {
  const match = path.match(/\/(.+)\/(.+)/)
  if (match && match.length < 3) return null
  return path.match(/\/(.+)\/(.+)/)[2]
}

const getFlowFromTriggers = triggers => {
  const trigger = triggers
    .sort((a, b) => a.order - b.order)
    .find(trigger =>
      trigger.urlMatchers.some(
        urlMatcher => urlMatcher.regexp === '*' || matchUrl(location.pathname, urlMatcher.regexp)
      )
    )
  if (!trigger) return {}
  if (trigger.curation) return { flow: trigger.curation, type: 'curation' }
  if (trigger.scriptedChat) return { flow: trigger.scriptedChat, type: 'scriptedChat' }
  if (trigger.outro) return { flow: trigger.outro, type: 'outro' }
}

const getMatchedPersona = ({ flow, data }) => {
  if (data.persona) return data.persona
  // XXX: maybe also save last persona we interacted with, and use that if available here, finally fallback to this:
  if (flow) return flow.persona
}

const setup = data => {
  const { /* persona,*/ open, path, picture } = optionsFromHash()
  const { flow, type: flowType } = isGraphCMS
    ? path
      ? getFlowFromPath(data.hostname.website.triggers, path)
      : getFlowFromTriggers(data.hostname.website.triggers)
    : { flow: data.flow, type: data.flow.flowType }

  if (picture) addPicture(picture)

  window.__trndInitialPath = path ? path : flow ? routes[flowType](flow.id) : undefined

  return {
    flowType,
    open: !!(open && open.match(/1|true/) && !isSmall()),
    persona: getMatchedPersona({ flow, data }),
  }
}

export default setup
