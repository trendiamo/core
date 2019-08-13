import AssessmentBase from './base'
import { h } from 'preact'
import { isSmall } from 'utils'
import { useCallback, useEffect, useState } from 'preact/hooks'

const Assessment = ({
  isDelius,
  data,
  setDisappearTimeout,
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
    isDelius,
    setDisappearTimeout,
    setDisappear,
    setHideContentFrame,
    setPluginState,
    setShowAssessmentContent,
    setShowingContent,
    setShowingLauncher,
  ])

  useEffect(() => {
    if (showingContent && isDelius) setShowAssessmentContent(true)
  }, [isDelius, setShowAssessmentContent, showingContent])

  useEffect(() => {
    setHideContentFrame(!isSmall() && currentStepKey === 'store')
  }, [currentStepKey, setHideContentFrame])

  return (
    <AssessmentBase
      assessmentIsMainFlow={isDelius}
      assessmentState={assessmentState}
      currentStepKey={currentStepKey}
      data={data}
      endNodeTags={endNodeTags}
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
