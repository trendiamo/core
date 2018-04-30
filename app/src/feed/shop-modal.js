import Cookies from 'js-cookie'
import IconClose from 'icons/icon-close'
import React from 'react'
import styled from 'styled-components'
import StyledModal from 'components/styled-modal'
import { compose, withHandlers, withState } from 'recompose'

const modalContentStyle = {
  maxWidth: '424px', // pixel-adjusted to workaround https://bugs.chromium.org/p/chromium/issues/detail?id=483381
  padding: '0 0 1px 0', // pixel-adjusted to workaround https://bugs.chromium.org/p/chromium/issues/detail?id=483381
  textAlign: 'center',
}

const Background = styled.div`
  background-image: url(//cdn.shopify.com/s/files/1/0024/7522/9242/files/popup.jpg);
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
  <StyledModal
    appElement={appElement}
    contentLabel="Shop Modal"
    contentStyle={modalContentStyle}
    isOpen={isModalOpen}
    onRequestClose={closeModal}
  >
    <Background />
    <Logo src="https://cdn.shopify.com/s/files/1/0024/7522/9242/files/alexv_logo_240x240.png" />
    <StyledIconClose onClick={closeModal} />
    <Content>
      <h1>{'Offizieller Merchandise von AlexV'}</h1>
      <p>{'Streng limitiert auf 150 Teile'}</p>
      <p>{'Shop-Eröffnung 28.04.2018'}</p>
      <button className="btn" onClick={closeModal} type="button">
        {'Jetzt Shoppen'}
      </button>
    </Content>
  </StyledModal>
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
