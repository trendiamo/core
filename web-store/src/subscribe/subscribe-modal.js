import HubspotForm from 'react-hubspot-form'
import React from 'react'
import styled from 'styled-components'
import { branch, compose, renderNothing } from 'recompose'
import { Modal, ModalCloseIcon, ModalContent } from 'shared/modal'

const StyledImg = styled.img`
  border-radius: 2px 2px 0 0;
  width: 100%;
  object-fit: cover;
  vertical-align: top;
`

const StyledP = styled.p`
  margin: 0 0 1rem 0;
`

const SubscribeModal = ({ isModalOpen, closeModal }) => (
  <Modal contentLabel="Subscribe to our Newsletter" isOpen={isModalOpen} onRequestClose={closeModal}>
    <StyledImg alt="" src="//trnd-assets.imgix.net/newsletter.png" />
    <ModalContent>
      <StyledP>{'Sign-up to the hottest trendiamo news and get 10% off your first purchase!'}</StyledP>
      <HubspotForm css="" formId="d67387a6-34f1-493d-8f67-d8b418cd7e01" portalId="4568386" />
    </ModalContent>
    <ModalCloseIcon closeModal={closeModal} />
  </Modal>
)

export default compose(branch(({ isModalOpen }) => !isModalOpen, renderNothing))(SubscribeModal)
