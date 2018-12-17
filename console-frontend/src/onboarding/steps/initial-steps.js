import React from 'react'
import routes from 'app/routes'
import { changeStage } from 'onboarding/scenario-actions'
import { Tooltip } from 'onboarding/elements'

const steps = {
  triggers: {
    target: '.onboard-triggers',
    content: <Tooltip body="Create your Triggers here." nextRoute={routes.curationsList()} />,
    placement: 'right',
    disableBeacon: true,
    title: 'Triggers',
  },
  curations: {
    target: '.onboard-curations',
    content: <Tooltip body="Create your Curations here." nextRoute={routes.scriptedChatsList()} />,
    placement: 'right',
    disableBeacon: true,
    title: 'Curations',
  },
  scriptedChats: {
    target: '.onboard-scripted-chats',
    content: <Tooltip body="Create your Scripted Chats here." nextRoute={routes.outrosList()} />,
    placement: 'right',
    disableBeacon: true,
    title: 'Scripted Chats',
  },
  outros: {
    target: '.onboard-outros',
    content: <Tooltip body="Create your Outros here." nextRoute={routes.personasList()} />,
    placement: 'right',
    disableBeacon: true,
    title: 'Outros',
  },
  personas: {
    target: '.onboard-personas',
    content: (
      <Tooltip body="Create your Personas here." callback={changeStage(1)} create nextRoute={routes.personaCreate()} />
    ),
    placement: 'right',
    disableBeacon: true,
    title: 'Personas',
  },
}

export default [steps.triggers, steps.curations, steps.scriptedChats, steps.outros, steps.personas]
