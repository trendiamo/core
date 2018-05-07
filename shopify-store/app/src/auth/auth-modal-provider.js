import Account from './account'
import { isLoggedIn } from 'utils'
import Login from './login'
import PropTypes from 'prop-types'
import React from 'react'
import Register from './register'
import RequireAuth from './require-auth'
import StyledModal from 'components/styled-modal'
import { compose, withContext, withHandlers, withProps, withState } from 'recompose'

const modalContentStyle = {
  padding: '2rem',
}

const AuthModalProvider = ({
  appElement,
  children,
  email,
  isAuthModalOpen,
  isLoggedIn,
  closeAuthModal,
  setView,
  view,
}) => (
  <React.Fragment>
    {children}
    <StyledModal
      appElement={appElement}
      contentLabel="Authorization Modal"
      contentStyle={modalContentStyle}
      isOpen={isAuthModalOpen}
      onRequestClose={closeAuthModal}
    >
      {isLoggedIn ? (
        <Account closeAuthModal={closeAuthModal} email={email} />
      ) : view === 'login' ? (
        <Login closeAuthModal={closeAuthModal} setView={setView} />
      ) : view === 'register' ? (
        <Register closeAuthModal={closeAuthModal} setView={setView} />
      ) : (
        <RequireAuth closeAuthModal={closeAuthModal} setView={setView} />
      )}
    </StyledModal>
  </React.Fragment>
)

export default compose(
  withState('isAuthModalOpen', 'setIsAuthModalOpen', false),
  withState('view', 'setView'),
  withProps(() => ({
    email: localStorage.getItem('authEmail'),
    isLoggedIn: isLoggedIn(),
  })),
  withHandlers({
    checkLoginModal: ({ isLoggedIn, setIsAuthModalOpen }) => () => {
      if (!isLoggedIn) {
        setIsAuthModalOpen(true)
        return true
      }
    },
    closeAuthModal: ({ setIsAuthModalOpen, setView }) => () => {
      setView(undefined)
      setIsAuthModalOpen(false)
    },
    openAuthModal: ({ setIsAuthModalOpen, setView }) => () => {
      setView('login')
      setIsAuthModalOpen(true)
    },
  }),
  withContext(
    {
      checkLoginModal: PropTypes.func,
      openAuthModal: PropTypes.func,
    },
    ({ checkLoginModal, openAuthModal }) => ({ checkLoginModal, openAuthModal })
  )
)(AuthModalProvider)
