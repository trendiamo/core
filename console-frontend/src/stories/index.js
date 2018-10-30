import { action } from '@storybook/addon-actions'
import { BarebonesPictureUploader } from 'shared/picture-uploader'
import { linkTo } from '@storybook/addon-links'
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Welcome } from '@storybook/react/demo'
import { compose, withHandlers, withProps, withState } from 'recompose'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

const PictureUploader = compose(
  withProps(({ pictureUrl }) => ({
    image: pictureUrl ? { preview: pictureUrl } : undefined,
    previewImage: pictureUrl,
  })),
  withState('progress', 'setProgress', null),
  withState('crop', 'setCrop', {}),
  withState('doneCropping', 'setDoneCropping', false),
  withHandlers({
    onCropChange: ({ setCrop }) => crop => setCrop(crop),
    onDoneClick: ({ image, onChange, setDoneCropping, setProgress }) => () => {
      setProgress({ message: 'Start uploading', progress: 10 })
      setTimeout(() => {
        setProgress({ message: 'Still uploading', progress: 50 })
      }, 1000)
      setTimeout(() => {
        setProgress({ message: 'Done', progress: 100 })
      }, 2000)
      setTimeout(() => {
        onChange(image.preview)
        setProgress(null)
        setDoneCropping(true)
      }, 2250)
    },
    onDrop: ({ onChange, setDoneCropping }) => () => {
      onChange('')
      setDoneCropping(false)
      // setImage(files[0])
    },
  })
)(BarebonesPictureUploader)

storiesOf('Picture Uploader', module)
  .add('default', () => <PictureUploader onChange={action('onChange')} onDoneClick={action('onDoneClick')} />)
  .add('with already chosen pic', () => (
    <PictureUploader
      onChange={action('onChange')}
      onDoneClick={action('onDoneClick')}
      pictureUrl="https://www.w3schools.com/w3css/img_lights.jpg"
    />
  ))
