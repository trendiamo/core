/* eslint-disable max-lines */
import ChatBase from 'app/content/simple-chat/chat-base'
import ChatModals from 'shared/chat-modals'
import data from './data'
import flatten from 'lodash.flatten'
import getFrekklsConfig from 'frekkls-config'
import mixpanel from 'ext/mixpanel'
import StoreModal from './store-modal'
import useChatActions from 'ext/hooks/use-chat-actions'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { fetchProducts } from 'special/assessment/utils'
import { h } from 'preact'
import { isSmall } from 'utils'
import { rememberPersona } from './utils'
import { SimpleChat, timeout } from 'plugin-base'

const assessProducts = (products, tags) => {
  const productsResult = flatten(tags.map(tag => products.filter(product => product.tag && tag === product.tag)))
  return productsResult.sort((a, b) => !!b.highlight - !!a.highlight)
}

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

const Base0 = compose(
  withState('animateOpacity', 'setAnimateOpacity', ({ animateOpacity }) => animateOpacity),
  withState('nothingSelected', 'setNothingSelected', false),
  withState('coverMinimized', 'setCoverMinimized', ({ step }) => !!step.header.minimized),
  withState('touch', 'setTouch', true),
  withState('tags', 'setTags', ({ assessmentState }) => (assessmentState.key ? assessmentState.key.split('/') : [])),
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
      setAssessmentState,
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
        setAssessmentState({ key: newStepKey, progress })
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

const hostname = process.env.ASSESSMENT || location.hostname

const Base1 = compose(
  withProps({
    module: data[hostname] && data[hostname].assessment,
  }),
  withProps(({ module, currentStepKey }) => ({
    step: module && module.steps[currentStepKey],
    steps: module && module.steps,
  })),
  withState('currentStep', 'setCurrentStep', ({ step }) => step),
  withState('progress', 'setProgress', ({ assessmentState }) => assessmentState.progress || 0),
  withState('results', 'setResults', []),
  withState('endNodeTags', 'setEndNodeTags', []),
  lifecycle({
    componentDidMount() {
      const { module } = this.props
      rememberPersona(module.persona)
    },
    componentDidUpdate(prevProps) {
      const { step, setCurrentStep, currentStepKey, progress, setProgress } = this.props
      if (prevProps.step !== step) {
        if (currentStepKey === 'store') {
          const _this = this
          let fetchStartTime = performance.now()
          fetchProducts().then(results => {
            const { setResults, endNodeTags } = _this.props
            const client = results.find(client => client.hostname === location.hostname)
            timeout.set(
              'settingResults',
              () => {
                setResults(assessProducts(client.products, endNodeTags))
              },
              Math.max(800 - (performance.now() - fetchStartTime), 10)
            )
          })
        }
        if (prevProps.currentStepKey === 'store' && progress === 100) {
          setTimeout(() => {
            setProgress(progress - 33)
          }, 2000)
        }
        setTimeout(
          () => {
            setCurrentStep(step)
          },
          prevProps.step ? 750 : 0
        )
      }
    },
  })
)(Base0)

export default Base1
