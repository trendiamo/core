import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { pictureUploaderFactory } from 'shared/picture-uploader'
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Welcome } from '@storybook/react/demo'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

const mockUploadImage = ({ onChange, setProgress }) => {
  setProgress({ message: 'Start uploading', progress: 10 })
  setTimeout(() => {
    setProgress({ message: 'Still uploading', progress: 50 })
  }, 1500)
  setTimeout(() => {
    setProgress({ message: 'Done', progress: 100 })
  }, 3000)
  setTimeout(() => {
    onChange('Done!')
    setProgress(null)
  }, 3500)
}

const PictureUploader = pictureUploaderFactory(mockUploadImage)

storiesOf('Picture Uploader', module).add('default', () => <PictureUploader onChange={action('onChange')} />)
