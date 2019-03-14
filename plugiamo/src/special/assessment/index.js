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
}) => (
  <AppBase
    Component={
      <Base
        depth={depth}
        goToNextStep={goToNextStep}
        setPluginState={setPluginState}
        setShowingContent={setShowingContent}
        setShowingLauncher={setShowingLauncher}
        step={step}
        stepIndex={stepIndex}
        steps={steps}
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
  withState('stepIndex', 'setStepIndex', 0),
  withState('assessmentDepth', 'setAssessmentDepth', 0),
  withState('currentStepKey', 'setCurrentStepKey', 'root'),
  withProps(({ trigger }) => ({
    module: trigger && trigger.module,
  })),
  withProps(({ assessmentDepth, module, currentStepKey, stepIndex }) => ({
    step: module && { ...module.steps[currentStepKey], index: stepIndex },
    steps: module && module.steps,
    depth: assessmentDepth,
  })),
  branch(({ module }) => !module, renderNothing),
  branch(({ module }) => module.flowType === 'ht-nothing', renderNothing),
  withState('isUnmounting', 'setIsUnmounting', false),
  withState('showingContent', 'setShowingContent', false),
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
      setCurrentStepKey,
      module,
      setIsUnmounting,
      setShowingContent,
      showingContent,
      pluginState,
      setStepIndex,
      setAssessmentDepth,
    }) => () => {
      if (module.flowType !== 'ht-chat' && module.flowType !== 'ht-assessment') return
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
      setCurrentStepKey('root')
      setStepIndex(0)
      setAssessmentDepth(0)
      return setShowingContent(!showingContent)
    },
    goToNextStep: ({ steps, setAssessmentDepth, setCurrentStepKey, setStepIndex, stepIndex }) => step => {
      setStepIndex(stepIndex + 1)
      if (step.endNode) return setCurrentStepKey('store')
      // if depth declared in the step, set depth. Used in progress bar
      if (steps[step.title].depth) setAssessmentDepth(steps[step.title].depth)
      setCurrentStepKey(step.title)
    },
  }),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(Plugin)
