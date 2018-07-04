import IconClose from 'icons/close'
import Modal from 'react-modal'
import React from 'react'
import styled from 'styled-components'

const defaultModalStyle = {
  content: {
    border: 0,
    borderRadius: '2px',
    bottom: 'auto',
    left: '50%',
    marginRight: '-50%',
    maxWidth: '86%',
    minWidth: '400px',
    overflow: 'visible',
    padding: 0,
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '35%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
}

const TrndModal = ({ appElement, contentStyle, overlayStyle, ...otherProps }) => (
  <Modal
    appElement={appElement || document.body}
    style={{
      content: { ...defaultModalStyle.content, ...contentStyle },
      overlay: { ...defaultModalStyle.overlay, ...overlayStyle },
    }}
    {...otherProps}
  />
)

const CloseContainer = styled.div`
  color: black;
  cursor: pointer;
  line-height: 0;
  padding: 6px;
  position: absolute;
  right: 0;
  top: 0;

  @media (min-width: 1000px) {
    background-color: white;
    border-radius: 50%;
    right: -12px;
    top: -12px;
  }

  svg {
    height: 16px;
    width: 16px;
  }
`

const ModalCloseIcon = ({ closeModal }) => (
  <CloseContainer onClick={closeModal}>
    <IconClose />
  </CloseContainer>
)

const ModalContent = styled.div`
  padding: 20px;
`

export { ModalCloseIcon, ModalContent, TrndModal as Modal }
