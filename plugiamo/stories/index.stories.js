// import { action } from '@storybook/addon-actions'
import Arrow from 'shared/arrow'
import bounce from '../src/animations/bounce'
import Button from 'shared/button'
import { h } from 'preact'
import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import { Welcome } from '@storybook/react/demo'
import { Card, CardContent, CardImg } from 'shared/card'
import { ChatBackground, ChatMessage, ChatOptions } from 'app/content/chat/shared'
import { IconAnimatedEllipsis, IconChevronLeft, IconChevronRight, IconClose } from 'icons'
import { List, ListChevron, ListContent, ListImg, ListItem } from 'shared/list'
import './styles.css'

const CenteringDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
`

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Buttons')} />)

storiesOf('Arrows', module).add('arrow', () => <Arrow />)

storiesOf('Buttons', module)
  .add('simple', () => <Button>{'Buy it'}</Button>)
  .add('with some emoji', () => (
    <Button>
      <span aria-label="so cool" role="img">
        {'😎 👍'}
      </span>
    </Button>
  ))
  .add('outline', () => <Button outline>{'Buy it'}</Button>)
  .add('full width', () => <Button fullWidth>{'Buy it'}</Button>)
  .add('medium', () => <Button medium>{'Buy it'}</Button>)
  .add('small', () => <Button small>{'Buy it'}</Button>)

storiesOf('Cards', module).add('simple', () => (
  <Card style={{ width: '100px' }}>
    <CardImg src="https://placeimg.com/200/200/any" />
    <CardContent>{'Buy that'}</CardContent>
  </Card>
))

storiesOf('Chat', module).add('simple', () => (
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

storiesOf('Icons', module).add('close', () => <IconClose style={{ height: 24, width: 24 }} />)

const BounceBall = bounce(styled.div`
  background-color: red;
  border-radius: 50%;
  width: 60px;
  height: 60px;
`)

storiesOf('Animations', module).add('bounce', () => (
  <CenteringDiv>
    <BounceBall />
  </CenteringDiv>
))
