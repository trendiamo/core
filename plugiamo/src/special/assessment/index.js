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
  withState('assessmentDepth', 'setAssessmentDepth', 0),
  withState('currentStepKey', 'setCurrentStepKey', 'root'),
  withState('tags', 'setTags', []),
  withState('stepIndex', 'setStepIndex', 0),
  withProps(({ trigger }) => ({
    module: trigger && trigger.module,
  })),
  withProps(({ assessmentDepth, module, currentStepKey }) => ({
    step: module && module.steps[currentStepKey],
    steps: module && module.steps,
    depth: assessmentDepth,
  })),
  branch(({ module }) => !module, renderNothing),
  branch(({ module }) => module.flowType === 'ht-nothing', renderNothing),
  withState('endNodeTags', 'setEndNodeTags', []),
  withState('isUnmounting', 'setIsUnmounting', false),
  withState('showingContent', 'setShowingContent', false),
  withState('showingLaucher', 'setShowingLauncher', true),
  withState('showingCtaButton', 'setShowingCtaButton', false),
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
      timeout.clear('loadingProgressBar')
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
    handleEndNodeTags: ({ showingCtaButton, endNodeTags, setEndNodeTags, setShowingCtaButton }) => step => {
      let newTags
      if (showingCtaButton) {
        if (!endNodeTags.includes(step.title)) newTags = [...endNodeTags, step.title]
        else {
          newTags = endNodeTags.filter(tag => tag !== step.title)
          if (newTags.length === 0) setShowingCtaButton(false)
        }
      } else {
        newTags = [...endNodeTags, step.title]
        setShowingCtaButton(true)
      }
      return setEndNodeTags(newTags)
    },
    goToStore: ({ endNodeTags, stepIndex, tags, setStepIndex, setTags, setCurrentStepKey }) => () => {
      setStepIndex(stepIndex + 1)
      setTags(endNodeTags.map(tag => [...tags, tag]))
      setCurrentStepKey('store')
    },
    resetAssessment: ({
      setTags,
      setEndNodeTags,
      setCurrentStepKey,
      setStepIndex,
      setAssessmentDepth,
      setShowingCtaButton,
    }) => () => {
      setTags([])
      setEndNodeTags([])
      setCurrentStepKey('root')
      setStepIndex(0)
      setAssessmentDepth(0)
      setShowingCtaButton(false)
    },
  }),
  withHandlers({
    onToggleContent: ({
      module,
      setIsUnmounting,
      setShowingContent,
      showingContent,
      pluginState,
      resetAssessment,
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
      resetAssessment()
      return setShowingContent(!showingContent)
    },
    goToNextStep: ({
      steps,
      setAssessmentDepth,
      setCurrentStepKey,
      setStepIndex,
      stepIndex,
      setTags,
      tags,
      handleEndNodeTags,
      goToStore,
    }) => step => {
      if (step.url)
        return setStepIndex(
          stepIndex + 1,
          timeout.set('loadingProgressBar', () => (window.location.href = step.url), 600)
        )
      if (step.endNode) return handleEndNodeTags(step)
      if (step === 'showResults') return goToStore()
      setStepIndex(stepIndex + 1)
      setTags([...tags, step.title])
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
