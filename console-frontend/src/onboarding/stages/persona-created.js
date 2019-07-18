import React from 'react'
import { ModalFirstPersona } from 'onboarding/elements'

const order = () => ['personaCreated']

const steps = () => ({
  personaCreated: {
    target: 'body',
    content: <ModalFirstPersona />,
    placement: 'center',
    disableBeacon: true,
    showSpotlight: false,
  },
})

export default { steps, order }
