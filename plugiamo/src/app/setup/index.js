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

// XXX: we'll remove this method after changing the fetching logic of flows, triggers, path, etc.
const getFlowFromPath = (triggers, path) => {
  const match = path.match(/\/(.+)\/(.+)/)
  if (match && match.length < 3) return {}
  const idFromPath = path.match(/\/(.+)\/(.+)/)[2]
  for (let i = 0; i < triggers.length; i++) {
    const trigger = triggers[i]
    if (trigger.curation && trigger.curation.id === idFromPath) return { flow: trigger.curation, type: 'curation' }
    if (trigger.scriptedChat && trigger.scriptedChat.id === idFromPath)
      return { flow: trigger.scriptedChat, type: 'scriptedChat' }
    if (trigger.outro && trigger.outro.id === idFromPath) return { flow: trigger.outro, type: 'outro' }
  }
  return {}
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
  const { flow, type: flowType } = path
    ? getFlowFromPath(data.hostname.website.triggers, path)
    : getFlowFromTriggers(data.hostname.website.triggers)

  if (picture) addPicture(picture)

  if (path) {
    history.replace(path)
  } else if (flow) {
    history.replace(routes[flowType](flow.id))
  }

  return {
    persona: getMatchedPersona({ flow, data }),
    open: open && open.match(/1|true/),
  }
}

export default setup
