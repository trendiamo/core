import CloudUpload from '@material-ui/icons/CloudUpload'
import Delete from '@material-ui/icons/Delete'
import omit from 'lodash.omit'
import PicturesModal from './pictures-modal'
import React from 'react'
import ReactDropzone from 'react-dropzone'
import S3Upload from 'ext/react-s3-uploader'
import styled from 'styled-components'
import theme from 'app/theme'
import { apiGetSignedUrlFactory } from 'utils'
import { Button, FormControl, InputLabel, LinearProgress } from '@material-ui/core'
import { compose, lifecycle, shallowEqual, shouldUpdate, withHandlers, withProps, withState } from 'recompose'
import { getPixelCrop } from 'react-image-crop'
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

const StyledDelete = styled(Delete)`
  margin-bottom: 2px;
`

const FilteredReactDropzone = props => (
  <ReactDropzone {...omit(props, ['isDragging', 'previewPicture', 'setIsDragging'])} />
)

const StyledDropzone = styled(FilteredReactDropzone)`
  border-width: 0;
  cursor: pointer;
  position: relative;
  height: 150px;
  width: 150px;
  margin-top: 25px;
  margin-bottom: 0.4rem;
  color: ${({ isDragging, previewPicture }) => (previewPicture ? '#fff' : isDragging ? '#ff6641' : '#7f8086')};

  ${InnerLabel} {
    visibility: ${({ isDragging, previewPicture }) => (isDragging || !previewPicture ? 'visible' : 'hidden')};
    background-color: ${({ isDragging, previewPicture }) =>
      isDragging && previewPicture ? 'rgba(0, 0, 0, 0.6)' : 'transparent'};
  }

  &:hover ${InnerLabel} {
    visibility: visible;
    background-color: ${({ previewPicture }) => (previewPicture ? 'rgba(0, 0, 0, 0.6)' : 'transparent')};
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
)(({ disabled, square, isDragging, onDragEnter, onDragLeave, previewPicture, ...props }) => (
  <StyledDropzone
    disableClick
    disabled={disabled}
    isDragging={isDragging}
    onDragEnter={onDragEnter}
    onDragLeave={onDragLeave}
    previewPicture={previewPicture}
    {...props}
  >
    <Img alt="" square={square} src={previewPicture} />
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

const StyledLinearProgress = styled(LinearProgress)`
  margin-bottom: 1rem;
`

const StatusMessage = styled.div`
  font-size: 14px;
  letter-spacing: 0.3px;
  color: rgba(0, 0, 0, 0.87);
  line-height: 2.4;
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

const BarebonesPictureUploader = ({
  crop,
  disabled,
  doneCropping,
  label,
  modalOpen,
  onCancelClick,
  onClick,
  onCropChange,
  onCropComplete,
  onDoneClick,
  onDrop,
  onModalClose,
  onPictureLoaded,
  onRemovePicture,
  picture,
  picturePreviewRef,
  previewPicture,
  required = false,
  setModalOpen,
  square,
}) => (
  <React.Fragment>
    <PicturesModal
      crop={crop}
      croppingState={!doneCropping}
      onCancelClick={onCancelClick}
      onCropChange={onCropChange}
      onCropComplete={onCropComplete}
      onDoneClick={onDoneClick}
      onDrop={onDrop}
      onModalClose={onModalClose}
      onPictureLoaded={onPictureLoaded}
      open={modalOpen}
      picturePreview={picture && picture.preview}
      picturePreviewRef={picturePreviewRef}
      previewPicture={previewPicture}
      setOpen={setModalOpen}
    />
    <Container>
      <FormControl disabled={disabled} fullWidth margin="normal">
        <InputLabel shrink>{`${label}${required ? ' *' : ''}`}</InputLabel>
        <Dropzone
          accept="image/*"
          disabled={disabled}
          multiple={false}
          onClick={onClick}
          onDrop={onDrop}
          previewPicture={previewPicture}
          square={square}
        />
      </FormControl>
      {(picture || previewPicture) && (picture ? doneCropping : true) && (
        <RemoveButtonContainer>
          <Button
            disabled={disabled}
            mini
            onClick={onRemovePicture}
            style={{ color: theme.palette.error.main }}
            type="button"
          >
            <StyledDelete />
            {'clear'}
          </Button>
        </RemoveButtonContainer>
      )}
    </Container>
  </React.Fragment>
)

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

const uploadPicture = async ({ blob, setProgress, type }) => {
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
  shouldUpdate((props, nextProps) => {
    const ignoreProps = ['setDisabled', 'setPic', 'onChange']
    return !shallowEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps))
  }),
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
    onDrop: ({ onChange, setDoneCropping, setModalOpen, setPicture, setPreviousValue, value }) => files => {
      setDoneCropping(false)
      onChange('')
      setPreviousValue(value)
      if (files.length === 0) return
      const file = files[0]
      setPicture({
        name: file.name,
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
)(BarebonesPictureUploader)

export { uploadPicture, ProgressBar }
export default PictureUploader
