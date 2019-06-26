import AssessmentBase from './base'
import useTimeout from 'ext/hooks/use-timeout'
import { assessmentHostname } from 'config'
import { h } from 'preact'
import { isSmall } from 'utils'
import { useCallback, useEffect, useState } from 'preact/hooks'

const isDelius = assessmentHostname === 'www.delius-contract.de'

const Assessment = ({
  module,
  setDisappear,
  setHideContentFrame,
  setShowAssessmentContent,
  setShowingContent,
  setShowingLauncher,
  setPluginState,
  showingContent,
}) => {
  const [assessmentState, setAssessmentState] = useState({})
  const [tags, setTags] = useState(assessmentState.key ? assessmentState.key.split('>') : [])
  const [endNodeTags, setEndNodeTags] = useState([])
  const [showingCtaButton, setShowingCtaButton] = useState(false)
  const [currentStepKey, setCurrentStepKey] = useState(assessmentState.key || 'root')
  const [setDisappearTimeout, clearDisappearTimeout] = useTimeout()

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
    setHideContentFrame(false)
    setDisappearTimeout(() => setDisappear(true), isDelius ? 500 : 10000)
  }, [
    setDisappear,
    setDisappearTimeout,
    setHideContentFrame,
    setPluginState,
    setShowAssessmentContent,
    setShowingContent,
    setShowingLauncher,
  ])

  useEffect(() => {
    if (showingContent) clearDisappearTimeout()
  }, [clearDisappearTimeout, showingContent])

  useEffect(() => {
    if (showingContent && isDelius) setShowAssessmentContent(true)
  }, [setShowAssessmentContent, showingContent])

  useEffect(() => {
    setHideContentFrame(!isSmall() && currentStepKey === 'store')
  }, [currentStepKey, setHideContentFrame])

  if (!module) return

  return (
    <AssessmentBase
      assessmentIsMainFlow={isDelius}
      assessmentState={assessmentState}
      currentStepKey={currentStepKey}
      endNodeTags={endNodeTags}
      module={module}
      onCloseModal={onCloseModal}
      resetAssessment={resetAssessment}
      setAssessmentState={setAssessmentState}
      setCurrentStepKey={setCurrentStepKey}
      setEndNodeTags={setEndNodeTags}
      setShowAssessmentContent={setShowAssessmentContent}
      setShowingContent={setShowingContent}
      setShowingCtaButton={setShowingCtaButton}
      setShowingLauncher={setShowingLauncher}
      setTags={setTags}
      showingCtaButton={showingCtaButton}
      tags={tags}
    />
  )
}

export default Assessment
