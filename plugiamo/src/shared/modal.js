import FocusLock from 'react-focus-lock'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { compose } from 'recompose'
import { createPortal } from 'preact/compat'
import { h } from 'preact'
import { IconClose } from 'plugin-base'

const ModalTemplate = ({ allowBackgroundClose, closeModal, children }) => (
  <div
    onClick={allowBackgroundClose && closeModal}
    role="presentation"
    style={{
      position: 'fixed',
      top: 0,
      bottom: -50,
      paddingBottom: 50,
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
    <div role="dialog" style={{ width: '100%', maxWidth: '60em' }}>
      <FocusLock>{children}</FocusLock>
    </div>
  </div>
)

const ModalComp = compose(
  withHotkeys({
    [escapeKey]: ({ closeModal }) => closeModal,
  })
)(ModalTemplate)

const Modal = ({ allowBackgroundClose, closeModal, isOpen, container, children }) => {
  if (!isOpen) return null

  if (!container) {
    container = document.querySelector('.trendiamo-modal')
    if (!container) {
      const trendiamoModal = document.createElement('div')
      trendiamoModal.classList.add('trendiamo-modal')
      document.body.appendChild(trendiamoModal)
      container = trendiamoModal
    }
  }

  return createPortal(
    <ModalComp allowBackgroundClose={allowBackgroundClose} closeModal={closeModal}>
      {children}
    </ModalComp>,
    container
  )
}

export default Modal
