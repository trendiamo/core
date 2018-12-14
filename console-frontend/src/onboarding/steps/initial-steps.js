import React from 'react'
import routes from 'app/routes'
import { finalize } from 'onboarding/scenario-actions'
import { Tooltip } from 'onboarding/elements'

const steps = {
  triggers: {
    target: '.onboard-triggers',
    content: <Tooltip body="Create your Triggers here." nextRoute={routes.curationsList()} title="Triggers" />,
    placement: 'right',
    disableBeacon: true,
  },
  curations: {
    target: '.onboard-curations',
    content: <Tooltip body="Create your Curations here." nextRoute={routes.scriptedChatsList()} title="Curations" />,
    placement: 'right',
    disableBeacon: true,
  },
  scriptedChats: {
    target: '.onboard-scripted-chats',
    content: <Tooltip body="Create your Scripted Chats here." nextRoute={routes.outrosList()} title="Scripted Chats" />,
    placement: 'right',
    disableBeacon: true,
  },
  outros: {
    target: '.onboard-outros',
    content: <Tooltip body="Create your Outros here." nextRoute={routes.personasList()} title="Outros" />,
    placement: 'right',
    disableBeacon: true,
  },
  personas: {
    target: '.onboard-personas',
    content: (
      <Tooltip
        body="Create your Personas here."
        callback={finalize}
        create
        nextRoute={routes.personaCreate()}
        title="Personas"
      />
    ),
    placement: 'right',
    disableBeacon: true,
  },
}

export default [steps.triggers, steps.curations, steps.scriptedChats, steps.outros, steps.personas]
