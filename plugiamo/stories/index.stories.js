import Arrow from 'shared/arrow'
import Button from 'shared/button'
import { action } from '@storybook/addon-actions'
import { Card, CardContent, CardImg } from 'shared/card'
import { ChatBackground, ChatMessage, ChatOptions } from 'app/content/scripted-chat/shared'
import { h } from 'preact'
import { IconAnimatedEllipsis, IconChevronLeft, IconChevronRight, IconClose } from 'icons'
import { linkTo } from '@storybook/addon-links'
import { List, ListChevron, ListContent, ListImg, ListItem } from 'shared/list'
import { storiesOf } from '@storybook/react'
import { Welcome } from '@storybook/react/demo'
import './styles.css'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Buttons')} />)

storiesOf('Arrows', module).add('arrow', () => <Arrow />)

storiesOf('Buttons', module)
  .add('simple', () => <Button>{'Buy this'}</Button>)
  .add('outline', () => <Button outline>{'Buy this'}</Button>)
  .add('fullWidth', () => <Button fullWidth>{'Buy this'}</Button>)
  .add('small', () => <Button small>{'Buy this'}</Button>)
  .add('medium', () => <Button medium>{'Buy this'}</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span aria-label="so cool" role="img">
        {'😀 😎 👍 💯'}
      </span>
    </Button>
  ))

storiesOf('Cards', module).add('simple', () => (
  <Card style={{ width: '100px' }}>
    <CardImg src="https://placeimg.com/200/200/any" />
    <CardContent>{'Buy that'}</CardContent>
  </Card>
))

storiesOf('Scripted Chat', module).add('simple', () => (
  <ChatBackground style={{ height: '500px', width: '300px' }}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ChatMessage isMessageShown log={{ from: 'Peter', message: { text: 'Hello 😃' }, timestamp: Date.now() }} />
      <ChatOptions log={{ options: [{ id: 1, text: 'This' }, { id: 2, text: 'That' }] }} />
    </div>
  </ChatBackground>
))

storiesOf('Icons', module)
  .add('close', () => <IconClose style={{ height: 24, width: 24 }} />)
  .add('chevron left', () => <IconChevronLeft style={{ height: 24, width: 24 }} />)
  .add('chevron right', () => <IconChevronRight style={{ height: 24, width: 24 }} />)
  .add('animated ellipisis', () => <IconAnimatedEllipsis style={{ height: 24, width: 24 }} />)

storiesOf('Lists', module).add('simple', () => (
  <List>
    <ListItem>
      <ListImg src="https://placeimg.com/200/200/any" />
      <ListContent>{'Buy this'}</ListContent>
      <ListChevron />
    </ListItem>
    <ListItem>
      <ListImg src="https://placeimg.com/200/200/any" />
      <ListContent>{'Buy that'}</ListContent>
      <ListChevron />
    </ListItem>
  </List>
))
