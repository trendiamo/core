import Button from '@material-ui/core/Button'
import CloudUpload from '@material-ui/icons/CloudUpload'
import { Field } from 'redux-form'
import { getSignedUrlFactory } from 'app/utils'
import Label from 'shared/label'
import LinearProgress from '@material-ui/core/LinearProgress'
import React from 'react'
import ReactDropzone from 'react-dropzone'
import S3Upload from 'react-s3-uploader/s3upload'
import styled from 'styled-components'
import { compose, withHandlers, withProps, withState } from 'recompose'
import ReactCrop, { getPixelCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const Container = styled.div`
  margin-bottom: 1rem;
  max-width: 400px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`

const InnerLabel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  letter-spacing: 0.3px;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`

const sanitizeProps = props => {
  const newProps = { ...props }
  delete newProps.isDragging
  delete newProps.previewImage
  delete newProps.setIsDragging
  return newProps
}

const FilteredReactDropzone = props => <ReactDropzone {...sanitizeProps(props)} />

const StyledDropzone = styled(FilteredReactDropzone)`
  border-width: 0;
  cursor: pointer;
  position: relative;
  height: 150px;
  width: 150px;
  margin-bottom: 1rem;
  color: ${({ isDragging, previewImage }) => (previewImage ? '#fff' : isDragging ? '#0560ff' : '#7f8086')};

  ${InnerLabel} {
    visibility: ${({ previewImage }) => (previewImage ? 'hidden' : 'visible')};
  }

  &:hover ${InnerLabel} {
    visibility: visible;
    background-color: ${({ previewImage }) => (previewImage ? 'rgba(0, 0, 0, 0.6)' : 'transparent')};
  }
`

const Dropzone = compose(
  withState('isDragging', 'setIsDragging', false),
  withHandlers({
    onDragEnter: ({ setIsDragging }) => () => {
      setIsDragging(true)
    },
    onDragLeave: ({ setIsDragging }) => () => {
      setIsDragging(false)
    },
  })
)(({ isDragging, onDragEnter, onDragLeave, previewImage, ...props }) => (
  <StyledDropzone
    isDragging={isDragging}
    onDragEnter={onDragEnter}
    onDragLeave={onDragLeave}
    previewImage={previewImage}
    {...props}
  >
    <Img alt="" src={previewImage} />
    <InnerLabel>
      <CloudUpload />
      <div>{'Drop a file or click to select one'}</div>
    </InnerLabel>
  </StyledDropzone>
))

const Img = styled.img`
  background-color: ${({ src }) => (src ? 'transparent' : '#f2f4f7')};
  border: ${({ src }) => (src ? 'none' : 'dashed 2px')};
  border-radius: 50%;
  display: block;
  height: 100%;
  position: relative;
  width: 100%;
`

const HiddenImg = styled.img`
  display: none;
`

const StyledReactCrop = styled(ReactCrop)`
  border: 2px dashed #fff;
`

const StyledLinearProgress = styled(LinearProgress)`
  margin-bottom: 1rem;
`

const StatusMessage = styled.div`
  font-size: 14px;
  letter-spacing: 0.3px;
  color: #7f8086;
`

const BarebonesPictureUploader = ({
  crop,
  doneCropping,
  image,
  previewImage,
  progress,
  onCropChange,
  onCropComplete,
  onDoneClick,
  onDrop,
  onImageLoaded,
  setImagePreviewRef,
}) => (
  <Container>
    <Dropzone accept="image/*" multiple={false} onDrop={onDrop} previewImage={previewImage} />
    {progress && (
      <React.Fragment>
        <StatusMessage>{`${progress.message}...`}</StatusMessage>
        <StyledLinearProgress value={progress.progress} variant="determinate" />
      </React.Fragment>
    )}
    {image &&
      !doneCropping && (
        <React.Fragment>
          <HiddenImg alt="" ref={setImagePreviewRef} src={image.preview} />
          <StyledReactCrop
            crop={crop}
            keepSelection
            minHeight={20}
            minWidth={20}
            onChange={onCropChange}
            onComplete={onCropComplete}
            onImageLoaded={onImageLoaded}
            src={image.preview}
          />
          <div>
            <p>{'Please crop the image (or leave as default).'}</p>
            <Button color="primary" onClick={onDoneClick} type="button" variant="contained">
              {'Done'}
            </Button>
          </div>
        </React.Fragment>
      )}
  </Container>
)

const pictureUploaderFactory = uploadImage => {
  const PictureUploaderSkeleton = compose(
    withState('image', 'setImage', null),
    withState('crop', 'setCrop', {}),
    withState('croppedImage', 'setCroppedImage', null),
    withState('doneCropping', 'setDoneCropping', false),
    withState('progress', 'setProgress', null),
    withProps(({ croppedImage, image, value }) => ({
      previewImage: value ? value : croppedImage ? croppedImage : image ? image.preview : '',
    })),
    withHandlers(() => {
      let imagePreviewRef
      return {
        onCropChange: ({ setCrop }) => crop => setCrop(crop),
        onCropComplete: ({ setCrop, setCroppedImage }) => (_crop, pixelCrop) => {
          if (pixelCrop.height === 0 || pixelCrop.width === 0) {
            const crop = defaultCrop(imagePreviewRef)
            setCrop(crop)
            pixelCrop = getPixelCrop(imagePreviewRef, crop)
          }
          setPreviewCrop({ image: imagePreviewRef, pixelCrop, setCroppedImage })
        },
        onDoneClick: ({ crop, image, onChange, setDoneCropping, setProgress, type }) => async () => {
          setDoneCropping(true)
          const blob = await resultingCrop(imagePreviewRef, getPixelCrop(imagePreviewRef, crop))
          blob.name = image.name
          uploadImage({ blob, onChange, setProgress, type })
        },
        onDrop: ({ onChange, setDoneCropping, setImage }) => files => {
          onChange('')
          setDoneCropping(false)
          setImage(files[0])
        },
        onImageLoaded: ({ setCrop, setCroppedImage }) => image => {
          const crop = defaultCrop(image)
          setCrop(crop)
          setPreviewCrop({ image: imagePreviewRef, pixelCrop: getPixelCrop(image, crop), setCroppedImage })
        },
        setImagePreviewRef: () => ref => (imagePreviewRef = ref),
      }
    })
  )(BarebonesPictureUploader)

  return PictureUploaderSkeleton
}

const defaultCrop = image =>
  makeAspectCrop(
    {
      aspect: 1,
      width: 100,
      x: 0,
      y: 0,
    },
    image.width / image.height
  )

const previewCrop = (image, pixelCrop) => {
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )
  return canvas.toDataURL('image/jpeg')
}

const resultingCrop = (image, pixelCrop) => {
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )
  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
}

const setPreviewCrop = ({ image, pixelCrop, setCroppedImage }) => setCroppedImage(previewCrop(image, pixelCrop))

const uploadImage = ({ blob, onChange, setProgress, type }) => {
  new S3Upload({
    contentDisposition: 'auto',
    files: [blob],
    getSignedUrl: getSignedUrlFactory(type),
    onError: status => {
      console.error(status)
      alert('Error uploading file, please try again or contact us')
      window.location.reload()
    },
    onFinishS3Put: ({ fileUrl }) => {
      setTimeout(() => {
        onChange(fileUrl)
        setProgress(null)
      }, 250)
    },
    onProgress: (progress, message) => setProgress({ message, progress }),
    preprocess: (file, next) => next(file),
    uploadRequestHeaders: { 'x-amz-acl': 'public-read' },
  })
}

const PictureUploader = pictureUploaderFactory(uploadImage)

const PictureField = compose(
  withState('picValue', 'setPicValue', ({ input }) => input.value),
  withHandlers({
    setPicture: ({ input, setPicValue }) => value => {
      setPicValue(value)
      input.onChange(value)
    },
  })
)(({ label, picValue, setPicture, type }) => (
  <React.Fragment>
    <Label>{label}</Label>
    <PictureUploader onChange={setPicture} type={type} value={picValue} />
  </React.Fragment>
))

const PictureInput = ({ label, source, type }) => (
  <Field component={PictureField} label={label} name={source} type={type} />
)

export { PictureInput, pictureUploaderFactory }
export default PictureUploader
