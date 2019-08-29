import CloudUpload from '@material-ui/icons/CloudUpload'
import Delete from '@material-ui/icons/Delete'
import ImagesModal from 'shared/images-modal'
import omit from 'lodash.omit'
import React, { useCallback, useEffect, useState } from 'react'
import ReactDropzone from 'react-dropzone'
import styled from 'styled-components'
import theme from 'app/theme'
import { Button, FormControl, InputLabel } from '@material-ui/core'
import { CircularProgress } from '@material-ui/core'
import { imgixUrl, stringifyRect } from 'plugin-base'

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
  border-radius: ${({ circle }) => (circle ? '50%' : 'none')};
`

const StyledDelete = styled(Delete)`
  margin-bottom: 2px;
`

const FilteredReactDropzone = props => <ReactDropzone {...omit(props, ['isDragging', 'previewImage'])} />

const StyledDropzone = styled(FilteredReactDropzone)`
  border-width: 0;
  position: relative;
  height: 150px;
  width: 150px;
  margin-top: 25px;
  margin-bottom: 0.4rem;
  color: ${({ isDragging, previewImage }) => (previewImage ? '#fff' : isDragging ? '#ff6641' : '#7f8086')};
  cursor: ${({ disabled }) => (disabled ? 'wait' : 'pointer')};

  ${InnerLabel} {
    visibility: ${({ isDragging, previewImage }) => (isDragging || !previewImage ? 'visible' : 'hidden')};
    background-color: ${({ isDragging, previewImage }) =>
      isDragging && previewImage ? 'rgba(0, 0, 0, 0.6)' : 'transparent'};
  }

  &:hover ${InnerLabel} {
    visibility: ${({ disabled, previewImage }) => (disabled && previewImage ? 'hidden' : 'visible')};
    background-color: ${({ previewImage }) => (previewImage ? 'rgba(0, 0, 0, 0.6)' : 'transparent')};
  }
`

const Img = styled.img`
  object-fit: ${({ type }) => (type === 'animationUploader' ? 'cover' : 'contain')};
  background-color: ${({ src }) => (src ? 'transparent' : '#f5f5f5')};
  border: ${({ src }) => (src ? 'none' : 'dashed 2px')};
  border-radius: ${({ circle }) => (circle ? '50%' : 'none')};
  display: block;
  height: 100%;
  position: relative;
  width: 100%;
`

const CircularProgressContainer = styled.div`
  border-radius: ${({ circle }) => (circle ? '50%' : 'none')};
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
`

const Dropzone = ({
  circle,
  disabled,
  isImageLoading,
  onFileUpload,
  previewImage,
  setIsImageLoading,
  setIsUploaderLoading,
  type,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [imgSrc, setImgSrc] = useState(null)

  const onDragEnter = useCallback(() => {
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const onDrop = useCallback(
    acceptedFiles => {
      setIsDragging(false)
      onFileUpload(acceptedFiles)
    },
    [onFileUpload]
  )

  useEffect(() => setIsUploaderLoading(isImageLoading), [isImageLoading, setIsUploaderLoading])

  const onImageLoad = useCallback(() => setIsImageLoading(false), [setIsImageLoading])

  useEffect(
    () => {
      // Prevents safari bug when <img /> onload fails to fire
      setTimeout(() => {
        setImgSrc(previewImage)
      }, 0)
    },
    [previewImage]
  )

  return (
    <StyledDropzone
      disableClick
      disabled={disabled}
      isDragging={isDragging}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      previewImage={previewImage}
      {...props}
    >
      <Img alt="" circle={circle} onLoad={onImageLoad} src={imgSrc} type={type} />
      <InnerLabel circle={circle}>
        <CloudUpload />
        <div>{'Drop a file or click to select one'}</div>
      </InnerLabel>
      {isImageLoading && (
        <CircularProgressContainer circle={circle}>
          <CircularProgress size={50} />
        </CircularProgressContainer>
      )}
    </StyledDropzone>
  )
}

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

const BaseImageUploader = ({
  circle,
  crop,
  disabled,
  doneCropping,
  hasNewUpload,
  isLoading,
  isImageLoading,
  label,
  modalOpen,
  onCancelClick,
  onCropChange,
  onCropComplete,
  onCropDoneClick,
  onDropzoneClick,
  onFileUpload,
  onGalleryDoneClick,
  onModalClose,
  onImageLoaded,
  onRemoveImage,
  image,
  imagePreviewRef,
  previewImage,
  progress,
  required = false,
  setHasNewUpload,
  setIsLoading,
  setIsImageLoading,
  setIsUploaderLoading,
  setModalOpen,
  value,
  type,
  isUserProfileImage,
}) => (
  <>
    <ImagesModal
      crop={crop}
      croppingState={!doneCropping}
      hasNewUpload={hasNewUpload}
      image={image}
      imagePreviewRef={imagePreviewRef}
      isLoading={isLoading}
      isUserProfileImage={isUserProfileImage}
      onCancelClick={onCancelClick}
      onCropChange={onCropChange}
      onCropComplete={onCropComplete}
      onCropDoneClick={onCropDoneClick}
      onFileUpload={onFileUpload}
      onGalleryDoneClick={onGalleryDoneClick}
      onImageLoaded={onImageLoaded}
      onModalClose={onModalClose}
      open={modalOpen}
      previewImage={previewImage}
      progress={progress}
      setHasNewUpload={setHasNewUpload}
      setIsLoading={setIsLoading}
      setOpen={setModalOpen}
      type={type === 'animationUploader' ? 'animationsModal' : 'imagesModal'}
    />
    <Container>
      <FormControl disabled={disabled} fullWidth margin="normal">
        <InputLabel shrink>{`${label}${required ? ' *' : ''}`}</InputLabel>
        <Dropzone
          accept="image/*"
          circle={circle}
          disabled={disabled}
          isImageLoading={isImageLoading}
          multiple={false}
          onClick={onDropzoneClick}
          onFileUpload={onFileUpload}
          previewImage={value.url && imgixUrl(value.url, { rect: stringifyRect(value.imgRect) })}
          setIsImageLoading={setIsImageLoading}
          setIsUploaderLoading={setIsUploaderLoading}
          type={type}
        />
      </FormControl>
      {(image || previewImage) && (image ? doneCropping : true) && (
        <RemoveButtonContainer>
          <Button
            disabled={disabled}
            mini
            onClick={onRemoveImage}
            style={{ color: theme.palette.error.main }}
            type="button"
          >
            <StyledDelete />
            {'clear'}
          </Button>
        </RemoveButtonContainer>
      )}
    </Container>
  </>
)

export default BaseImageUploader
