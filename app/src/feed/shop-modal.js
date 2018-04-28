import Cookies from 'js-cookie'
import IconClose from 'icons/icon-close'
import Modal from 'react-modal'
import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers, withState } from 'recompose'

const customStyles = {
  content: {
    border: 0,
    borderRadius: '20px',
    bottom: 'auto',
    left: '50%',
    marginRight: '-50%',
    maxWidth: '86%',
    padding: 0,
    right: 'auto',
    textAlign: 'center',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
}

const Background = styled.div`
  background-image: url(//placeimg.com/640/480/any);
  background-position: top;
  background-size: cover;
  height: 175px;
`

const Logo = styled.img`
  position: absolute;
  margin-top: -40px;
  margin-left: -40px;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.3);
`

const Content = styled.div`
  padding: 4rem 3rem 2rem 3rem;
  h1 {
    font-size: 21px;
    font-weight: 500;
  }
  p {
    font-size: 18px;
    font-weight: 500;
    color: #3d4246;
  }
  button {
    width: 100%;
  }
`

const StyledIconClose = styled(IconClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #8e8e8e;
}
`

const ShopModal = ({ appElement, closeModal, isModalOpen }) => (
  <Modal
    appElement={appElement}
    contentLabel="Shop Modal"
    isOpen={isModalOpen}
    onRequestClose={closeModal}
    style={customStyles}
  >
    <Background />
    <Logo src="//placeimg.com/160/160/any" />
    <StyledIconClose onClick={closeModal} />
    <Content>
      <h1>{'Offizieller Merchandise von AlexV'}</h1>
      <p>{'Streng limitiert auf 150 Teile'}</p>
      <p>{'Shop-Eröffnung 28.04.2018'}</p>
      <button className="btn" onClick={closeModal} type="button">
        {'Jetzt Shoppen'}
      </button>
    </Content>
  </Modal>
)

export default compose(
  withState('isModalOpen', 'setIsModalOpen', () => !Cookies.get('isShopModalClosed')),
  withHandlers({
    closeModal: ({ setIsModalOpen }) => () => {
      Cookies.set('isShopModalClosed', true)
      setIsModalOpen(false)
    },
  })
)(ShopModal)
