import Chat from './chat'
import Container from 'app/content/scripted-chat/components/base-container'
import data from './data'
import mixpanel from 'ext/mixpanel'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'
import { matchUrl, timeout } from 'plugin-base'

const Base = ({ getContentRef, animateOpacity, ...props }) => (
  <Container animateOpacity={animateOpacity} contentRef={getContentRef}>
    <Chat contentRef={getContentRef} {...props} />
  </Container>
)

export default compose(
  withState('pluginState', 'setPluginState', 'default'),
  withState('animateOpacity', 'setAnimateOpacity', ({ animateOpacity }) => animateOpacity),
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
  withState('currentStepKey', 'setCurrentStepKey', 'root'),
  withState('assessmentDepth', 'setAssessmentDepth', 0),
  withProps(({ assessmentDepth, module, currentStepKey }) => ({
    step: module && module.steps[currentStepKey],
    steps: module && module.steps,
    depth: assessmentDepth,
  })),
  withState('coverMinimized', 'setCoverMinimized', ({ step }) => !!step.header.minimized),
  withState('touch', 'setTouch', true),
  withState('currentStep', 'setCurrentStep', ({ step }) => step),
  withState('tags', 'setTags', []),
  withState('stepIndex', 'setStepIndex', 0),
  withState('endNodeTags', 'setEndNodeTags', []),
  withState('showingCtaButton', 'setShowingCtaButton', false),
  withHandlers(() => {
    let contentRef
    return {
      setContentRef: () => ref => (contentRef = ref),
      getContentRef: () => () => contentRef,
    }
  }),
  withHandlers({
    handleScroll: ({ setCoverMinimized, getContentRef, coverMinimized, step, setTouch, touch }) => event => {
      if (step.header.minimized) return
      const scrollTop = event.target.scrollTop
      if (scrollTop <= 0 && coverMinimized) {
        setTouch(false)
        setTimeout(() => {
          setTouch(true)
        }, 50)
        return setCoverMinimized(false)
      }
      if (scrollTop > 0 && !coverMinimized && touch) {
        const windowHeight = window.innerHeight
        const maxHeight = window.innerWidth >= 600 ? Math.min(windowHeight, 500) : windowHeight
        maxHeight - getContentRef().base.scrollHeight <= 90 && setCoverMinimized(true)
      }
    },
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
    goToStore: ({ endNodeTags, stepIndex, tags, setStepIndex, setTags, setCurrentStepKey }) => currentStepKey => {
      setStepIndex(stepIndex + 1)
      setTags(endNodeTags.map(tag => [...tags, tag]))
      mixpanel.track('Clicked Assessment Step', {
        hostname: location.hostname,
        stepIndex,
        step: currentStepKey,
        tags: endNodeTags,
      })
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
      currentStepKey,
    }) => step => {
      if (step.url) {
        mixpanel.track('Clicked Assessment Step', {
          hostname: location.hostname,
          stepIndex,
          step: currentStepKey,
          url: step.url,
        })
        return setStepIndex(
          stepIndex + 1,
          timeout.set('loadingProgressBar', () => (window.location.href = step.url), 600)
        )
      }
      if (step.endNode) return handleEndNodeTags(step)
      if (step === 'showResults') return goToStore(currentStepKey)
      setStepIndex(stepIndex + 1)
      setTags([...tags, step.title])
      mixpanel.track('Clicked Assessment Step', {
        hostname: location.hostname,
        stepIndex,
        step: currentStepKey,
        tags: [step.title],
      })
      if (step.endNode) return setCurrentStepKey('store')
      // if depth declared in the step, set depth. Used in progress bar
      if (steps[step.title].depth) setAssessmentDepth(steps[step.title].depth)
      setCurrentStepKey(step.title)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { step, setCurrentStep, animateOpacity, setAnimateOpacity } = this.props
      if (animateOpacity) {
        setTimeout(() => {
          setAnimateOpacity(false)
        }, 10)
      }
      setCurrentStep(step)
    },
    componentWillUnmount() {
      timeout.clear('exitOnMobile')
      timeout.clear('loadingProgressBar')
    },
    componentDidUpdate(prevProps) {
      const { step, setCurrentStep } = this.props
      if (prevProps.step !== step) {
        setTimeout(
          () => {
            setCurrentStep(step)
          },
          prevProps.step ? 750 : 0
        )
      }
    },
  })
)(Base)
