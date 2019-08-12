import ChatBase from 'app/content/simple-chat/chat-base'
import getFrekklsConfig from 'frekkls-config'
import mixpanel from 'ext/mixpanel'
import StoreModal from './store-modal'
import useChatActions from 'ext/hooks/use-chat-actions'
import { assessmentHostname } from 'config'
import { assessProducts, rememberSeller } from './utils'
import { fetchProducts } from 'special/assessment/utils'
import { h } from 'preact'
import { isSmall } from 'utils'
import { SimpleChat, timeout } from 'plugin-base'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'

const ctaButton = { label: 'Ergebnisse anzeigen' }

const prepareProductsToChat = results => {
  return [{ message: { assessmentProducts: [...results], type: 'assessmentProducts' }, type: 'message' }]
}

const Base = ({
  assessmentIsMainFlow,
  assessmentState,
  currentStepKey,
  data,
  modalProps,
  closeModal,
  setAssessmentState,
  setCurrentStepKey,
  setModalProps,
  setShowAssessmentContent,
  setShowingContent,
  setShowingCtaButton,
  setShowingLauncher,
  setTags,
  showingCtaButton,
  tags,
}) => {
  const steps = useMemo(() => data && data.steps, [data])
  const step = useMemo(() => steps && steps[currentStepKey], [currentStepKey, steps])

  const [currentStep, setCurrentStep] = useState(step)
  const [progress, setProgress] = useState(assessmentState.progress || 0)
  const [results, setResults] = useState([])
  const [endNodeTags, setEndNodeTags] = useState([])
  const [client, setClient] = useState(null)

  useEffect(() => {
    rememberSeller(data.seller)
  }, [data.seller])

  const isFinalStep = useMemo(() => currentStepKey === 'store', [currentStepKey])

  const resetProgressFromFinalStep = useCallback(() => {
    setTimeout(() => setProgress(progress - 33), 300)
  }, [progress, setProgress])

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
    const newStepKey = newTags.join('>')
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

  const processResults = useCallback(
    startTime => {
      if (!client || !client.payload || !client.payload.products) return
      return timeout.set(
        'settingResults',
        () => {
          const results = assessProducts(client.payload.products, endNodeTags)
          setResults(results)
          if (results.length === 0) return
          modalProps.setModalComponent(
            <StoreModal
              closeModal={closeModal}
              goToPrevStep={goToPrevStep}
              module={module}
              results={results}
              setShowingContent={setShowingContent}
              setShowingLauncher={setShowingLauncher}
              step={step}
            />
          )
          if (!isSmall()) modalProps.setIsModalOpen(true)
        },
        Math.max(800 - (performance.now() - startTime), 10)
      )
    },
    [client, closeModal, endNodeTags, goToPrevStep, modalProps, setShowingContent, setShowingLauncher, step]
  )

  useEffect(() => {
    if (currentStepKey !== 'store') return
    const fetchStartTime = performance.now()
    client
      ? processResults(fetchStartTime)
      : fetchProducts().then(results => {
          setClient(results.find(client => client.hostname === assessmentHostname))
          processResults(fetchStartTime)
        })
  }, [client, currentStepKey, endNodeTags, processResults, progress, step])

  const [animateOpacity, setAnimateOpacity] = useState(false)
  const [nothingSelected, setNothingSelected] = useState(false)
  const [ctaButtonClicked, setCtaButtonClicked] = useState(false)
  const [hideProgressBar, setHideProgressBar] = useState(false)

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

  const { clickActions } = useChatActions({ flowType: module.flowType, setModalProps })

  const goToStore = useCallback(() => {
    setProgress(100)
    setTimeout(() => {
      setCurrentStepKey('store')
    }, 600)
    setTimeout(() => setHideProgressBar(true), 800)
  }, [setCurrentStepKey])

  const goToNextStep = useCallback(
    nextStep => {
      if (nextStep.url) {
        mixpanel.track('Clicked Assessment Step', {
          flowType: data.flowType,
          hostname: location.hostname,
          step: currentStepKey,
          url: nextStep.url,
        })
        return setProgress(100, timeout.set('loadingProgressBar', () => (window.location.href = nextStep.url), 600))
      }
      const nextStepKey = [...tags, nextStep.title].join('>')
      if (nextStep === 'showResults') {
        mixpanel.track('Clicked Assessment Step', {
          flowType: data.flowType,
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
          flowType: data.flowType,
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
        flowType: data.flowType,
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
      data.flowType,
      progress,
      setCurrentStepKey,
      setTags,
      step.multiple,
      steps,
      tags,
    ]
  )

  const onCtaButtonClick = useCallback(() => {
    goToNextStep('showResults')
    setCtaButtonClicked(true)
    sessionStorage.setItem('frekkls-asmt-tags', JSON.stringify(endNodeTags))
  }, [endNodeTags, goToNextStep])

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

  const chatBaseProps = useMemo(() => ({ assessment: true, assessmentOptions: { step, goToNextStep }, ctaButton }), [
    goToNextStep,
    step,
  ])

  return (
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
  )
}

export default Base
