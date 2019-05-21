import getFrekklsConfig from 'frekkls-config'
import { assessmentHack, recallPersona } from 'special/assessment/utils'
import { isSmall } from 'utils'
import { location } from 'config'
import { pushPath } from './flow-history'
import { routes } from 'plugin-base'

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

const getMatchedPersona = ({ flow, data }) => {
  if (data.persona) return data.persona
  if (assessmentHack() && flow.flowType === 'outro' && recallPersona()) return recallPersona()
  if (flow) return flow.persona
}

const setup = (data, pathFromNav) => {
  const { /* persona,*/ open: openOpt, path: pathOpt, picture } = optionsFromHash()
  const { flow, type: flowType } = { flow: data.flow, type: data.flow.flowType }
  const open = pathFromNav ? true : isSmall() ? false : (openOpt && openOpt.match(/1|true/)) || flowType === 'outro'

  if (picture) getFrekklsConfig().addPicture(picture)

  window.__trndInitialPath = pathFromNav
    ? pathFromNav
    : pathOpt
    ? pathOpt
    : flow
    ? routes[flowType](flow.id)
    : undefined
  if (window.__trndInitialPath && !pathFromNav) pushPath(window.__trndInitialPath)

  return {
    flowType,
    open,
    persona: getMatchedPersona({ flow, data }),
  }
}

export default setup
