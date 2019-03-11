import Content from './content'
import Frame from 'shared/frame'
import Header from './header'
import Wrapper from 'shared/modal'
import { compose, withHandlers, withState } from 'recompose'
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

const FrameChild = ({ header, results }) => (
  <div>
    <Header header={header} />
    <Content results={results} />
  </div>
)

const ModalTemplate = ({ closeModal, isOpen, results, header }) => (
  <Wrapper allowBackgroundClose closeModal={closeModal} isOpen={isOpen}>
    <Frame style={iframeStyle}>
      <FrameChild header={header} results={results} />
    </Frame>
  </Wrapper>
)

const Modal = compose(
  withState('isOpen', 'setIsOpen', true),
  withHandlers({
    closeModal: ({ setIsOpen }) => () => {
      setIsOpen(false)
    },
  })
)(ModalTemplate)

export default Modal
