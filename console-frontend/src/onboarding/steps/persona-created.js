import React from 'react'
import { ModalPersonaCreate } from 'onboarding/elements'

const steps = {
  personaCreated: {
    target: 'body',
    content: <ModalPersonaCreate />,
    placement: 'center',
    disableBeacon: true,
    showSpotlight: false,
  },
}

export default [steps.personaCreated]
