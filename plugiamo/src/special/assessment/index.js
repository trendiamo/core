import AssessmentBase from './base'
import { h } from 'preact'
import { isSmall } from 'utils'
import { useCallback, useEffect, useState } from 'preact/hooks'

const Assessment = ({
  isDelius,
  data,
  modalProps,
  setDisappearTimeout,
  setDisappear,
  setHideContentFrame,
  setModalProps,
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

  const closeModal = useCallback(() => {
    modalProps && modalProps.closeModal()
    setTimeout(() => {
      setShowingLauncher(true)
      setShowingContent(false)
      setShowAssessmentContent(false)
      setPluginState('closed')
      setHideContentFrame(false)
      setDisappearTimeout(() => setDisappear(true), isDelius ? 500 : 10000)
      setTags([])
      setEndNodeTags([])
      setCurrentStepKey('root')
      setShowingCtaButton(false)
    }, 100)
  }, [
    setShowingLauncher,
    setShowingContent,
    setShowAssessmentContent,
    setPluginState,
    setHideContentFrame,
    setDisappearTimeout,
    isDelius,
    modalProps,
    setDisappear,
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
      closeModal={closeModal}
      currentStepKey={currentStepKey}
      data={data}
      endNodeTags={endNodeTags}
      modalProps={modalProps}
      setAssessmentState={setAssessmentState}
      setCurrentStepKey={setCurrentStepKey}
      setEndNodeTags={setEndNodeTags}
      setModalProps={setModalProps}
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
