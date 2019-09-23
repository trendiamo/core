import AppBase from './base'
import getFrekklsConfig from 'frekkls-config'
import mixpanel from 'ext/mixpanel'
import setup from './setup'
import setupFlowHistory from './setup/flow-history'
import { h } from 'preact'
import { isDelius, isDeliusAssessment } from 'special/assessment/utils'
import { isSmall } from 'utils'
import { location } from 'config'
import { timeout } from 'plugin-base'
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks'

const App = ({
  clearDisappearTimeout,
  Component,
  data,
  disappear,
  hideContentFrame,
  modalProps,
  pluginState,
  setDisappear,
  setDisappearTimeout,
  setModalProps,
  setPluginState,
  setShowAssessmentContent,
  setShowingBubbles,
  setShowingContent,
  showingBubbles,
  showingContent,
  showingLauncher,
  timeoutToDisappear,
}) => {
  const [isHiddenInTimeout, setIsHiddenInTimeout] = useState(false)
  const [isUnmounting, setIsUnmounting] = useState(false)
  const autoOpen = useRef(null)
  const flowType = useRef(null)
  const flowId = useRef(null)
  const seller = useRef(null)
  const [hasSeller, setHasSeller] = useState(false)
  const config = useMemo(() => setup(data, setupFlowHistory()), [data])

  useEffect(() => () => timeout.clear('exitOnMobile'), [])

  useEffect(() => {
    if (!seller.current && config.seller) setHasSeller(true)
    flowType.current = config.flowType
    flowId.current = data && data.flow && data.flow.id
    autoOpen.current = config.open
    seller.current = config.seller
  }, [config.flowType, config.open, config.seller, data])

  const initialLoad = useCallback(() => {
    setIsHiddenInTimeout(false)
    mixpanel.track('Loaded Plugin', {
      autoOpen: autoOpen.current,
      flowType: flowType.current,
      flowId: flowId.current,
      hash: location.hash,
      hostname: location.hostname,
      sellerName: seller.current.name,
      sellerRef: seller.current.id,
    })

    getFrekklsConfig().onShow(autoOpen.current)

    if (flowType.current === 'outro') return setPluginState('closed')

    if (autoOpen.current) {
      setShowingContent(true)
    } else {
      mixpanel.time_event('Toggled Plugin')
    }
  }, [setPluginState, setShowingContent])

  useEffect(() => {
    const frekklsConfig = getFrekklsConfig()
    if (frekklsConfig.initDelay > 0) {
      setIsHiddenInTimeout(true)
      window.setTimeout(initialLoad, frekklsConfig.initDelay)
    } else {
      initialLoad()
    }
  }, [initialLoad])

  const onToggleContent = useCallback(() => {
    if (data.flow && flowType.current === 'outro') return
    if (isDeliusAssessment() && pluginState === 'closed') return

    if (isDelius && showingContent) sessionStorage.setItem('trnd-disappear-forever', true)

    mixpanel.track('Toggled Plugin', {
      hostname: location.hostname,
      action: showingContent ? 'close' : 'open',
      flowType: flowType.current,
      flowId: flowId.current,
    })
    mixpanel.time_event('Toggled Plugin')

    setShowingBubbles(false)

    if (showingContent) {
      setPluginState('closed')
      setDisappearTimeout(() => setDisappear(true), timeoutToDisappear)
    } else {
      setPluginState('default')
    }

    if (showingContent && isSmall()) {
      setIsUnmounting(true)
      timeout.set(
        'exitOnMobile',
        () => {
          setIsUnmounting(false)
          setShowingContent(false)
          setShowAssessmentContent(false)
        },
        400
      )
    } else {
      setShowingContent(disappear ? false : !showingContent)
      setShowAssessmentContent(false)
    }
  }, [
    data.flow,
    disappear,
    pluginState,
    setDisappear,
    setDisappearTimeout,
    setPluginState,
    setShowAssessmentContent,
    setShowingBubbles,
    setShowingContent,
    showingContent,
    timeoutToDisappear,
  ])

  const onUserInteracted = useCallback(() => {
    mixpanel.track('Interacted', {
      hostname: location.hostname,
      flowType: flowType.current,
      flowId: flowId.current,
    })
  }, [])

  useEffect(() => {
    if (showingContent) clearDisappearTimeout()
  }, [clearDisappearTimeout, showingContent])

  if (!hasSeller || isHiddenInTimeout) return null

  return (
    <AppBase
      Component={Component}
      data={data}
      disappear={disappear}
      hideContentFrame={hideContentFrame}
      isUnmounting={isUnmounting}
      modalProps={modalProps}
      onToggleContent={onToggleContent}
      onUserInteracted={onUserInteracted}
      pluginState={pluginState}
      position={getFrekklsConfig().position}
      seller={seller.current}
      setDisappear={setDisappear}
      setModalProps={setModalProps}
      setShowAssessmentContent={setShowAssessmentContent}
      showingBubbles={showingBubbles}
      showingContent={showingContent}
      showingLauncher={showingLauncher}
    />
  )
}

export default App
