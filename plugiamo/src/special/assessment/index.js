import Base from './base'
import data from './data'
import Launcher from 'app/launcher'
import mixpanel from 'ext/mixpanel'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { AppBase } from 'app'
import { branch, compose, lifecycle, renderNothing, withProps, withState } from 'recompose'
import { getScrollbarWidth, isSmall } from 'utils'
import { h } from 'preact'
import { matchUrl } from 'plugin-base'

const Plugin = ({
  showingLaucher,
  isUnmounting,
  step,
  steps,
  goToNextStep,
  module,
  onToggleContent,
  setShowingLauncher,
  setPluginState,
  setShowingContent,
  showingContent,
  launcherType,
  stepIndex,
  depth,
  tags,
  showingCtaButton,
}) => (
  <AppBase
    Component={
      <Base
        depth={depth}
        goToNextStep={goToNextStep}
        setPluginState={setPluginState}
        setShowingContent={setShowingContent}
        setShowingLauncher={setShowingLauncher}
        showingCtaButton={showingCtaButton}
        step={step}
        stepIndex={stepIndex}
        steps={steps}
        tags={tags}
      />
    }
    data={module}
    isUnmounting={isUnmounting}
    Launcher={showingLaucher && Launcher}
    launcherType={launcherType}
    onToggleContent={onToggleContent}
    persona={module.launcher.persona}
    showingContent={showingContent}
  />
)

export default compose(
  withState('pluginState', 'setPluginState', 'default'),
  withProps(({ pluginState }) => ({
    trigger: data[process.env.ASSESSMENT || location.hostname].triggers.find(
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
  withState('showingContent', 'setShowingContent', ({ showingContent }) => showingContent),
  withState('showingLaucher', 'setShowingLauncher', true),
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
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(Plugin)
