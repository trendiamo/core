import { isLoggedIn } from 'utils'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import React from 'react'
import { compose, withContext, withHandlers, withState } from 'recompose'

const customStyles = {
  content: {
    border: 0,
    borderRadius: '20px',
    bottom: 'auto',
    left: '50%',
    marginRight: '-50%',
    maxWidth: '86%',
    padding: '2rem',
    right: 'auto',
    textAlign: 'center',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
}

const AuthModalProvider = ({ appElement, children, isAuthModalOpen, closeAuthModal }) => (
  <React.Fragment>
    {children}
    <Modal
      appElement={appElement}
      contentLabel="Authorization Modal"
      isOpen={isAuthModalOpen}
      onRequestClose={closeAuthModal}
      style={customStyles}
    >
      <h1>{'Account erstellen'}</h1>
      <p>{'Du brauchst einen Account oder musst dich einloggen.'}</p>
      <button className="btn" onClick={closeAuthModal} type="button">
        {'Schließen'}
      </button>
    </Modal>
  </React.Fragment>
)

export default compose(
  withState('isAuthModalOpen', 'setIsAuthModalOpen', false),
  withHandlers({
    checkLoginModal: ({ setIsAuthModalOpen }) => () => {
      if (!isLoggedIn()) {
        setIsAuthModalOpen(true)
        return true
      }
    },
    closeAuthModal: ({ setIsAuthModalOpen }) => () => setIsAuthModalOpen(false),
  }),
  withContext(
    {
      checkLoginModal: PropTypes.func,
    },
    ({ checkLoginModal }) => ({ checkLoginModal })
  )
)(AuthModalProvider)
