import BasePictureUploader from './base'
import omit from 'lodash.omit'
import React from 'react'
import S3Upload from 'ext/react-s3-uploader'
import styled from 'styled-components'
import { apiGetSignedUrlFactory } from 'utils'
import { compose, lifecycle, shallowEqual, shouldUpdate, withHandlers, withProps, withState } from 'recompose'
import { getPixelCrop } from 'react-image-crop'
import { LinearProgress } from '@material-ui/core'
import 'react-image-crop/dist/ReactCrop.css'

const StyledLinearProgress = styled(LinearProgress)`
  margin-bottom: 1rem;
`

const StatusMessage = styled.div`
  font-size: 14px;
  letter-spacing: 0.3px;
  color: rgba(0, 0, 0, 0.87);
  line-height: 2.4;
`

const ProgressBar = compose(
  shouldUpdate((props, nextProps) => {
    return !shallowEqual(props.progress, nextProps.progress)
  })
)(({ progress }) => (
  <div style={{ marginTop: '2rem' }}>
    <StatusMessage>{`${progress.message}...`}</StatusMessage>
    <StyledLinearProgress value={progress.progress} variant="determinate" />
  </div>
))

const defaultCrop = picture => {
  const pictureAspect = picture.width / picture.height
  let height, width
  if (pictureAspect < 1) {
    width = 100
    height = width * pictureAspect
  } else {
    height = 100
    width = height / pictureAspect
  }
  return {
    aspect: 1,
    height,
    width,
    x: 0,
    y: 0,
  }
}

const previewCrop = async (picture, pictureElement, pixelCrop) => {
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(
    pictureElement,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )
  return canvas.toDataURL(picture.type)
}

const resultingCrop = (picture, pictureElement, pixelCrop) => {
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(
    pictureElement,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )
  return new Promise(resolve => canvas.toBlob(resolve, picture.type))
}

const uploadPicture = async ({ blob, setProgress }) => {
  try {
    const { fileUrl } = await S3Upload({
      contentDisposition: 'auto',
      files: [blob],
      getSignedUrl: apiGetSignedUrlFactory(),
      onProgress: (progress, message) => setProgress({ message, progress }),
      preprocess: (file, next) => next(file),
      uploadRequestHeaders: { 'x-amz-acl': 'public-read' },
    })
    setProgress(null)
    return fileUrl
  } catch (error) {
    console.error(error)
    alert('Error uploading file, please try again or contact us')
    window.location.reload()
  }
}

const PictureUploader = compose(
  withProps({ picturePreviewRef: React.createRef() }),
  withState('crop', 'setCrop', {}),
  withState('croppedPicture', 'setCroppedPicture', null),
  withState('doneCropping', 'setDoneCropping', true),
  withState('picture', 'setPicture', null),
  withState('previousValue', 'setPreviousValue', null),
  withState('modalOpen', 'setModalOpen', false),
  withProps(({ croppedPicture, picture, value }) => ({
    previewPicture: value ? value : croppedPicture ? croppedPicture : picture ? picture.preview : '',
  })),
  withHandlers({
    onCancelClick: ({
      picture,
      previousValue,
      onChange,
      setCroppedPicture,
      setDoneCropping,
      setModalOpen,
      setPicture,
    }) => () => {
      setDoneCropping(true)
      onChange(previousValue)
      setPicture(null)
      setCroppedPicture(null)
      setModalOpen(false)
      URL.revokeObjectURL(picture.preview)
    },
    onClick: ({ setModalOpen }) => () => {
      setModalOpen(true)
    },
    onCropChange: ({ setCrop }) => crop => {
      setCrop(crop)
    },
    onCropComplete: ({ picture, picturePreviewRef, onChange, setCrop, setCroppedPicture }) => async (
      _crop,
      pixelCrop
    ) => {
      if (pixelCrop.height === 0 || pixelCrop.width === 0) {
        const crop = defaultCrop(picturePreviewRef.current)
        setCrop(crop)
        pixelCrop = getPixelCrop(picturePreviewRef.current, crop)
      }
      const previewUrl = await previewCrop(picture, picturePreviewRef.current, pixelCrop)
      setCroppedPicture(previewUrl)
      onChange(previewUrl)
    },
    onDoneClick: ({ crop, picture, picturePreviewRef, setDoneCropping, setModalOpen, setPic }) => async () => {
      setDoneCropping(true)
      setModalOpen(false)
      const blob = await resultingCrop(
        picture,
        picturePreviewRef.current,
        getPixelCrop(picturePreviewRef.current, crop)
      )
      blob.name = picture.name
      setPic(blob)
      URL.revokeObjectURL(picture.preview)
    },
    onFileUpload: ({ onChange, setDoneCropping, setModalOpen, setPicture, setPreviousValue, value }) => files => {
      setDoneCropping(false)
      onChange('')
      setPreviousValue(value)
      if (files.length === 0) return
      const file = files[0]
      setPicture({
        name: file.name || 'upload',
        preview: URL.createObjectURL(file),
        size: file.size,
        type: file.type,
      })
      setModalOpen(true)
    },
    onModalClose: ({ onChange, setModalOpen }) => pictureUrl => {
      setModalOpen(false)
      onChange(pictureUrl)
    },
    onPictureLoaded: ({ picture, picturePreviewRef, onChange, setCrop, setCroppedPicture }) => async pictureElement => {
      const crop = defaultCrop(pictureElement)
      setCrop(crop)
      const pixelCrop = getPixelCrop(pictureElement, crop)
      const previewUrl = await previewCrop(picture, picturePreviewRef.current, pixelCrop)
      setCroppedPicture(previewUrl)
      onChange(previewUrl)
    },
    onRemovePicture: ({ onChange, setPicture, setCroppedPicture, setPic }) => () => {
      onChange('')
      setPicture(null)
      setPic(null)
      setCroppedPicture(null)
    },
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { setDisabled, doneCropping, disabled } = this.props
      if (setDisabled && prevProps.doneCropping !== doneCropping && disabled === doneCropping)
        setDisabled(!doneCropping)
    },
    componentWillUnmount() {
      const { picture } = this.props
      picture && URL.revokeObjectURL(picture.preview)
    },
  })
)(BasePictureUploader)

export { uploadPicture, ProgressBar }
export default PictureUploader
