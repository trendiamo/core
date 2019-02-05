import data from './data'
import Launcher from 'app/launcher'
import mixpanel from 'ext/mixpanel'
import NowadaysBase from './base'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { AppBase } from 'app'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'
import { matchUrl } from 'plugin-base'
import { optionsFromHash } from 'app/setup'

const Nowadays = ({ module, onToggleContent, showingContent }) => (
  <AppBase
    Component={<NowadaysBase module={module} />}
    Launcher={Launcher}
    onToggleContent={onToggleContent}
    persona={module.launcher.persona}
    showingContent={showingContent}
  />
)

export default compose(
  withProps({
    trigger: data.triggers.find(e => matchUrl(location.pathname, e.pathname)),
  }),
  withProps(({ trigger }) => ({
    module: trigger && trigger.module,
  })),
  branch(({ module }) => console.log(module) || !module, renderNothing),
  withState('showingContent', 'setShowingContent', false),
  lifecycle({
    componentDidMount() {
      const { setShowingContent } = this.props
      const autoOpen = optionsFromHash().open
      mixpanel.track('ht Loaded Plugin', {
        autoOpen,
        flowType: 'ht',
        hash: location.hash,
        hostname: location.hostname,
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
