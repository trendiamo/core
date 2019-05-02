import React from 'react'
import routes from 'app/routes'
import { changeStage } from 'onboarding/scenario-actions'
import { Tooltip } from 'onboarding/elements'

const order = ['triggers', 'showcases', 'simpleChats', 'outros', 'pictures', 'personas']

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
    content: <Tooltip body="Create your Showcases here." nextRoute={routes.simpleChatsList()} />,
    placement: 'right',
    disableBeacon: true,
    title: 'Showcases',
  },
  simpleChats: {
    target: '.onboard-simple-chats',
    content: <Tooltip body="Create your Simple Chats here." nextRoute={routes.outrosList()} />,
    placement: 'right',
    disableBeacon: true,
    title: 'Simple Chats',
  },
  outros: {
    target: '.onboard-outros',
    content: <Tooltip body="Create your Outros here." nextRoute={routes.picturesList()} />,
    placement: 'right',
    disableBeacon: true,
    title: 'Outros',
  },
  pictures: {
    target: '.onboard-pictures',
    content: <Tooltip body="Manage your pictures here." nextRoute={routes.personasList()} />,
    placement: 'right',
    disableBeacon: true,
    title: 'Pictures Gallery',
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
