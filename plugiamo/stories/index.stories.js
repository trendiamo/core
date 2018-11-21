import Arrow from 'shared/arrow'
import Welcome from './welcome'
import { action } from '@storybook/addon-actions'
import { Basics, CoverFixedPositionLogic } from './layout'
import { Card, CardContent, CardImg } from 'shared/card'
import { Curation, Outro, ScriptedChat } from './flows'
import { h } from 'preact'
import { IconAnimatedEllipsis, IconChevronLeft, IconChevronRight, IconClose } from 'icons'
import { List, ListChevron, ListContent, ListImg, ListItem } from 'shared/list'
import { storiesOf } from '@storybook/react'
import './styles.css'

storiesOf('Welcome', module).add('README', Welcome)

storiesOf('Layout', module)
  .add('Basics', Basics)
  .add('Cover fixed position logic', CoverFixedPositionLogic)

storiesOf('Flows', module)
  .add('Curation', Curation)
  .add('Scripted Chat', ScriptedChat)
  .add('Outro', Outro)

storiesOf('Basic Components', module)
  .add('Arrow', () => <Arrow />)
  .add('Card', () => (
    <Card style={{ width: '100px' }}>
      <CardImg src="https://placeimg.com/200/200/any" />
      <CardContent>{'Buy that'}</CardContent>
    </Card>
  ))
  .add('List', () => (
    <div style={{ height: '500px', maxWidth: '360px' }}>
      <List>
        <ListItem onClick={action('clicked-list-item')}>
          <ListImg src="https://placeimg.com/200/200/any" />
          <ListContent>{'Buy this'}</ListContent>
          <ListChevron />
        </ListItem>
        <ListItem onClick={action('clicked-list-item')}>
          <ListImg src="https://placeimg.com/200/200/any" />
          <ListContent>{'Buy that'}</ListContent>
          <ListChevron />
        </ListItem>
      </List>
    </div>
  ))

storiesOf('Icons', module)
  .add('close', () => <IconClose style={{ height: 24, width: 24 }} />)
  .add('chevron left', () => <IconChevronLeft style={{ height: 24, width: 24 }} />)
  .add('chevron right', () => <IconChevronRight style={{ height: 24, width: 24 }} />)
  .add('animated ellipisis', () => <IconAnimatedEllipsis style={{ height: 24, width: 24 }} />)
