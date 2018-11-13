import Button from '@material-ui/core/Button'
import CloudUpload from '@material-ui/icons/CloudUpload'
import Label from 'shared/label'
import LinearProgress from '@material-ui/core/LinearProgress'
import React from 'react'
import ReactCrop, { getPixelCrop } from 'react-image-crop'
import ReactDropzone from 'react-dropzone'
import RemoveCircle from '@material-ui/icons/RemoveCircle'
import S3Upload from 'ext/react-s3-uploader'
import styled from 'styled-components'
import theme from 'app/theme'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { Field } from 'redux-form'
import { getSignedUrlFactory } from 'app/utils'
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
  margin-bottom: 0.4rem;
  color: ${({ isDragging, previewImage }) => (previewImage ? '#fff' : isDragging ? '#0560ff' : '#7f8086')};

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
)(({ disabled, isDragging, onDragEnter, onDragLeave, previewImage, ...props }) => (
  <StyledDropzone
    disableClick={disabled}
    disabled={disabled}
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
  margin-top: 1rem;
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
  previewImage,
  onCancelClick,
  onCropChange,
  onCropComplete,
  onDoneClick,
  onDrop,
  onImageLoaded,
  onRemove,
  setImagePreviewRef,
}) => (
  <Container>
    <Dropzone accept="image/*" disabled={disabled} multiple={false} onDrop={onDrop} previewImage={previewImage} />

    {(image || previewImage) && (image ? doneCropping : true) && (
      <RemoveButtonContainer>
        <Button mini onClick={onRemove} style={{ color: theme.palette.error.main }} type="button">
          <RemoveCircle />
          {'delete'}
        </Button>
      </RemoveButtonContainer>
    )}
    {image && !doneCropping && (
      <React.Fragment>
        <HiddenImg alt="" ref={setImagePreviewRef} src={image.preview} />
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

const uploadImage = async ({ blob, setProgress, type, defaultValue }) => {
  if (!blob) return defaultValue
  try {
    const { fileUrl } = await S3Upload({
      contentDisposition: 'auto',
      files: [blob],
      getSignedUrl: getSignedUrlFactory(type),
      onProgress: (progress, message) => setProgress({ message, progress }),
      preprocess: (file, next) => next(file),
      uploadRequestHeaders: { 'x-amz-acl': 'public-read' },
    })
    setProgress(null)
    return fileUrl
  } catch (status) {
    console.error(status)
    alert('Error uploading file, please try again or contact us')
    window.location.reload()
  }
}

const PictureUploader = compose(
  withState('image', 'setImage', null),
  withState('crop', 'setCrop', {}),
  withState('croppedImage', 'setCroppedImage', null),
  withState('doneCropping', 'setDoneCropping', true),
  withState('previousValue', 'setPreviousValue', null),
  withProps(({ croppedImage, image, value }) => ({
    previewImage: value ? value : croppedImage ? croppedImage : image ? image.preview : '',
  })),
  withHandlers(() => {
    let imagePreviewRef
    return {
      onCancelClick: ({ image, previousValue, onChange, setCroppedImage, setDoneCropping, setImage }) => () => {
        onChange(previousValue)
        setImage(null)
        setCroppedImage(null)
        setDoneCropping(true)
        URL.revokeObjectURL(image.preview)
      },
      onCropChange: ({ setCrop }) => crop => setCrop(crop),
      onCropComplete: ({ setCrop, setCroppedImage }) => (_crop, pixelCrop) => {
        if (pixelCrop.height === 0 || pixelCrop.width === 0) {
          const crop = defaultCrop(imagePreviewRef)
          setCrop(crop)
          pixelCrop = getPixelCrop(imagePreviewRef, crop)
        }
        setPreviewCrop({ image: imagePreviewRef, pixelCrop, setCroppedImage })
      },
      onDoneClick: ({ crop, image, setDoneCropping, setProfilePic }) => async () => {
        setDoneCropping(true)
        const blob = await resultingCrop(imagePreviewRef, getPixelCrop(imagePreviewRef, crop))
        blob.name = image.name
        setProfilePic(blob)
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
      onImageLoaded: ({ setCrop, setCroppedImage }) => image => {
        const crop = defaultCrop(image)
        setCrop(crop)
        setPreviewCrop({ image: imagePreviewRef, pixelCrop: getPixelCrop(image, crop), setCroppedImage })
      },
      onRemove: ({ onChange, setImage, setCroppedImage, setProfilePic }) => () => {
        setImage(null)
        onChange('')
        setProfilePic(null)
        setCroppedImage(null)
      },
      setImagePreviewRef: () => ref => (imagePreviewRef = ref),
    }
  }),
  lifecycle({
    componentDidUpdate() {
      const { setDisabled, doneCropping, disabled } = this.props
      if (setDisabled && disabled === doneCropping) setDisabled(!doneCropping)
    },
    componentWillUnmount() {
      const { image } = this.props
      image && URL.revokeObjectURL(image.preview)
    },
  })
)(BarebonesPictureUploader)

const PictureFieldElement = ({ label, picValue, setPicture, setProfilePic, setDisabled, disabled }) => (
  <React.Fragment>
    <Label>{label}</Label>
    <PictureUploader
      disabled={disabled}
      onChange={setPicture}
      setDisabled={setDisabled}
      setProfilePic={setProfilePic}
      value={picValue}
    />
  </React.Fragment>
)

const PictureField = compose(
  withState('picValue', 'setPicValue', ({ input }) => input.value),
  withHandlers({
    setPicture: ({ input, setPicValue }) => value => {
      // Sets the full-size picture.
      setPicValue(value)
      input.onChange(value)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { input, setInputRef, required = false } = this.props
      setInputRef({ ...input, required })
    },
  })
)(PictureFieldElement)

const PictureInput = ({ label, setProfilePic, source, setInputRef, ...props }) => (
  <Field
    {...props}
    component={PictureField}
    label={label}
    name={source}
    setInputRef={setInputRef}
    setProfilePic={setProfilePic}
  />
)

export { PictureInput, uploadImage, ProgressBar }
export default PictureUploader
