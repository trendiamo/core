import data from './data'
import Launcher from 'app/launcher'
import mixpanel from 'ext/mixpanel'
import NowadaysBase from './base'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { AppBase } from 'app'
import { branch, compose, lifecycle, renderNothing, withHandlers, withState } from 'recompose'
import { h } from 'preact'
import { optionsFromHash } from 'app/setup'

const Nowadays = ({ onToggleContent, showingContent }) => (
  <AppBase
    Component={<NowadaysBase showingContent={showingContent} />}
    data={data}
    Launcher={Launcher}
    onToggleContent={onToggleContent}
    persona={data.persona}
    showingContent={showingContent}
  />
)

export default compose(
  branch(() => location.pathname !== data.product.pathname, renderNothing),
  withState('showingContent', 'setShowingContent', false),
  lifecycle({
    componentDidMount() {
      const { setShowingContent } = this.props
      const autoOpen = optionsFromHash().open
      mixpanel.track('Loaded Plugin', {
        autoOpen,
        flowType: 'Nowadays',
        hash: location.hash,
        hostname: location.hostname,
        personaName: data.persona.name,
        personaRef: data.persona.id,
      })

      if (autoOpen) {
        setShowingContent(true)
      } else {
        mixpanel.time_event('Toggled Plugin')
      }
    },
  }),
  withHandlers({
    onToggleContent: ({ setShowingContent, showingContent }) => () => {
      mixpanel.track('Toggled Plugin', { hostname: location.hostname, action: showingContent ? 'close' : 'open' })
      mixpanel.time_event('Toggled Plugin')
      if (!showingContent) {
        document.documentElement.classList.add('trnd-open')
      } else {
        document.documentElement.classList.remove('trnd-open')
      }
      return setShowingContent(!showingContent)
    },
  }),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(Nowadays)
