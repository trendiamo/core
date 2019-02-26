import CloudUpload from '@material-ui/icons/CloudUpload'
import omit from 'lodash.omit'
import React from 'react'
import ReactCrop, { getPixelCrop } from 'react-image-crop'
import ReactDropzone from 'react-dropzone'
import RemoveCircle from '@material-ui/icons/RemoveCircle'
import S3Upload from 'ext/react-s3-uploader'
import styled from 'styled-components'
import theme from 'app/theme'
import { apiGetSignedUrlFactory } from 'utils'
import { Button, FormControl, InputLabel, LinearProgress } from '@material-ui/core'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import 'react-image-crop/dist/ReactCrop.css'

const Container = styled.div`
  margin-bottom: 1rem;
  max-width: 400px;
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
  border-radius: ${({ square }) => (square ? 'none' : '50%')};
`

const FilteredReactDropzone = props => (
  <ReactDropzone {...omit(props, ['isDragging', 'previewImage', 'setIsDragging'])} />
)

const StyledDropzone = styled(FilteredReactDropzone)`
  border-width: 0;
  cursor: pointer;
  position: relative;
  height: 150px;
  width: 150px;
  margin-top: 25px;
  margin-bottom: 0.4rem;
  color: ${({ isDragging, previewImage }) => (previewImage ? '#fff' : isDragging ? '#ff6641' : '#7f8086')};

  ${InnerLabel} {
    visibility: ${({ isDragging, previewImage }) => (isDragging || !previewImage ? 'visible' : 'hidden')};
    background-color: ${({ isDragging, previewImage }) =>
      isDragging && previewImage ? 'rgba(0, 0, 0, 0.6)' : 'transparent'};
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
    onDrop: ({ onDrop, setIsDragging }) => (acceptedFiles, rejectedFiles) => {
      setIsDragging(false)
      onDrop(acceptedFiles, rejectedFiles)
    },
  })
)(({ disabled, square, isDragging, onDragEnter, onDragLeave, previewImage, ...props }) => (
  <StyledDropzone
    disableClick={disabled}
    disabled={disabled}
    isDragging={isDragging}
    onDragEnter={onDragEnter}
    onDragLeave={onDragLeave}
    previewImage={previewImage}
    {...props}
  >
    <Img alt="" square={square} src={previewImage} />
    <InnerLabel square={square}>
      <CloudUpload />
      <div>{'Drop a file or click to select one'}</div>
    </InnerLabel>
  </StyledDropzone>
))

const Img = styled.img`
  background-color: ${({ src }) => (src ? 'transparent' : '#f5f5f5')};
  border: ${({ src }) => (src ? 'none' : 'dashed 2px')};
  border-radius: ${({ square }) => (square ? 'none' : '50%')};
  display: block;
  height: 100%;
  position: relative;
  width: 100%;
`

const HiddenImg = styled.img`
  display: none;
`

const StyledReactCrop = styled(ReactCrop)`
  margin-top: 1rem;
  border: 2px dashed #fff;
`

const StyledLinearProgress = styled(LinearProgress)`
  margin-bottom: 1rem;
`

const StatusMessage = styled.div`
  font-size: 14px;
  letter-spacing: 0.3px;
  color: rgba(0, 0, 0, 0.87);
  line-height: 1.4;
`

const RemoveButtonContainer = styled.div`
  text-align: center;
  width: 150px;

  button {
    font-size: 11px;
  }
  svg {
    font-size: 17px;
    margin-right: 4px;
  }
`

const ProgressBar = ({ progress }) => (
  <React.Fragment>
    <StatusMessage>{`${progress.message}...`}</StatusMessage>
    <StyledLinearProgress value={progress.progress} variant="determinate" />
  </React.Fragment>
)

const BarebonesPictureUploader = ({
  crop,
  doneCropping,
  disabled,
  image,
  imagePreviewRef,
  previewImage,
  onCancelClick,
  onCropChange,
  onCropComplete,
  onDoneClick,
  onDrop,
  onImageLoaded,
  onRemove,
  square,
  label,
  required = false,
}) => (
  <Container>
    <FormControl disabled={disabled} fullWidth margin="normal">
      <InputLabel shrink>{`${label}${required ? ' *' : ''}`}</InputLabel>
      <Dropzone
        accept="image/*"
        disabled={disabled}
        multiple={false}
        onDrop={onDrop}
        previewImage={previewImage}
        square={square}
      />
    </FormControl>
    {(image || previewImage) && (image ? doneCropping : true) && (
      <RemoveButtonContainer>
        <Button disabled={disabled} mini onClick={onRemove} style={{ color: theme.palette.error.main }} type="button">
          <RemoveCircle />
          {'delete'}
        </Button>
      </RemoveButtonContainer>
    )}
    {image && !doneCropping && (
      <React.Fragment>
        <HiddenImg alt="" ref={imagePreviewRef} src={image.preview} />
        <StyledReactCrop
          crop={crop}
          imageStyle={{ maxHeight: 'initial' }}
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
          <Button onClick={onCancelClick} style={{ marginLeft: '1rem' }} type="button">
            {'Cancel'}
          </Button>
        </div>
      </React.Fragment>
    )}
  </Container>
)

const defaultCrop = image => {
  const imageAspect = image.width / image.height
  let height, width
  if (imageAspect < 1) {
    width = 100
    height = width * imageAspect
  } else {
    height = 100
    width = height / imageAspect
  }
  return {
    aspect: 1,
    height,
    width,
    x: 0,
    y: 0,
  }
}

const previewCrop = (image, imageElement, pixelCrop) => {
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(
    imageElement,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )
  return canvas.toDataURL(image.type)
}

const resultingCrop = (image, imageElement, pixelCrop) => {
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(
    imageElement,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )
  return new Promise(resolve => canvas.toBlob(resolve, image.type))
}

const uploadImage = async ({ blob, setProgress, type, defaultValue }) => {
  if (!blob) return defaultValue
  try {
    const { fileUrl } = await S3Upload({
      contentDisposition: 'auto',
      files: [blob],
      getSignedUrl: apiGetSignedUrlFactory(type),
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
  withProps({ imagePreviewRef: React.createRef() }),
  withState('image', 'setImage', null),
  withState('crop', 'setCrop', {}),
  withState('croppedImage', 'setCroppedImage', null),
  withState('doneCropping', 'setDoneCropping', true),
  withState('previousValue', 'setPreviousValue', null),
  withProps(({ croppedImage, image, value }) => ({
    previewImage: value ? value : croppedImage ? croppedImage : image ? image.preview : '',
  })),
  withHandlers({
    onCancelClick: ({ image, previousValue, onChange, setCroppedImage, setDoneCropping, setImage }) => () => {
      onChange(previousValue)
      setImage(null)
      setCroppedImage(null)
      setDoneCropping(true)
      URL.revokeObjectURL(image.preview)
    },
    onCropChange: ({ setCrop }) => crop => setCrop(crop),
    onCropComplete: ({ image, imagePreviewRef, onChange, setCrop, setCroppedImage }) => (_crop, pixelCrop) => {
      if (pixelCrop.height === 0 || pixelCrop.width === 0) {
        const crop = defaultCrop(imagePreviewRef.current)
        setCrop(crop)
        pixelCrop = getPixelCrop(imagePreviewRef.current, crop)
      }
      const previewUrl = previewCrop(image, imagePreviewRef.current, pixelCrop)
      setCroppedImage(previewUrl)
      onChange(previewUrl)
    },
    onDoneClick: ({ crop, image, imagePreviewRef, setDoneCropping, setPic }) => async () => {
      setDoneCropping(true)
      const blob = await resultingCrop(image, imagePreviewRef.current, getPixelCrop(imagePreviewRef.current, crop))
      blob.name = image.name
      setPic(blob)
      URL.revokeObjectURL(image.preview)
    },
    onDrop: ({ onChange, setDoneCropping, setImage, setPreviousValue, value }) => files => {
      setPreviousValue(value)
      onChange('')
      setDoneCropping(false)
      if (files.length === 0) return
      const file = files[0]
      setImage({
        name: file.name,
        preview: URL.createObjectURL(file),
        size: file.size,
        type: file.type,
      })
    },
    onImageLoaded: ({ image, imagePreviewRef, onChange, setCrop, setCroppedImage }) => imageElement => {
      const crop = defaultCrop(imageElement)
      setCrop(crop)
      const pixelCrop = getPixelCrop(imageElement, crop)
      const previewUrl = previewCrop(image, imagePreviewRef.current, pixelCrop)
      setCroppedImage(previewUrl)
      onChange(previewUrl)
    },
    onRemove: ({ onChange, setImage, setCroppedImage, setPic }) => () => {
      setImage(null)
      onChange('')
      setPic(null)
      setCroppedImage(null)
    },
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { setDisabled, doneCropping, disabled } = this.props
      if (setDisabled && prevProps.doneCropping !== doneCropping && disabled === doneCropping)
        setDisabled(!doneCropping)
    },
    componentWillUnmount() {
      const { image } = this.props
      image && URL.revokeObjectURL(image.preview)
    },
  })
)(BarebonesPictureUploader)

export { uploadImage, ProgressBar }
export default PictureUploader
