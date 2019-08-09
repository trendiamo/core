import Content from './content'
import ErrorBoundaries from 'ext/error-boundaries'
import Frame from './frame'
import Header from './header'
import Modal from 'shared/modal'
import { h } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

const iframeStyle = {
  width: '100%',
  border: 0,
  background: '#fff',
  borderRadius: '6px',
  maxHeight: '80vh',
  height: '1000px',
  minHeight: '400px',
}

const FrameChild = ({ step, results, goToPrevStep, flowType }) => {
  return (
    <div>
      <Header goToPrevStep={goToPrevStep} step={step} />
      <Content flowType={flowType} results={results} />
    </div>
  )
}

const StoreModal = ({
  onCloseModal,
  resetAssessment,
  results,
  goToPrevStep,
  step,
  module,
  setShowingLauncher,
  setShowingContent,
}) => {
  const [isOpen, setIsOpen] = useState(true)

  const newGoToPrevStep = useCallback(() => {
    setIsOpen(false)
    setShowingLauncher(true)
    setShowingContent(true)
    goToPrevStep()
  }, [goToPrevStep, setShowingContent, setShowingLauncher])

  const newOnCloseModal = useCallback(() => {
    setIsOpen(false)
    resetAssessment()
    onCloseModal()
  }, [onCloseModal, resetAssessment])

  useEffect(() => {
    setShowingContent(false)
    setShowingLauncher(false)
  }, [setShowingContent, setShowingLauncher])

  return (
    <Modal allowBackgroundClose closeModal={newOnCloseModal} isOpen={isOpen}>
      <Frame style={iframeStyle}>
        <ErrorBoundaries>
          <FrameChild
            flowType={module && module.flowType}
            goToPrevStep={newGoToPrevStep}
            results={results}
            step={step}
          />
        </ErrorBoundaries>
      </Frame>
    </Modal>
  )
}

export default StoreModal
