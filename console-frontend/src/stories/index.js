import ImageUploader, { ProgressBar } from 'shared/image-uploader'
import React from 'react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'
import { Welcome } from '@storybook/react/demo'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Image Uploader', module)
  .add('default', () => <ImageUploader onChange={action('onChange')} />)
  .add('progress bar', () => <ProgressBar progress={{ progress: 20, message: 'Uploading' }} />)
