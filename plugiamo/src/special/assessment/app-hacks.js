import App from 'app/app'
import Assessment from '.'
import AssessmentCart from './cart'
import assessmentData from './data'
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

const assessmentModule = assessmentData[assessmentHostname] && assessmentData[assessmentHostname].assessment

const AppHacks = ({ data }) => {
  const [disappear, setDisappear] = useState(false)
  const [hideContentFrame, setHideContentFrame] = useState(false)
  const [setDisappearTimeout, clearDisappearTimeout] = useTimeout()
  const [showAssessmentContent, setShowAssessmentContent] = useState(false)
  const [showingBubbles, setShowingBubbles] = useState(isShowingDefault)
  const [showingContent, setShowingContent] = useState(defaultShowingContent)
  const [showingLauncher, setShowingLauncher] = useState(isShowingDefault)
  const [pluginState, setPluginState] = useState('default')

  useEffect(() => {
    if (getScrollbarWidth() === 0) return
    if (showingContent) {
      document.documentElement.classList.add('trnd-open')
    } else {
      document.documentElement.classList.remove('trnd-open')
    }
  }, [showingContent])

  const Component = useMemo(
    () =>
      showAssessmentContent || isDeliusAssessment() ? (
        <Assessment
          clearDisappearTimeout={clearDisappearTimeout}
          module={assessmentModule}
          setDisappear={setDisappear}
          setDisappearTimeout={setDisappearTimeout}
          setHideContentFrame={setHideContentFrame}
          setPluginState={setPluginState}
          setShowAssessmentContent={setShowAssessmentContent}
          setShowingContent={setShowingContent}
          setShowingLauncher={setShowingLauncher}
          showingContent={showingContent}
        />
      ) : (
        <Router />
      ),
    [clearDisappearTimeout, setDisappearTimeout, showAssessmentContent, showingContent]
  )

  if (isDeliusPDP()) {
    return (
      <AssessmentForm
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
        setShowingContent={setShowingContent}
        showingBubbles={showingBubbles}
        showingContent={showingContent}
        showingLauncher={showingLauncher}
      />
    )
  }

  if (!data.loading && !data.error && !data.flow && isPCAssessment()) {
    return (
      <AssessmentSizeGuide
        setShowingContent={setShowingContent}
        showingBubbles={showingBubbles}
        showingContent={showingContent}
        showingLauncher={showingLauncher}
      />
    )
  }

  if (data.loading || data.error || (!data.flow && !(showAssessmentContent || isDeliusAssessment()))) return null

  return (
    <App
      Component={Component}
      data={showAssessmentContent || isDeliusAssessment() ? assessmentModule : data}
      disappear={disappear}
      hideContentFrame={hideContentFrame}
      pluginState={pluginState}
      setDisappear={setDisappear}
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
