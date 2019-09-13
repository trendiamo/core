import getFrekklsConfig from 'frekkls-config'
import { isPCAssessment, recallSeller } from 'special/assessment/utils'
import { isSmall } from 'utils'
import { location } from 'config'
import { pushPath } from './flow-history'
import { routes } from 'plugin-base'

export const resolveHash = () => {
  const result = {}
  if (!location.hash) return result
  const match = /trnd:([^&]+)/.exec(location.hash)
  if (!match) return result
  match[1].split(',').forEach(pairStr => {
    const matches = /(.+):(.+)/.exec(pairStr)
    const key = matches[1] === 'persona' ? 'seller' : matches[1] // support old urls using 'persona'
    result[key] = matches[2]
  })
  return result
}

export const optionsFromHash = () => {
  const result = resolveHash()
  window.__trendiamoOptionsFromHash = getFrekklsConfig().processOptions(result)
  return window.__trendiamoOptionsFromHash
}

const getMatchedSeller = ({ flow, data }) => {
  if (data.seller) return data.seller
  if (data.launcher && data.launcher.seller) return data.launcher.seller
  if (isPCAssessment() && flow.flowType === 'outro' && recallSeller()) return recallSeller()
  if (flow) return flow.seller || flow.owner
}

const setup = (data, pathFromNav) => {
  const { /* seller,*/ open: openOpt, path: pathOpt, picture } = optionsFromHash()
  const { flow, type: flowType } = { flow: data.flow, type: data.flowType || data.flow.flowType }
  const open = pathFromNav ? true : isSmall() ? false : openOpt && openOpt.match(/1|true/)

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
    seller: getMatchedSeller({ flow, data }),
  }
}

export default setup
