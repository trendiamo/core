import { action } from '@storybook/addon-actions'
import Button from '../src/shared/button'
import { h } from 'preact'
import IconClose from '../src/icons/icon-close'
import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'
import { Welcome } from '@storybook/react/demo'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Buttons')} />)

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

storiesOf('Icons', module).add('close', () => <IconClose style={{ height: 24, width: 24 }} />)
