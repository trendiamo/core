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

const FrameChild = ({ header, results, goToPrevStep }) => (
  <div>
    <Header goToPrevStep={goToPrevStep} header={header} />
    <Content results={results} />
  </div>
)

const ModalTemplate = ({ closeModal, isOpen, results, header, goToPrevStep }) => (
  <Wrapper allowBackgroundClose closeModal={closeModal} isOpen={isOpen}>
    <FrameBase style={iframeStyle}>
      <FrameChild goToPrevStep={goToPrevStep} header={header} results={results} />
    </FrameBase>
  </Wrapper>
)

const Modal = compose(
  withState('isOpen', 'setIsOpen', true),
  withHandlers({
    closeModal: ({ setIsOpen, setShowingLauncher }) => () => {
      setIsOpen(false)
      setShowingLauncher(true)
    },
    goToPrevStep: ({ goToPrevStep, setIsOpen, setShowingLauncher, setShowingContent }) => () => {
      setIsOpen(false)
      setShowingLauncher(true)
      setShowingContent(true)
      goToPrevStep()
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
