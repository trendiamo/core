import Content from './content'
import Header from './header'
import Modal from 'shared/modal'
import { h } from 'preact'
import { useCallback, useEffect } from 'preact/hooks'

const StoreModal = ({ closeModal, results, goToPrevStep, step, module, setShowingLauncher, setShowingContent }) => {
  const newGoToPrevStep = useCallback(() => {
    setShowingLauncher(true)
    setShowingContent(true)
    goToPrevStep()
  }, [goToPrevStep, setShowingContent, setShowingLauncher])

  useEffect(() => {
    setShowingContent(false)
    setShowingLauncher(false)
  }, [setShowingContent, setShowingLauncher])

  // TODO: this was: Modal / Frame / ErrorBoundaries / FrameChild
  return (
    <Modal allowBackgroundClose closeModal={closeModal}>
      <div>
        <Header goToPrevStep={newGoToPrevStep} step={step} />
        <Content flowType={module && module.flowType} results={results} />
      </div>
    </Modal>
  )
}

export default StoreModal
