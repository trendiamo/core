import Chat from './chat'
import Container from 'app/content/scripted-chat/components/base-container'
import data from './data'
import mixpanel from 'ext/mixpanel'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'
import { rememberPersona } from './utils'
import { timeout } from 'plugin-base'

const Base = ({
  currentStep,
  endNodeTags,
  goToNextStep,
  handleScroll,
  setContentRef,
  contentRef,
  animateOpacity,
  progress,
  setShowingContent,
  setShowingLauncher,
  showingCtaButton,
  step,
  touch,
}) => (
  <Container animateOpacity={animateOpacity} contentRef={contentRef}>
    <Chat
      contentRef={contentRef}
      currentStep={currentStep}
      endNodeTags={endNodeTags}
      goToNextStep={goToNextStep}
      handleScroll={handleScroll}
      progress={progress}
      setContentRef={setContentRef}
      setShowingContent={setShowingContent}
      setShowingLauncher={setShowingLauncher}
      showingCtaButton={showingCtaButton}
      step={step}
      touch={touch}
    />
  </Container>
)

export default compose(
  withState('pluginState', 'setPluginState', 'default'),
  withState('animateOpacity', 'setAnimateOpacity', ({ animateOpacity }) => animateOpacity),
  withProps({ module: data.assessment }),
  withState('currentStepKey', 'setCurrentStepKey', 'root'),
  withProps(({ module, currentStepKey }) => ({
    step: module && module.steps[currentStepKey],
    steps: module && module.steps,
  })),
  withState('coverMinimized', 'setCoverMinimized', ({ step }) => !!step.header.minimized),
  withState('touch', 'setTouch', true),
  withState('currentStep', 'setCurrentStep', ({ step }) => step),
  withState('tags', 'setTags', []),
  withState('progress', 'setProgress', 0),
  withState('endNodeTags', 'setEndNodeTags', []),
  withState('showingCtaButton', 'setShowingCtaButton', false),
  withHandlers(() => {
    let contentRef
    return {
      setContentRef: () => ref => (contentRef = ref),
      contentRef: () => () => contentRef,
    }
  }),
  withHandlers({
    handleScroll: ({ setCoverMinimized, contentRef, coverMinimized, step, setTouch, touch }) => event => {
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
        maxHeight - contentRef().base.scrollHeight <= 90 && setCoverMinimized(true)
      }
    },
    handleEndNodeTags: ({ endNodeTags, setEndNodeTags, setShowingCtaButton, tags }) => nextStep => {
      const nextStepKey = [...tags, nextStep.title].join('/')
      const newTags = endNodeTags.includes(nextStepKey)
        ? endNodeTags.filter(tag => tag !== nextStepKey)
        : [...endNodeTags, nextStepKey]
      setShowingCtaButton(newTags.length > 0)
      return setEndNodeTags(newTags)
    },
    goToStore: ({ setProgress, setCurrentStepKey }) => () => {
      setProgress(100)
      setCurrentStepKey('store')
    },
    resetAssessment: ({ setTags, setEndNodeTags, setCurrentStepKey, setStepIndex, setShowingCtaButton }) => () => {
      setTags([])
      setEndNodeTags([])
      setCurrentStepKey('root')
      setStepIndex(0)
      setShowingCtaButton(false)
    },
  }),
  withHandlers({
    goToNextStep: ({
      endNodeTags,
      steps,
      setCurrentStepKey,
      setProgress,
      setTags,
      tags,
      handleEndNodeTags,
      step,
      goToStore,
      progress,
      currentStepKey,
    }) => nextStep => {
      if (nextStep.url) {
        mixpanel.track('Clicked Assessment Step', {
          hostname: location.hostname,
          step: currentStepKey,
          url: nextStep.url,
        })
        return setProgress(100, timeout.set('loadingProgressBar', () => (window.location.href = nextStep.url), 600))
      }
      const nextStepKey = [...tags, nextStep.title].join('/')
      if (nextStep === 'showResults') {
        mixpanel.track('Clicked Assessment Step', {
          hostname: location.hostname,
          step: currentStepKey,
          tags: endNodeTags,
        })
        return goToStore(currentStepKey)
      }
      if (step.multiple && !steps[nextStepKey]) {
        return handleEndNodeTags(nextStep)
      }
      if (!step.multiple && !steps[nextStepKey]) {
        mixpanel.track('Clicked Assessment Step', {
          hostname: location.hostname,
          step: currentStepKey,
          tags: endNodeTags,
        })
        return goToStore(currentStepKey)
      }
      setProgress(progress + 33)
      setTags([...tags, nextStep.title])
      mixpanel.track('Clicked Assessment Step', {
        hostname: location.hostname,
        step: currentStepKey,
        tags: [nextStep.title],
      })
      setCurrentStepKey(nextStepKey)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { step, setCurrentStep, animateOpacity, setAnimateOpacity } = this.props
      rememberPersona(data.assessment.persona)
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
