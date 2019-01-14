import Welcome from './welcome'
// import { action } from '@storybook/addon-actions'
import { Basics, CoverFixedPositionLogic, PulsatingEffect } from './layout'
import { h } from 'preact'
import { IconAnimatedEllipsis, IconChevronLeft, IconChevronRight, IconClose } from 'icons'
import { Navigation, Outro, ScriptedChat, Showcase, Spotahome } from './modules'
import { storiesOf } from '@storybook/react'
import './styles.css'

storiesOf('Welcome', module).add('README', Welcome)

storiesOf('Layout', module)
  .add('Basics', Basics)
  .add('Cover fixed position logic', CoverFixedPositionLogic)
  .add('Pulsating Launcher', PulsatingEffect)

storiesOf('Modules', module)
  .add('Showcase', Showcase)
  .add('Navigation', Navigation)
  .add('Scripted Chat', ScriptedChat)
  .add('Outro', Outro)
  .add('Spotahome', Spotahome)

storiesOf('Icons', module)
  .add('close', () => <IconClose style={{ height: 24, width: 24 }} />)
  .add('chevron left', () => <IconChevronLeft style={{ height: 24, width: 24 }} />)
  .add('chevron right', () => <IconChevronRight style={{ height: 24, width: 24 }} />)
  .add('animated ellipisis', () => <IconAnimatedEllipsis style={{ height: 24, width: 24 }} />)
