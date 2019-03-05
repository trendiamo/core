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

const Plugin = ({
  isUnmounting,
  step,
  steps,
  goToNextStep,
  module,
  onToggleContent,
  setPluginState,
  showingContent,
  launcherType,
}) => (
  <AppBase
    Component={<Base goToNextStep={goToNextStep} setPluginState={setPluginState} step={step} steps={steps} />}
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
  withState('stepIndex', 'setStepIndex', 0),
  withProps(({ trigger }) => ({
    module: trigger && trigger.module,
  })),
  withProps(({ module, stepIndex }) => ({
    step: module && { ...module.steps[stepIndex], index: stepIndex },
    steps: module && module.steps,
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
    onToggleContent: ({
      setStepIndex,
      module,
      setIsUnmounting,
      setShowingContent,
      showingContent,
      pluginState,
    }) => () => {
      if (module.flowType !== 'ht-chat' && module.flowType !== 'ht-assessment-steps') return
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
      // reset assessment on plugin close
      setStepIndex(0)
      return setShowingContent(!showingContent)
    },
    goToNextStep: ({ stepIndex, setStepIndex, steps }) => option => {
      if (stepIndex >= steps.length - 1) return
      setStepIndex(stepIndex + 1)
      // TODO: Scoring system based on option
    },
  }),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(Plugin)
