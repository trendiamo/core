import PictureUploader from 'shared/picture-uploader'
import React from 'react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'
import { Welcome } from '@storybook/react/demo'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Picture Uploader', module).add('default', () => <PictureUploader onChange={action('onChange')} />)
