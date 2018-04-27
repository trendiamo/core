import AuthForm from './auth-form'
import IconLogin from 'icons/icon-login'
import Modal from 'react-modal'
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'

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
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
}

const AuthModal = ({ appElement, isAuthModalOpen, closeAuthModal, openAuthModal }) => (
  <React.Fragment>
    <a onClick={openAuthModal}>
      <IconLogin />
    </a>
    <Modal
      appElement={appElement}
      contentLabel="Authorization Modal"
      isOpen={isAuthModalOpen}
      onRequestClose={closeAuthModal}
      style={customStyles}
    >
      <AuthForm closeAuthModal={closeAuthModal} />
    </Modal>
  </React.Fragment>
)

export default compose(
  withState('isAuthModalOpen', 'setIsAuthModalOpen', false),
  withHandlers({
    closeAuthModal: ({ setIsAuthModalOpen }) => () => setIsAuthModalOpen(false),
    openAuthModal: ({ setIsAuthModalOpen }) => () => setIsAuthModalOpen(true),
  })
)(AuthModal)
