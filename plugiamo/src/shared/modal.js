import Portal from 'preact-portal'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { compose } from 'recompose'
import { h } from 'preact'
import { IconClose } from 'plugin-base'

const ModalComp = compose(
  withHotkeys({
    [escapeKey]: ({ closeModal }) => closeModal,
  })
)(({ allowBackgroundClose, closeModal, children }) => (
  <div
    onClick={allowBackgroundClose && closeModal}
    role="presentation"
    style={{
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '12340000000',
    }}
    tabIndex="-1"
  >
    <IconClose
      onClick={closeModal}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        fill: '#fff',
        width: '32px',
        height: '32px',
        cursor: 'pointer',
        zIndex: '12340000005',
      }}
    />
    <div role="dialog" style={{ backgroundColor: 'white', width: '80%', maxWidth: '60em' }}>
      {children}
    </div>
  </div>
))

const Modal = ({ allowBackgroundClose, closeModal, isOpen, into = 'body', children }) =>
  isOpen ? (
    <Portal into={into}>
      <ModalComp allowBackgroundClose={allowBackgroundClose} closeModal={closeModal}>
        {children}
      </ModalComp>
    </Portal>
  ) : null

export default Modal
