import ChatBase from 'app/content/simple-chat/chat-base'
import ChatModals from 'shared/chat-modals'
import data from './data'
import flatten from 'lodash.flatten'
import getFrekklsConfig from 'frekkls-config'
import mixpanel from 'ext/mixpanel'
import StoreModal from './store-modal'
import useChatActions from 'ext/hooks/use-chat-actions'
import { assessmentHostname } from 'config'
import { fetchProducts } from 'special/assessment/utils'
import { h } from 'preact'
import { isSmall } from 'utils'
import { rememberPersona } from './utils'
import { SimpleChat, timeout } from 'plugin-base'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'

const assessProducts = (products, tags) => {
  const productsResult =
    assessmentHostname === 'www.delius-contract.de'
      ? flatten(
          tags.map(tag =>
            products.filter(product => product.tags && product.tags.find(productTag => tag.includes(productTag)))
          )
        )
      : flatten(tags.map(tag => products.filter(product => product.tag && tag === product.tag)))
  return productsResult.sort((a, b) => !!b.highlight - !!a.highlight)
}

const ctaButton = { label: 'Ergebnisse anzeigen' }

const prepareProductsToChat = results => {
  return [{ message: { assessmentProducts: [...results], type: 'assessmentProducts' }, type: 'message' }]
}

const module = data[assessmentHostname] && data[assessmentHostname].assessment
const steps = module && module.steps

const Base = ({
  assessmentIsMainFlow,
  assessmentState,
  currentStepKey,
  onCloseModal,
  resetAssessment,
  setAssessmentState,
  setCurrentStepKey,
  setShowAssessmentContent,
  setShowingContent,
  setShowingCtaButton,
  setShowingLauncher,
  setTags,
  showingCtaButton,
  tags,
}) => {
  const step = useMemo(() => steps && steps[currentStepKey], [currentStepKey])

  const [currentStep, setCurrentStep] = useState(step)
  const [progress, setProgress] = useState(assessmentState.progress || 0)
  const [results, setResults] = useState([])
  const [endNodeTags, setEndNodeTags] = useState([])

  useEffect(() => {
    rememberPersona(module.persona)
  }, [])

  useEffect(() => {
    if (currentStepKey === 'store') {
      let fetchStartTime = performance.now()
      fetchProducts().then(results => {
        const client = results.find(client => client.hostname === assessmentHostname)
        timeout.set(
          'settingResults',
          () => {
            setResults(assessProducts(client.products, endNodeTags))
          },
          Math.max(800 - (performance.now() - fetchStartTime), 10)
        )
      })
    }
  }, [currentStepKey, endNodeTags, progress, step])

  const [animateOpacity, setAnimateOpacity] = useState(false)
  const [nothingSelected, setNothingSelected] = useState(false)
  const [ctaButtonClicked, setCtaButtonClicked] = useState(false)
  const [hideProgressBar, setHideProgressBar] = useState(false)

  const isFinalStep = useMemo(() => currentStepKey === 'store', [currentStepKey])

  const handleEndNodeTags = useCallback(
    nextStepKey => {
      const newTags = endNodeTags.includes(nextStepKey)
        ? endNodeTags.filter(tag => tag !== nextStepKey)
        : [...endNodeTags, nextStepKey]
      setShowingCtaButton(newTags.length > 0)
      return setEndNodeTags(newTags)
    },
    [endNodeTags, setEndNodeTags, setShowingCtaButton]
  )

  const goToStore = useCallback(() => {
    setTimeout(() => setHideProgressBar(true), 800)
    setProgress(100)
    setTimeout(() => setCurrentStepKey('store'), 600)
  }, [setCurrentStepKey, setProgress])

  const resetProgressFromFinalStep = useCallback(() => {
    setTimeout(() => setProgress(progress - 33), 300)
  }, [progress, setProgress])

  const goToNextStep = useCallback(
    nextStep => {
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
    [
      currentStepKey,
      endNodeTags,
      goToStore,
      handleEndNodeTags,
      progress,
      setCurrentStepKey,
      setTags,
      step.multiple,
      tags,
    ]
  )

  const goToPrevStep = useCallback(() => {
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
      resetProgressFromFinalStep()
    }
    setCurrentStepKey(key === 'root' ? key : newStepKey)
    setTags(newTags)
    setShowingCtaButton(false)
    setEndNodeTags([])
    setNothingSelected(true)
    setTimeout(() => setNothingSelected(false), 800)
    setCtaButtonClicked(false)
  }, [
    isFinalStep,
    progress,
    resetProgressFromFinalStep,
    setAssessmentState,
    setCurrentStepKey,
    setShowAssessmentContent,
    setShowingCtaButton,
    setTags,
    tags,
  ])

  const onCtaButtonClick = useCallback(() => {
    goToNextStep('showResults')
    setCtaButtonClicked(true)
  }, [goToNextStep])

  useEffect(() => {
    setCurrentStep(step)
  }, [step])

  useEffect(() => {
    if (animateOpacity) setTimeout(() => setAnimateOpacity(false), 10)
  }, [animateOpacity])

  useEffect(() => {
    return () => {
      timeout.clear('exitOnMobile')
      timeout.clear('loadingProgressBar')
    }
  }, [])

  const storeLog = useMemo(
    () => ({
      type: 'message',
      logs: results.length > 0 && prepareProductsToChat(results),
    }),
    [results]
  )

  const { clickActions, modalsProps } = useChatActions({ flowType: module.flowType })

  const chatBaseProps = useMemo(() => ({ assessment: true, assessmentOptions: { step, goToNextStep }, ctaButton }), [
    goToNextStep,
    step,
  ])

  if (!isSmall() && isFinalStep) {
    return (
      <StoreModal
        goToPrevStep={goToPrevStep}
        module={module}
        onCloseModal={onCloseModal}
        resetAssessment={resetAssessment}
        results={results}
        setShowingContent={setShowingContent}
        setShowingLauncher={setShowingLauncher}
        step={step}
      />
    )
  }

  return (
    <div>
      <ChatModals flowType={module.flowType} {...modalsProps} />
      <SimpleChat
        animateOpacity={animateOpacity}
        backButtonLabel={getFrekklsConfig().i18n.backButton}
        ChatBase={ChatBase}
        chatBaseProps={chatBaseProps}
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

export default Base
