// import { action } from '@storybook/addon-actions'
import Arrow from 'shared/arrow'
// import Button from 'shared/button'
import { h } from 'preact'
import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'
import { Welcome } from '@storybook/react/demo'
import { Card, CardContent, CardImg } from 'shared/card'
import { ChatBackground, ChatMessage, ChatOptions } from 'app/content/chat/shared'
import {
  IconAnimatedEllipsis,
  IconChevronLeft,
  IconChevronRight,
  IconClose,
  IconFamily,
  IconPortfolio,
  IconSchool,
  IconTree,
} from 'icons'
import { List, ListChevron, ListContent, ListImg, ListItem } from 'shared/list'
import { OptionButton, OptionsWrapper } from 'shared/option-button'
import './styles.css'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Buttons')} />)

storiesOf('Arrows', module).add('arrow', () => <Arrow />)

// storiesOf('Buttons', module)
//   .add('simple', () => <Button>{'Buy this'}</Button>)
//   .add('outline', () => <Button outline>{'Buy this'}</Button>)
//   .add('fullWidth', () => <Button fullWidth>{'Buy this'}</Button>)
//   .add('small', () => <Button small>{'Buy this'}</Button>)
//   .add('medium', () => <Button medium>{'Buy this'}</Button>)
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span aria-label="so cool" role="img">
//         {'😀 😎 👍 💯'}
//       </span>
//     </Button>
//   ))

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

storiesOf('Option Buttons', module)
  .add('with icon', () => (
    <ChatBackground style={{ backgroundColor: '#f5f9fc', height: '500px', width: '300px' }}>
      <OptionsWrapper>
        <OptionButton Icon={IconSchool} title="Study" />
        <OptionButton Icon={IconPortfolio} title="Work" />
        <OptionButton Icon={IconFamily} title="Family" />
        <OptionButton Icon={IconTree} title="Leisure" />
      </OptionsWrapper>
    </ChatBackground>
  ))
  .add('with image', () => (
    <ChatBackground style={{ backgroundColor: '#f5f9fc', height: '500px', width: '300px' }}>
      <OptionsWrapper>
        <OptionButton imageUrl="https://media.graphcms.com/j9kDCq4TBmq4TrXiDxY7" title="Lisbon" />
        <OptionButton imageUrl="https://media.graphcms.com/kWNi4lTRQGITYsA64whG" title="Barcelona" />
        <OptionButton imageUrl="https://media.graphcms.com/9LeeSShyQJC8jBXNGyEo" title="Madrid" />
        <OptionButton imageUrl="https://media.graphcms.com/NyeyrWcoRZWHINl2EFBb" title="Berlin" />
      </OptionsWrapper>
    </ChatBackground>
  ))
