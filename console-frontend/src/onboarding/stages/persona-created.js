import React from 'react'
import { ModalPersonaCreate } from 'onboarding/elements'

const order = ['personaCreated']

const steps = {
  personaCreated: {
    target: 'body',
    content: <ModalPersonaCreate />,
    placement: 'center',
    disableBeacon: true,
    showSpotlight: false,
  },
}

export default { steps, order }
