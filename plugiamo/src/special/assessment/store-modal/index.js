import Content from './content'
import Header from './header'
import Wrapper from 'shared/modal'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { FrameBase } from 'plugin-base'
import { h } from 'preact'

const iframeStyle = {
  width: '100%',
  border: 0,
  background: '#fff',
  borderRadius: '6px',
  maxHeight: '80vh',
  height: '1000px',
  minHeight: '400px',
}

const FrameChild = ({ step, results, goToPrevStep, flowType }) => (
  <div>
    <Header goToPrevStep={goToPrevStep} step={step} />
    <Content flowType={flowType} results={results} />
  </div>
)

const ModalTemplate = ({ onCloseModal, isOpen, results, goToPrevStep, step, module }) => (
  <Wrapper allowBackgroundClose closeModal={onCloseModal} isOpen={isOpen}>
    <FrameBase style={iframeStyle}>
      <FrameChild flowType={module && module.flowType} goToPrevStep={goToPrevStep} results={results} step={step} />
    </FrameBase>
  </Wrapper>
)

const Modal = compose(
  withState('isOpen', 'setIsOpen', true),
  withHandlers({
    goToPrevStep: ({ goToPrevStep, setIsOpen, setShowingLauncher, setShowingContent }) => () => {
      setIsOpen(false)
      setShowingLauncher(true)
      setShowingContent(true)
      goToPrevStep()
    },
    onCloseModal: ({ onToggleContent, setIsOpen, setShowingLauncher }) => () => {
      setIsOpen(false)
      setShowingLauncher(true)
      onToggleContent()
    },
  }),
  lifecycle({
    componentDidMount() {
      const { setShowingLauncher, setShowingContent } = this.props
      setShowingContent(false)
      setShowingLauncher(false)
    },
  })
)(ModalTemplate)

export default Modal
