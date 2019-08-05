import auth from 'auth'
import React from 'react'
import routes from 'app/routes'
import { Tooltip } from 'onboarding/elements'

const editorRoleOrder = ['simpleChats', 'pictures']

const nonEditorRoleOrder = ['triggers', 'showcases', 'simpleChats', 'outros', 'pictures', 'sellers']

const order = () => (auth.getAccountRole() === 'editor' ? editorRoleOrder : nonEditorRoleOrder)

const editorRoleSteps = () => ({
  simpleChats: {
    target: '.onboard-simple-chats',
    content: <Tooltip body="Create your Simple Chats here." nextRoute={routes.picturesList()} />,
    placement: 'right',
    disableBeacon: true,
    title: 'Simple Chats',
  },
  pictures: {
    target: '.onboard-pictures',
    content: <Tooltip body="Manage your pictures here." toStage1 />,
    placement: 'right',
    disableBeacon: true,
    title: 'Image Gallery',
  },
})

const nonEditorRoleSteps = () => ({
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
    content: <Tooltip body="Manage your pictures here." nextRoute={routes.sellersList()} />,
    placement: 'right',
    disableBeacon: true,
    title: 'Image Gallery',
  },
  sellers: {
    target: '.onboard-sellers',
    content: <Tooltip body="Create your Sellers here." create nextRoute={routes.sellerCreate()} toStage1 />,
    placement: 'right',
    disableBeacon: true,
    title: 'Sellers',
  },
})

const steps = () => (auth.getAccountRole() === 'editor' ? editorRoleSteps() : nonEditorRoleSteps())

export default { steps, order }
