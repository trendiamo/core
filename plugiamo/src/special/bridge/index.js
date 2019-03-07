import Base from './base'
import data from './data'
import Launcher from 'app/launcher'
import mixpanel from 'ext/mixpanel'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { AppBase } from 'app'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { getScrollbarWidth, isSmall } from 'utils'
import { h } from 'preact'
import { matchUrl, timeout } from 'plugin-base'

const Plugin = ({ isUnmounting, module, onToggleContent, setPluginState, showingContent, launcherType }) => (
  <AppBase
    Component={<Base module={module} setPluginState={setPluginState} />}
    data={module}
    isUnmounting={isUnmounting}
    Launcher={Launcher}
    launcherType={launcherType}
    onToggleContent={onToggleContent}
    persona={module.launcher.persona}
    showingContent={showingContent}
  />
)

export default compose(
  withState('pluginState', 'setPluginState', 'default'),
  withProps(({ pluginState }) => ({
    trigger: data[process.env.HACKATHON || location.hostname].triggers.find(
      trigger =>
        (trigger.state || 'default') === pluginState &&
        trigger.urlMatchers.some(urlMatcher => matchUrl(location.pathname, urlMatcher))
    ),
  })),
  withProps(({ trigger }) => ({
    module: trigger && trigger.module,
  })),
  branch(({ module }) => !module, renderNothing),
  branch(({ module }) => module.flowType === 'ht-nothing', renderNothing),
  withState('isUnmounting', 'setIsUnmounting', false),
  withState('showingContent', 'setShowingContent', false),
  lifecycle({
    componentDidMount() {
      const { module, setShowingContent } = this.props
      const autoOpen = isSmall() ? false : module.flowType === 'ht-chat'
      mixpanel.track('Loaded Plugin', {
        autoOpen,
        flowType: module.flowType,
        hash: location.hash,
        hostname: location.hostname,
      })
      if (autoOpen) setShowingContent(true)
    },
    componentWillUnmount() {
      timeout.clear('exitOnMobile')
    },
    componentDidUpdate(prevProps) {
      const { showingContent } = this.props
      if (showingContent === prevProps.showingContent) return

      if (getScrollbarWidth() > 0) {
        if (showingContent) {
          document.documentElement.classList.add('trnd-open')
        } else {
          document.documentElement.classList.remove('trnd-open')
        }
      }
    },
  }),
  withProps(({ module }) => ({
    launcherType: module.flowType === 'ht-outro' ? 'original' : 'pulsating',
  })),
  withHandlers({
    onToggleContent: ({ module, setIsUnmounting, setShowingContent, showingContent, pluginState }) => () => {
      if (module.flowType !== 'ht-chat') return
      mixpanel.track('Toggled Plugin', {
        hostname: location.hostname,
        action: showingContent ? 'close' : 'open',
        pluginState,
      })
      mixpanel.time_event('Toggled Plugin')

      if (showingContent && isSmall()) {
        setIsUnmounting(true)
        return timeout.set(
          'exitOnMobile',
          () => {
            setIsUnmounting(false)
            setShowingContent(false)
          },
          400
        )
      }
      return setShowingContent(!showingContent)
    },
  }),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(Plugin)
