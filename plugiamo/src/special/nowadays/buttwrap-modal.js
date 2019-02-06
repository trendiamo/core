import Portal from 'preact-portal'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { compose, withHandlers } from 'recompose'
import { h } from 'preact'
import { IconClose } from 'plugin-base'
import { proceedToCheckout } from './cart'

const ModalComp = compose(
  withHotkeys({
    [escapeKey]: ({ closeModal }) => closeModal,
  })
)(({ closeModal, children }) => (
  <div
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
      }}
    />
    <div
      role="dialog"
      style={{
        padding: '20px',
        borderRadius: '7px',
        textAlign: 'center',
        backgroundColor: 'white',
        width: window.innerWidth > 600 ? '40%' : '55%',
        maxWidth: '60em',
      }}
    >
      {children}
    </div>
  </div>
))

const Modal = compose(
  withHandlers({
    acceptTerms: ({ closeModal }) => () => {
      window.$('#CartPageAgree').prop('checked', true)
      closeModal()
      proceedToCheckout()
    },
  })
)(({ closeModal, acceptTerms, className, isOpen, into = 'body' }) =>
  isOpen ? (
    <Portal into={into}>
      <ModalComp closeModal={closeModal}>
        <p>
          {'To proceed you need to agree with the '}
          <a
            href="https://www.buttwrap.com/pages/terms-conditions"
            rel="noopener noreferrer"
            style={{ textDecoration: 'underline' }}
            target="_blank"
          >
            <br />
            {'Terms and conditions'}
          </a>
        </p>
        <div style={{ display: 'flex' }}>
          <button className={className} onClick={() => acceptTerms()} style={{ flex: '1' }} type="button">
            {'I Agree'}
          </button>
          <button className={className} onClick={() => closeModal()} style={{ flex: '1' }} type="button">
            {'Cancel'}
          </button>
        </div>
      </ModalComp>
    </Portal>
  ) : null
)

export default Modal
