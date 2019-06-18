import FocusLock from 'react-focus-lock'
import Loader from 'icons/loader.svg'
import withHotkeys, { escapeKey } from 'ext/hooks/with-hotkeys'
import { createPortal } from 'preact/compat'
import { h } from 'preact'
import { IconClose } from 'plugin-base'

const styles = {
  modal: {
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
  },
  iconClose: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fill: '#fff',
    width: '32px',
    height: '32px',
    cursor: 'pointer',
    zIndex: '12340000005',
  },
  dialog: {
    width: '100%',
    maxWidth: '60em',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    height: '150px',
    width: '150px',
  },
}

const ModalTemplate = ({ allowBackgroundClose, closeModal, children, isResourceLoaded }) => {
  return (
    <div onClick={allowBackgroundClose && closeModal} role="presentation" style={styles.modal} tabIndex="-1">
      <IconClose onClick={closeModal} style={styles.iconClose} />
      <div role="dialog" style={styles.dialog}>
        {isResourceLoaded === false && (
          <div style={styles.loaderContainer}>
            <Loader style={styles.loader} />
          </div>
        )}
        <FocusLock>{children}</FocusLock>
      </div>
    </div>
  )
}

const ModalComp = withHotkeys({
  [escapeKey]: ({ closeModal }) => closeModal,
})(ModalTemplate)

const Modal = ({ allowBackgroundClose, closeModal, isOpen, container, children, isResourceLoaded }) => {
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
    <ModalComp allowBackgroundClose={allowBackgroundClose} closeModal={closeModal} isResourceLoaded={isResourceLoaded}>
      {children}
    </ModalComp>,
    container
  )
}

export default Modal
