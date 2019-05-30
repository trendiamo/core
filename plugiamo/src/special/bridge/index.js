import AppBase from 'app/base'
import ChatBase from 'app/content/scripted-chat/chat-base'
import chatLogCallbacks from 'shared/chat-log-callbacks'
import ChatModals from 'shared/chat-modals'
import data from './data'
import getFrekklsConfig from 'frekkls-config'
import Launcher from 'app/launcher'
import mixpanel from 'ext/mixpanel'
import withChatActions from 'ext/recompose/with-chat-actions'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { getScrollbarWidth, isSmall } from 'utils'
import { h } from 'preact'
import { matchUrl, SimpleChat, timeout } from 'plugin-base'

const Plugin = ({
  isUnmounting,
  showingLauncher,
  module,
  onToggleContent,
  setPluginState,
  showingContent,
  onCtaButtonClick,
  clickActions,
  modalsProps,
}) => (
  <div>
    <ChatModals flowType={module.flowType} {...modalsProps} />
    <AppBase
      Component={
        <SimpleChat
          backButtonLabel={getFrekklsConfig().i18n.backButton}
          bridge
          ChatBase={ChatBase}
          chatLogCallbacks={chatLogCallbacks}
          clickActions={clickActions}
          coverIsMinimized={module.header.minimized}
          ctaButton={module.ctaButton}
          data={module}
          onCtaButtonClick={onCtaButtonClick}
          setPluginState={setPluginState}
        />
      }
      data={module}
      isUnmounting={isUnmounting}
      Launcher={Launcher}
      launcherPulsating
      onToggleContent={onToggleContent}
      persona={module.launcher.persona}
      showingBubbles
      showingContent={showingContent}
      showingLauncher={showingLauncher}
    />
  </div>
)

export default compose(
  withState('pluginState', 'setPluginState', 'default'),
  withProps(({ pluginState }) => ({
    trigger: data[process.env.BRIDGE || location.hostname].triggers.find(
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
  withState('showingLauncher', 'setShowingLauncher', true),
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
  withHandlers({
    onCtaButtonClick: ({ module, onToggleContent, setPluginState }) => () => {
      onToggleContent()
      getFrekklsConfig().onCtaClick(module.ctaButton.action)
      if (module.ctaButton.action === 'want') {
        setPluginState('size-help')
      } else if (module.ctaButton.action === 'ok-size') {
        setPluginState('nothing')
      }
      mixpanel.track('Clicked Button', {
        flowType: module.flowType,
        hostname: location.hostname,
        type: 'CTA',
        action: module.ctaButton.action,
      })
    },
  }),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  }),
  withChatActions()
)(Plugin)
