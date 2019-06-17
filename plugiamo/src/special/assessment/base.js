import ChatBase from 'app/content/simple-chat/chat-base'
import ChatModals from 'shared/chat-modals'
import getFrekklsConfig from 'frekkls-config'
import mixpanel from 'ext/mixpanel'
import StoreModal from './store-modal'
import useChatActions from 'ext/hooks/use-chat-actions'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'
import { isSmall } from 'utils'
import { SimpleChat, timeout } from 'plugin-base'

const ctaButton = { label: 'Ergebnisse anzeigen' }

const Base = props => {
  const {
    currentStep,
    goToNextStep,
    animateOpacity,
    progress,
    showingCtaButton,
    step,
    goToPrevStep,
    module,
    nothingSelected,
    ctaButtonClicked,
    setCtaButtonClicked,
    storeLog,
    onCtaButtonClick,
    hideProgressBar,
    isFinalStep,
    currentStepKey,
    assessmentIsMainFlow,
  } = props

  const { clickActions, modalsProps } = useChatActions(module.flowType)

  if (!isSmall() && isFinalStep) return <StoreModal {...props} />

  return (
    <div>
      <ChatModals flowType={module.flowType} {...modalsProps} />
      <SimpleChat
        animateOpacity={animateOpacity}
        backButtonLabel={getFrekklsConfig().i18n.backButton}
        ChatBase={ChatBase}
        chatBaseProps={{ assessment: true, assessmentOptions: { step, goToNextStep }, ctaButton }}
        clickActions={clickActions}
        clicked={ctaButtonClicked}
        currentStep={currentStep}
        data={step}
        goToPrevStep={goToPrevStep}
        hideCtaButton={isFinalStep || !showingCtaButton}
        hideProgressBar={hideProgressBar}
        nothingSelected={nothingSelected}
        onCtaButtonClick={onCtaButtonClick}
        progress={progress}
        setCtaButtonClicked={setCtaButtonClicked}
        showBackButton={!assessmentIsMainFlow || currentStepKey !== 'root'}
        storeLog={storeLog}
      />
    </div>
  )
}

const prepareProductsToChat = results => {
  return [{ message: { assessmentProducts: [...results], type: 'assessmentProducts' }, type: 'message' }]
}

export default compose(
  withState('animateOpacity', 'setAnimateOpacity', ({ animateOpacity }) => animateOpacity),
  withState('nothingSelected', 'setNothingSelected', false),
  withState('coverMinimized', 'setCoverMinimized', ({ step }) => !!step.header.minimized),
  withState('touch', 'setTouch', true),
  withState('tags', 'setTags', ({ showAssessmentContent }) =>
    typeof showAssessmentContent !== 'boolean' ? showAssessmentContent.key.split('/') : []
  ),
  withState('showingCtaButton', 'setShowingCtaButton', false),
  withState('ctaButtonClicked', 'setCtaButtonClicked', false),
  withState('hideProgressBar', 'setHideProgressBar', false),
  withHandlers(() => {
    let ref
    return {
      setContentRef: () => newRef => (ref = newRef),
      contentRef: () => () => ref,
    }
  }),
  withProps(({ currentStepKey }) => ({
    isFinalStep: currentStepKey === 'store',
  })),
  withHandlers({
    handleEndNodeTags: ({ endNodeTags, setEndNodeTags, setShowingCtaButton }) => nextStepKey => {
      const newTags = endNodeTags.includes(nextStepKey)
        ? endNodeTags.filter(tag => tag !== nextStepKey)
        : [...endNodeTags, nextStepKey]
      setShowingCtaButton(newTags.length > 0)
      return setEndNodeTags(newTags)
    },
    goToStore: ({ setProgress, setCurrentStepKey, setHideProgressBar }) => () => {
      setTimeout(() => setHideProgressBar(true), 800)
      setProgress(100)
      setCurrentStepKey('store')
    },
    resetAssessment: ({ setTags, setEndNodeTags, setCurrentStepKey, setShowingCtaButton }) => () => {
      setTags([])
      setEndNodeTags([])
      setCurrentStepKey('root')
      setShowingCtaButton(false)
    },
    resetProgressFromFinalStep: ({ progress, setProgress }) => () => {
      progress === 100 && setTimeout(() => setProgress(progress - 33), 1000)
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
      setEndNodeTags,
      module,
    }) => nextStep => {
      if (nextStep.url) {
        mixpanel.track('Clicked Assessment Step', {
          flowType: module.flowType,
          hostname: location.hostname,
          step: currentStepKey,
          url: nextStep.url,
        })
        return setProgress(100, timeout.set('loadingProgressBar', () => (window.location.href = nextStep.url), 600))
      }
      const nextStepKey = [...tags, nextStep.title].join('/')
      if (nextStep === 'showResults') {
        mixpanel.track('Clicked Assessment Step', {
          flowType: module.flowType,
          hostname: location.hostname,
          step: currentStepKey,
          tags: endNodeTags,
        })
        return goToStore()
      }
      if (step.multiple && !steps[nextStepKey]) {
        return handleEndNodeTags(nextStepKey)
      }
      if (!step.multiple && !steps[nextStepKey]) {
        const newTags = [...endNodeTags, nextStepKey]
        mixpanel.track('Clicked Assessment Step', {
          flowType: module.flowType,
          hostname: location.hostname,
          step: currentStepKey,
          tags: newTags,
        })
        setEndNodeTags(newTags)
        return goToStore()
      }
      setProgress(progress + 33)
      setTags([...tags, nextStep.title])
      mixpanel.track('Clicked Assessment Step', {
        flowType: module.flowType,
        hostname: location.hostname,
        step: currentStepKey,
        tags: [nextStepKey],
      })
      setCurrentStepKey(nextStepKey)
    },
    goToPrevStep: ({
      tags,
      setCurrentStepKey,
      setTags,
      progress,
      setShowAssessmentContent,
      setProgress,
      setShowingCtaButton,
      setAnimateOpacity,
      setNothingSelected,
      setEndNodeTags,
      setCtaButtonClicked,
      setHideProgressBar,
      setResults,
      isFinalStep,
      resetProgressFromFinalStep,
      assessmentIsMainFlow,
    }) => () => {
      if (tags.length === 0) {
        setAnimateOpacity(true)
        return setTimeout(() => setShowAssessmentContent(false), 300)
      }
      let key = tags
      let newTags = tags
      if (!isFinalStep) {
        key = tags.length > 1 ? tags[tags.length - 1] : 'root'
        newTags = [...tags]
        newTags.pop()
        setProgress(key === 'root' ? 0 : progress - 33)
      }
      const newStepKey = newTags.join('/')
      if (isFinalStep) {
        setShowAssessmentContent({ key: newStepKey, progress })
        setHideProgressBar(false)
        timeout.set('asmt-storeRemove', () => setResults([]), 800)
        assessmentIsMainFlow && resetProgressFromFinalStep()
      }
      setCurrentStepKey(key === 'root' ? key : newStepKey)
      setTags(newTags)
      setShowingCtaButton(false)
      setEndNodeTags([])
      setNothingSelected(true)
      setTimeout(() => setNothingSelected(false), 800)
      setCtaButtonClicked(false)
    },
  }),
  withHandlers({
    onCtaButtonClick: ({ goToNextStep, setCtaButtonClicked }) => () => {
      goToNextStep('showResults')
      setCtaButtonClicked(true)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { step, setCurrentStep, animateOpacity, setAnimateOpacity, resetProgressFromFinalStep } = this.props
      if (animateOpacity) {
        setTimeout(() => setAnimateOpacity(false), 10)
      }
      setCurrentStep(step)
      resetProgressFromFinalStep()
    },
    componentWillUnmount() {
      timeout.clear('exitOnMobile')
      timeout.clear('loadingProgressBar')
    },
  }),
  withProps(({ results }) => ({
    storeLog: {
      type: 'message',
      logs: results.length > 0 && prepareProductsToChat(results),
    },
  }))
)(Base)
