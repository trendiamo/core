// import FocusLock from 'react-focus-lock'
import IconClose from 'icons/icon-close.svg'
import React from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { compose } from 'recompose'

const StyledIconClose = styled(IconClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  fill: #fff;
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 12340000005;
`

const Background = styled.div.attrs({
  role: 'presentation',
  tabIndex: '-1',
})`
  position: fixed;
  top: 0;
  bottom: -50;
  padding-bottom: 50;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 12340000000;
`

const Dialog = styled.div.attrs({
  role: 'dialog',
})`
  background-color: white;
  width: 100%;
  max-width: 60em;
`

const ModalComp = compose(
  withHotkeys({
    [escapeKey]: ({ onRequestClose }) => onRequestClose,
  })
)(({ allowBackgroundClose, onRequestClose, children }) => (
  <Background onClick={allowBackgroundClose && onRequestClose}>
    <StyledIconClose onClick={onRequestClose} />
    <Dialog>
      {/* <FocusLock autofocus={false}>{children}</FocusLock> there's a bug with using this in an iframe */}
      {children}
    </Dialog>
  </Background>
))

const Modal = ({ appElement, allowBackgroundClose, onRequestClose, isOpen, children }) =>
  isOpen
    ? ReactDom.createPortal(
        <ModalComp allowBackgroundClose={allowBackgroundClose} onRequestClose={onRequestClose}>
          {children}
        </ModalComp>,
        appElement
      )
    : null

export default Modal
