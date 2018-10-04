import { action } from '@storybook/addon-actions'
import Arrow from '../src/shared/arrow'
import Button from '../src/shared/button'
import { h } from 'preact'
import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'
import { Welcome } from '@storybook/react/demo'
import { Card, CardContent, CardImg } from '../src/shared/card'
import { IconChevronLeft, IconChevronRight, IconClose } from '../src/icons'
import { List, ListChevron, ListContent, ListImg, ListItem } from '../src/shared/list'
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

storiesOf('Icons', module)
  .add('close', () => <IconClose style={{ height: 24, width: 24 }} />)
  .add('chevron left', () => <IconChevronLeft style={{ height: 24, width: 24 }} />)
  .add('chevron right', () => <IconChevronRight style={{ height: 24, width: 24 }} />)

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
