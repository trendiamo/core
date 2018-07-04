import { Button } from 'shared/buttons'
import Cookies from 'js-cookie'
import { isSnapshot } from 'ext/react-snapshot'
import React from 'react'
import SubscribeModal from './subscribe-modal'
import { compose, lifecycle, withHandlers, withState } from 'recompose'

const SubscribeButton = ({ openModal, closeModal, isModalOpen }) => (
  <React.Fragment>
    <Button medium onClick={openModal}>
      {'Subscribe'}
    </Button>
    <SubscribeModal closeModal={closeModal} isModalOpen={isModalOpen} />
  </React.Fragment>
)

export default compose(
  withState('isModalOpen', 'setIsModalOpen', false),
  withHandlers({
    closeModal: ({ setIsModalOpen }) => () => {
      Cookies.set('isSubscriptionModalClosed', true)
      setIsModalOpen(false)
    },
    openModal: ({ setIsModalOpen }) => () => {
      setIsModalOpen(true)
    },
  }),
  lifecycle({
    componentWillMount() {
      const { setIsModalOpen } = this.props
      if (!isSnapshot && !Cookies.get('isSubscriptionModalClosed')) {
        setTimeout(() => setIsModalOpen(true), 3000)
      }
    },
  })
)(SubscribeButton)
