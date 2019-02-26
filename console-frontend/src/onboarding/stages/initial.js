import React from 'react'
import routes from 'app/routes'
import { changeStage } from 'onboarding/scenario-actions'
import { Tooltip } from 'onboarding/elements'

const order = ['triggers', 'showcases', 'navigations', 'scriptedChats', 'simpleChats', 'outros', 'personas']

const steps = {
  triggers: {
    target: '.onboard-triggers',
    content: <Tooltip body="Create your Triggers here." nextRoute={routes.showcasesList()} />,
    placement: 'right',
    disableBeacon: true,
    title: 'Triggers',
  },
  showcases: {
    target: '.onboard-showcases',
    content: <Tooltip body="Create your Showcases here." nextRoute={routes.navigationsList()} />,
    placement: 'right',
    disableBeacon: true,
    title: 'Showcases',
  },
  navigations: {
    target: '.onboard-navigations',
    content: <Tooltip body="Create your Navigations here." nextRoute={routes.scriptedChatsList()} />,
    placement: 'right',
    disableBeacon: true,
    title: 'Navigations',
  },
  scriptedChats: {
    target: '.onboard-scripted-chats',
    content: <Tooltip body="Create your Scripted Chats here." nextRoute={routes.outrosList()} />,
    placement: 'right',
    disableBeacon: true,
    title: 'Scripted Chats',
  },
  simpleChats: {
    target: '.onboard-simple-chats',
    content: <Tooltip body="Create your Simple Chats here." nextRoute={routes.personasList()} />,
    placement: 'right',
    disableBeacon: true,
    title: 'Simple Chats',
  },
  outros: {
    target: '.onboard-outros',
    content: <Tooltip body="Create your Outros here." nextRoute={routes.simpleChatsList()} />,
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

export default { steps, order }
