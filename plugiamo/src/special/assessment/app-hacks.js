import App from 'app/app'
import Assessment from '.'
import AssessmentCart from './cart'
import AssessmentForm from './form'
import AssessmentSizeGuide from './size-guide'
import googleAnalytics from 'ext/google-analytics'
import Router from 'app/content/router'
import useTimeout from 'ext/hooks/use-timeout'
import { assessmentHostname } from 'config'
import { getScrollbarWidth } from 'utils'
import { h } from 'preact'
import { isDeliusAssessment, isDeliusPDP, isPCAssessment, isPCAssessmentCart } from './utils'
import { useEffect, useMemo, useState } from 'preact/hooks'

const isShowingDefault = googleAnalytics.active ? googleAnalytics.getVariation() !== 'absent' : true

const defaultShowingContent = isDeliusAssessment() ? assessmentHostname === 'www.pierre-cardin.de' : false

const disappearForever = sessionStorage.getItem('trnd-disappear-forever')

const isAssessment = ['www.pierre-cardin.de', 'www.delius-contract.de'].includes(assessmentHostname)

const AppHacks = ({ data }) => {
  const [assessmentData, setAssessmentData] = useState(null)
  const [disappear, setDisappear] = useState(false)
  const [hideContentFrame, setHideContentFrame] = useState(false)
  const [pluginState, setPluginState] = useState('default')
  const [setDisappearTimeout, clearDisappearTimeout] = useTimeout()
  const [showAssessmentContent, setShowAssessmentContent] = useState(false)
  const [showingBubbles, setShowingBubbles] = useState(isShowingDefault)
  const [showingContent, setShowingContent] = useState(defaultShowingContent)
  const [showingLauncher, setShowingLauncher] = useState(isShowingDefault)
  const [modalProps, setModalProps] = useState({})

  useEffect(() => {
    if (getScrollbarWidth() === 0) return
    if (showingContent) {
      document.documentElement.classList.add('trnd-open')
    } else {
      document.documentElement.classList.remove('trnd-open')
    }
  }, [showingContent])

  useEffect(() => {
    ;(async () => {
      if (!isAssessment) return null

      const response = await fetch(
        `https://plugin-assets.ams3.digitaloceanspaces.com/assessment-data-${assessmentHostname}.json`,
        {
          mode: 'cors',
        }
      )
      const result = await response.json()
      setAssessmentData(result)
    })()
  }, [])

  const Component = useMemo(
    () =>
      showAssessmentContent || isDeliusAssessment() ? (
        assessmentData ? (
          <Assessment
            data={assessmentData.assessment}
            isDelius={isDeliusAssessment()}
            setDisappear={setDisappear}
            setDisappearTimeout={setDisappearTimeout}
            setHideContentFrame={setHideContentFrame}
            setPluginState={setPluginState}
            setShowAssessmentContent={setShowAssessmentContent}
            setShowingContent={setShowingContent}
            setShowingLauncher={setShowingLauncher}
            showingContent={showingContent}
          />
        ) : null
      ) : (
        <Router />
      ),
    [assessmentData, setDisappearTimeout, showAssessmentContent, showingContent]
  )

  if (isAssessment && !assessmentData) return null

  if (disappearForever) return null

  if (isDeliusPDP()) {
    return (
      <AssessmentForm
        clearDisappearTimeout={clearDisappearTimeout}
        form={assessmentData.assessmentForm}
        modalProps={modalProps}
        setDisappearTimeout={setDisappearTimeout}
        setModalProps={setModalProps}
        setShowingContent={setShowingContent}
        showingBubbles={showingBubbles}
        showingContent={showingContent}
        showingLauncher={showingLauncher}
      />
    )
  }

  if (isPCAssessmentCart()) {
    return (
      <AssessmentCart
        cart={assessmentData.cart}
        modalProps={modalProps}
        setModalProps={setModalProps}
        setShowingContent={setShowingContent}
        showingBubbles={showingBubbles}
        showingContent={showingContent}
        showingLauncher={showingLauncher}
        suggestions={assessmentData.suggestions}
      />
    )
  }

  if (!data.loading && !data.error && !data.flow && isPCAssessment()) {
    return (
      <AssessmentSizeGuide
        clearDisappearTimeout={clearDisappearTimeout}
        modalProps={modalProps}
        setDisappearTimeout={setDisappearTimeout}
        setModalProps={setModalProps}
        setShowingContent={setShowingContent}
        showingBubbles={showingBubbles}
        showingContent={showingContent}
        showingLauncher={showingLauncher}
        sizeGuide={assessmentData.sizeGuide}
      />
    )
  }

  if (data.loading || data.error || (!data.flow && !(showAssessmentContent || isDeliusAssessment()))) return null

  return (
    <App
      clearDisappearTimeout={clearDisappearTimeout}
      Component={Component}
      data={showAssessmentContent || isDeliusAssessment() ? assessmentData.assessment : data}
      disappear={disappear}
      hideContentFrame={hideContentFrame}
      modalProps={modalProps}
      pluginState={pluginState}
      setDisappear={setDisappear}
      setDisappearTimeout={setDisappearTimeout}
      setModalProps={setModalProps}
      setPluginState={setPluginState}
      setShowAssessmentContent={setShowAssessmentContent}
      setShowingBubbles={setShowingBubbles}
      setShowingContent={setShowingContent}
      showingBubbles={showingBubbles}
      showingContent={showingContent || showAssessmentContent}
      showingLauncher={showingLauncher}
      timeoutToDisappear={isDeliusAssessment() ? 500 : 10000}
    />
  )
}

export default AppHacks
