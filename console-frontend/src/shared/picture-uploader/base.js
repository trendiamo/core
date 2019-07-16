import CloudUpload from '@material-ui/icons/CloudUpload'
import Delete from '@material-ui/icons/Delete'
import omit from 'lodash.omit'
import PicturesModal from 'shared/pictures-modal'
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

const FilteredReactDropzone = props => <ReactDropzone {...omit(props, ['isDragging', 'previewPicture'])} />

const StyledDropzone = styled(FilteredReactDropzone)`
  border-width: 0;
  position: relative;
  height: 150px;
  width: 150px;
  margin-top: 25px;
  margin-bottom: 0.4rem;
  color: ${({ isDragging, previewPicture }) => (previewPicture ? '#fff' : isDragging ? '#ff6641' : '#7f8086')};
  cursor: ${({ disabled }) => (disabled ? 'wait' : 'pointer')};

  ${InnerLabel} {
    visibility: ${({ isDragging, previewPicture }) => (isDragging || !previewPicture ? 'visible' : 'hidden')};
    background-color: ${({ isDragging, previewPicture }) =>
      isDragging && previewPicture ? 'rgba(0, 0, 0, 0.6)' : 'transparent'};
  }

  &:hover ${InnerLabel} {
    visibility: ${({ disabled, previewPicture }) => (disabled && previewPicture ? 'hidden' : 'visible')};
    background-color: ${({ previewPicture }) => (previewPicture ? 'rgba(0, 0, 0, 0.6)' : 'transparent')};
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
  isPictureLoading,
  onFileUpload,
  previewPicture,
  setIsPictureLoading,
  setIsUploaderLoading,
  type,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false)

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

  useEffect(() => setIsUploaderLoading(isPictureLoading), [isPictureLoading, setIsUploaderLoading])

  const onPictureLoad = useCallback(() => setIsPictureLoading(false), [setIsPictureLoading])

  return (
    <StyledDropzone
      disableClick
      disabled={disabled}
      isDragging={isDragging}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      previewPicture={previewPicture}
      {...props}
    >
      <Img alt="" circle={circle} onLoad={onPictureLoad} src={previewPicture} type={type} />
      <InnerLabel circle={circle}>
        <CloudUpload />
        <div>{'Drop a file or click to select one'}</div>
      </InnerLabel>
      {isPictureLoading && (
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

const BasePictureUploader = ({
  circle,
  crop,
  disabled,
  doneCropping,
  hasNewUpload,
  isLoading,
  isPictureLoading,
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
  onPictureLoaded,
  onRemovePicture,
  picture,
  picturePreviewRef,
  previewPicture,
  progress,
  required = false,
  setHasNewUpload,
  setIsLoading,
  setIsPictureLoading,
  setIsUploaderLoading,
  setModalOpen,
  value,
  type,
}) => (
  <>
    <PicturesModal
      crop={crop}
      croppingState={!doneCropping}
      hasNewUpload={hasNewUpload}
      isLoading={isLoading}
      onCancelClick={onCancelClick}
      onCropChange={onCropChange}
      onCropComplete={onCropComplete}
      onCropDoneClick={onCropDoneClick}
      onFileUpload={onFileUpload}
      onGalleryDoneClick={onGalleryDoneClick}
      onModalClose={onModalClose}
      onPictureLoaded={onPictureLoaded}
      open={modalOpen}
      picture={picture}
      picturePreviewRef={picturePreviewRef}
      previewPicture={previewPicture}
      progress={progress}
      setHasNewUpload={setHasNewUpload}
      setIsLoading={setIsLoading}
      setOpen={setModalOpen}
      type={type === 'animationUploader' ? 'animationsModal' : 'picturesModal'}
    />
    <Container>
      <FormControl disabled={disabled} fullWidth margin="normal">
        <InputLabel shrink>{`${label}${required ? ' *' : ''}`}</InputLabel>
        <Dropzone
          accept="image/*"
          circle={circle}
          disabled={disabled}
          isPictureLoading={isPictureLoading}
          multiple={false}
          onClick={onDropzoneClick}
          onFileUpload={onFileUpload}
          previewPicture={value.url && imgixUrl(value.url, { rect: stringifyRect(value.picRect) })}
          setIsPictureLoading={setIsPictureLoading}
          setIsUploaderLoading={setIsUploaderLoading}
          type={type}
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
  </>
)

export default BasePictureUploader
