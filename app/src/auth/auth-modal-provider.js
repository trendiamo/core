import { isLoggedIn } from 'utils'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import React from 'react'
import { compose, withContext, withHandlers, withState } from 'recompose'

const AuthModalProvider = ({ appElement, children, isAuthModalOpen, closeAuthModal }) => (
  <React.Fragment>
    {children}
    <Modal
      appElement={appElement}
      contentLabel="Authorization Modal"
      isOpen={isAuthModalOpen}
      onRequestClose={closeAuthModal}
    >
      <h1>{'Create account'}</h1>
      <p>{'You need to create an account or login first.'}</p>
      <button className="btn" onClick={closeAuthModal} type="button">
        {'Close'}
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
