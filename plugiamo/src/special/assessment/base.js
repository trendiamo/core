import ChatModals from 'shared/chat-modals'
import data from './data'
import flatten from 'lodash.flatten'
import getFrekklsConfig from 'frekkls-config'
import mixpanel from 'ext/mixpanel'
import StoreModal from './store-modal'
import withChatActions from 'ext/recompose/with-chat-actions'
import { branch, compose, lifecycle, renderComponent, withHandlers, withProps, withState } from 'recompose'
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

const Base = ({
  currentStep,
  goToNextStep,
  animateOpacity,
  progress,
  showingCtaButton,
  step,
  goToPrevStep,
  nothingSelected,
  ctaButtonClicked,
  setCtaButtonClicked,
  storeLog,
  onCtaButtonClick,
  hideProgressBar,
  modalsProps,
  clickActions,
}) => (
  <div>
    <ChatModals flowType={module.flowType} {...modalsProps} />
    <SimpleChat
      animateOpacity={animateOpacity}
      assessment
      assessmentOptions={{ step, goToNextStep }}
      backButtonLabel={getFrekklsConfig().i18n.backButton}
      clickActions={clickActions}
      clicked={ctaButtonClicked}
      ctaButton={ctaButton}
      currentStep={currentStep}
      data={step}
      goToPrevStep={goToPrevStep}
      hideCtaButton={currentStep.type === 'store' || !showingCtaButton}
      hideProgressBar={hideProgressBar}
      nothingSelected={nothingSelected}
      onCtaButtonClick={onCtaButtonClick}
      progress={progress}
      setCtaButtonClicked={setCtaButtonClicked}
      showBackButton
      storeLog={storeLog}
    />
  </div>
)

const prepareProductsToChat = results => {
  return [{ message: { assessmentProducts: [...results], type: 'assessmentProducts' }, type: 'message' }]
}

export default compose(
  withState('animateOpacity', 'setAnimateOpacity', ({ animateOpacity }) => animateOpacity),
  withProps({ module: data.assessment }),
  withState('currentStepKey', 'setCurrentStepKey', ({ showAssessmentContent }) =>
    typeof showAssessmentContent !== 'boolean' ? showAssessmentContent.key : 'root'
  ),
  withState('nothingSelected', 'setNothingSelected', false),
  withProps(({ module, currentStepKey }) => ({
    step: module && module.steps[currentStepKey],
    steps: module && module.steps,
  })),
  withState('coverMinimized', 'setCoverMinimized', ({ step }) => !!step.header.minimized),
  withState('touch', 'setTouch', true),
  withState('currentStep', 'setCurrentStep', ({ step }) => step),
  withState('tags', 'setTags', ({ showAssessmentContent }) =>
    typeof showAssessmentContent !== 'boolean' ? showAssessmentContent.key.split('/') : []
  ),
  withState('progress', 'setProgress', ({ showAssessmentContent }) =>
    typeof showAssessmentContent !== 'boolean' ? showAssessmentContent.progress : 0
  ),
  withState('endNodeTags', 'setEndNodeTags', []),
  withState('showingCtaButton', 'setShowingCtaButton', false),
  withState('ctaButtonClicked', 'setCtaButtonClicked', false),
  withState('hideProgressBar', 'setHideProgressBar', false),
  withState('results', 'setResults', []),
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
        return goToStore(currentStepKey)
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
        return goToStore(currentStepKey)
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
      currentStepKey,
      setCtaButtonClicked,
      setHideProgressBar,
      setResults,
    }) => () => {
      const tagsLength = tags.length
      if (tagsLength === 0) {
        setAnimateOpacity(true)
        return setTimeout(() => setShowAssessmentContent(false), 300)
      }
      let key = tags
      let newTags = tags
      if (currentStepKey !== 'store') {
        key = tagsLength > 1 ? tags[tagsLength - 1] : 'root'
        newTags = [...tags]
        newTags.pop()
        setProgress(key === 'root' ? 0 : progress - 33)
      }
      const newStepKey = newTags.join('/')
      if (currentStepKey === 'store') {
        setShowAssessmentContent({ key: newStepKey, progress })
        setHideProgressBar(false)
        timeout.set('asmt-storeRemove', () => setResults([]), 800)
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
      const { step, setCurrentStep, animateOpacity, setAnimateOpacity, progress, setProgress } = this.props
      rememberPersona(data.assessment.persona)
      if (animateOpacity) {
        setTimeout(() => setAnimateOpacity(false), 10)
      }
      setCurrentStep(step)
      progress === 100 && setTimeout(() => setProgress(progress - 33), 1000)
    },
    componentWillUnmount() {
      timeout.clear('exitOnMobile')
      timeout.clear('loadingProgressBar')
    },
    componentDidUpdate(prevProps) {
      const { step, setCurrentStep, currentStepKey, progress, setProgress } = this.props
      if (prevProps.step !== step) {
        if (currentStepKey === 'store') {
          const _this = this
          let fetchStartTime = performance.now()
          fetchProducts(results => {
            const { setResults, endNodeTags } = _this.props
            const client = results.find(client => client.hostname === window.location.hostname)
            timeout.set(
              'settingResults',
              () => setResults(assessProducts(client.products, endNodeTags)),
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
  }),
  withProps(({ results }) => ({
    storeLog: {
      type: 'message',
      logs: results.length > 0 && prepareProductsToChat(results),
    },
  })),
  withChatActions(),
  branch(({ currentStepKey }) => !isSmall() && currentStepKey === 'store', renderComponent(StoreModal))
)(Base)
