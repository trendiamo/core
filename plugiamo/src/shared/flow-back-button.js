import getFrekklsConfig from 'frekkls-config'
import { BackButton } from 'plugin-base'
import { h } from 'preact'
import { markGoBack, shouldRenderBack } from 'app/setup/flow-history'

const onClick = () => {
  markGoBack()
  window.history.back()
}

const FlowBackButton = () => {
  if (!shouldRenderBack()) return null

  return <BackButton label={getFrekklsConfig().i18n.backButton} onClick={onClick} />
}

export default FlowBackButton
