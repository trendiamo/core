import React from 'react'
import { ModalFirstSeller } from 'onboarding/elements'

const order = () => ['sellerCreated']

const steps = () => ({
  sellerCreated: {
    target: 'body',
    content: <ModalFirstSeller />,
    placement: 'center',
    disableBeacon: true,
    showSpotlight: false,
  },
})

export default { steps, order }
