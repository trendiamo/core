import Iframe from 'ext/iframe'
import Modal from 'ext/modal'
import React from 'react'
import styled from 'styled-components'
import Tagger from 'tagger'
import withHotkeys from 'ext/recompose/with-hotkeys'
import { compose, withHandlers, withProps, withState } from 'recompose'

const tKey = 84 // ascii code for t key

const ModalContent = styled.div`
  padding: 1rem;
`

const StyledIframe = styled(Iframe)`
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 12340000000;
`

const App = ({ closeModal, iframeRef, isModalOpen, getModalAppElement }) => (
  <StyledIframe hidden={!isModalOpen} ref={iframeRef} title="Frekkls">
    {isModalOpen ? (
      <Modal appElement={getModalAppElement()} isOpen={isModalOpen} onRequestClose={closeModal}>
        <ModalContent>
          <Tagger />
        </ModalContent>
      </Modal>
    ) : (
      <div />
    )}
  </StyledIframe>
)

export default compose(
  withProps({ iframeRef: React.createRef() }),
  withState('isModalOpen', 'setIsModalOpen', false),
  withHandlers({
    openModal: ({ setIsModalOpen }) => () => setIsModalOpen(true),
    closeModal: ({ setIsModalOpen }) => () => setIsModalOpen(false),
  }),
  withHotkeys({
    [tKey]: ({ openModal }) => openModal,
  }),
  withHandlers({
    getModalAppElement: ({ iframeRef }) => () => iframeRef.current.contentDocument.body,
  })
)(App)
