import Welcome from './welcome'
// import { action } from '@storybook/addon-actions'
import { Basics, ChatBubble, CoverFixedPositionLogic, PulsatingEffect } from './layout'
import { h } from 'preact'
import { IconAnimatedEllipsis, IconChevronLeft, IconChevronRight, IconClose } from 'plugin-base'
import { Outro, ScriptedChat, Showcase } from './modules'
import { storiesOf } from '@storybook/react'
import './styles.css'

storiesOf('Welcome', module).add('README', Welcome)

storiesOf('Layout', module)
  .add('Basics', Basics)
  .add('Cover fixed position logic', CoverFixedPositionLogic)
  .add('Pulsating Launcher', PulsatingEffect)
  .add('Launcher Chat Bubble', ChatBubble)

storiesOf('Modules', module)
  .add('Showcase', Showcase)
  .add('Scripted Chat', ScriptedChat)
  .add('Outro', Outro)

storiesOf('Icons', module)
  .add('close', () => <IconClose style={{ height: 24, width: 24 }} />)
  .add('chevron left', () => <IconChevronLeft style={{ height: 24, width: 24 }} />)
  .add('chevron right', () => <IconChevronRight style={{ height: 24, width: 24 }} />)
  .add('animated ellipisis', () => <IconAnimatedEllipsis style={{ height: 24, width: 24 }} />)
