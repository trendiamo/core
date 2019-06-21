import AppBase from 'app/base'
import AssessmentBase from './base'
import data from 'special/assessment/data'
import mixpanel from 'ext/mixpanel'
import { h } from 'preact'
import { isSmall } from 'utils'
import { timeout } from 'plugin-base'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'

const hostname = process.env.ASSESSMENT || location.hostname
const module = data[hostname] && data[hostname].assessment

const Plugin = ({
  setShowAssessmentContent,
  showAssessmentContent,
  setShowingBubbles,
  setShowingContent,
  setShowingLauncher,
  showingBubbles,
  showingContent,
  showingLauncher,
}) => {
  const [disappear, setDisappear] = useState(false)
  const [isUnmounting, setIsUnmounting] = useState(false)
  const [pluginState, setPluginState] = useState('default')

  const [assessmentState, setAssessmentState] = useState({})
  const [tags, setTags] = useState(assessmentState.key ? assessmentState.key.split('/') : [])
  const [endNodeTags, setEndNodeTags] = useState([])
  const [showingCtaButton, setShowingCtaButton] = useState(false)
  const [currentStepKey, setCurrentStepKey] = useState(assessmentState.key || 'root')

  const hideContentFrame = useMemo(() => !isSmall() && currentStepKey === 'store', [currentStepKey])

  const resetAssessment = useCallback(() => {
    setTags([])
    setEndNodeTags([])
    setCurrentStepKey('root')
    setShowingCtaButton(false)
  }, [])

  const onCloseModal = useCallback(() => {
    setShowingLauncher(true)
    setShowingContent(false)
    setShowAssessmentContent(false)
    setPluginState('closed')
    timeout.set('hideLauncher', () => setDisappear(true), 10000)
  }, [setShowAssessmentContent, setShowingContent, setShowingLauncher])

  const onToggleContent = useCallback(() => {
    mixpanel.track('Toggled Plugin', { hostname: location.hostname, action: showingContent ? 'close' : 'open' })
    mixpanel.time_event('Toggled Plugin')
    if (showingContent) {
      resetAssessment()
      setPluginState('closed')
      timeout.set('hideLauncher', () => setDisappear(true), 10000)
    } else {
      setPluginState('opened')
      timeout.clear('hideLauncher')
    }

    if (showingContent && isSmall()) {
      setIsUnmounting(true)
      return timeout.set(
        'exitOnMobile',
        () => {
          setIsUnmounting(false)
          setShowingContent(false)
          setShowAssessmentContent(false)
        },
        400
      )
    }

    setShowingContent(disappear ? false : !showingContent)
    if (showingContent) setShowAssessmentContent(false)

    setShowingBubbles(false)
  }, [disappear, resetAssessment, setShowAssessmentContent, setShowingBubbles, setShowingContent, showingContent])

  useEffect(() => {
    if (showingContent && hostname === 'www.delius-contract.de') setShowAssessmentContent(true)
  }, [setShowAssessmentContent, showingContent])

  if (!module) return

  return (
    <AppBase
      Component={
        <AssessmentBase
          assessmentIsMainFlow={hostname === 'www.delius-contract.de'}
          assessmentState={assessmentState}
          currentStepKey={currentStepKey}
          endNodeTags={endNodeTags}
          module={module}
          onCloseModal={onCloseModal}
          resetAssessment={resetAssessment}
          setAssessmentState={setAssessmentState}
          setCurrentStepKey={setCurrentStepKey}
          setEndNodeTags={setEndNodeTags}
          setShowingContent={setShowingContent}
          setShowingCtaButton={setShowingCtaButton}
          setShowingLauncher={setShowingLauncher}
          setTags={setTags}
          showingCtaButton={showingCtaButton}
          tags={tags}
        />
      }
      data={module}
      disappear={disappear}
      hideContentFrame={hideContentFrame}
      isUnmounting={isUnmounting}
      onToggleContent={onToggleContent}
      persona={module.persona || module.launcher.persona}
      pluginState={pluginState}
      setShowAssessmentContent={setShowAssessmentContent}
      showAssessmentContent={showAssessmentContent}
      showingBubbles={showingBubbles}
      showingContent={showingContent}
      showingLauncher={showingLauncher}
      skipContentEntry={hostname === 'www.pierre-cardin.de'}
    />
  )
}

export default Plugin
