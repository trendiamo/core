import AspectRatio from 'react-aspect-ratio'
import Button from 'shared/button'
import CircularProgress from 'app/layout/loading'
import Dialog from 'shared/dialog'
import FileUploader from 'shared/file-uploader'
import omit from 'lodash.omit'
import React from 'react'
import ReactCrop from 'react-image-crop'
import routes from 'app/routes'
import styled from 'styled-components'
import { apiGetRemotePicture, apiPictureList, apiRequest } from 'utils'
import { compose, withHandlers, withState } from 'recompose'
import { Grid, Input, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import { Link as LinkIcon } from '@material-ui/icons'
import { useSnackbar } from 'notistack'
import 'react-aspect-ratio/aspect-ratio.css'

const ENTER_KEYCODE = 13

const DialogActionsContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
`

const FiltredButton = props => <Button {...omit(props, ['withUploader'])} />

const StyledButton = styled(FiltredButton)`
  margin-right: 12px;
  ${({ withUploader }) =>
    withUploader &&
    `
    padding: 0;
    label {
      padding: 8px 16px;
    }
  `}
`

const DialogSubtitleLink = styled(Link)`
  color: #ff6641;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const Picture = styled.img`
  width: 100%;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: opacity 150ms;
  ${({ isActive }) =>
    isActive &&
    `
      border-color: #ff6641;
      border-width: 2px;
      opacity: 0.9;
    `}
  &:hover {
    border-width: 3px;
    opacity: 0.9;
  }
`

const CheckBoxIcon = styled.img`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
`

const UrlInputContainer = styled.div`
  margin: 1.5rem 6rem;
  border-radius: 3px;
  background-color: #f5f5f5;
  display: flex;
  overflow: hidden;
  height: 56px;
  transition: all 200ms;
  border: 2px solid ${({ isFocused }) => (isFocused ? '#ff6641' : 'transparent')};
`

const UrlInput = styled(Input)`
  border-radius: 4px;
  padding-left: 16px;
  width: 100%;
`

const UrlIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 56px;
`

const UrlIcon = styled(LinkIcon)`
  width: 24px;
  height: 24px;
`

// max-height: 253px = dialog's margin (96px) + dialog title height (76px) + dialog action height (81px)
const DialogCroppingContainer = styled.div`
  max-height: calc(100vh - 253px);
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledReactCrop = styled(ReactCrop)`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
`

const HiddenImg = styled.img`
  display: none;
`

const DialogEmptyContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;
`

const DialogActionsEmptyContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`

const DialogEmptyIcon = styled.img`
  width: 89px;
  margin-bottom: 10px;
`

const GalleryPicture = compose(
  withHandlers({
    onPictureClick: ({ onPictureClick, picture }) => () => onPictureClick(picture),
  })
)(({ isActive, onPictureClick, picture }) => (
  <Grid item md={2} sm={3} xs={4}>
    <AspectRatio style={{ width: '100%' }}>
      <Picture id={`picture-${picture.id}`} isActive={isActive} onClick={onPictureClick} src={picture.url} />
      {isActive && <CheckBoxIcon src="/img/icons/select.svg" />}
    </AspectRatio>
  </Grid>
))

const DialogContentGallery = ({ activePicture, onPictureClick, pictures }) => (
  <>
    <Grid container spacing={24}>
      {pictures &&
        pictures
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .map(picture => (
            <GalleryPicture
              isActive={picture === activePicture}
              key={picture.id}
              onPictureClick={onPictureClick}
              picture={picture}
            />
          ))}
    </Grid>
  </>
)

const DialogActionsGallery = ({ onDialogClose, onFileUpload, onUrlUploadClick }) => (
  <DialogActionsContainer style={{ justifyContent: 'space-between' }}>
    <div style={{ display: 'flex' }}>
      <StyledButton color="secondaryText" onClick={onUrlUploadClick}>
        {'Add from url'}
      </StyledButton>
      <StyledButton color="secondaryText" withUploader>
        <FileUploader accept="image/*" content="Upload new" name="file-uploader" onChange={onFileUpload} />
      </StyledButton>
    </div>
    <Button color="primaryGradient" onClick={onDialogClose}>
      {'Done'}
    </Button>
  </DialogActionsContainer>
)

const DialogContentUrlUpload = compose(
  withState('isFocused', 'setIsFocused', null),
  withHandlers({
    onChange: ({ setPictureUrl }) => event => {
      setPictureUrl(event.target.value)
    },
    onFocus: ({ setIsFocused }) => () => {
      setIsFocused(true)
    },
    onBlur: ({ setIsFocused }) => () => {
      setIsFocused(false)
    },
  })
)(({ isFocused, isPictureLoading, onBlur, onChange, onFocus }) => (
  <>
    <UrlInputContainer isFocused={isFocused}>
      <UrlInput
        autoFocus
        disableUnderline
        fullWidth
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder="Paste the URL of the picture to upload:"
      />
      <UrlIconContainer>
        <UrlIcon />
      </UrlIconContainer>
    </UrlInputContainer>
    {isPictureLoading && <CircularProgress />}
  </>
))

const DialogActionsUrlUpload = ({ handleClose, onCancelUrlUpload, onDoneUrlUpload, onFileUpload }) => (
  <DialogActionsContainer style={{ justifyContent: 'space-between' }}>
    <div style={{ display: 'flex' }}>
      <StyledButton color="secondaryText" onClick={onCancelUrlUpload}>
        {'Back to gallery'}
      </StyledButton>
      <StyledButton color="secondaryText" onClick={handleClose} withUploader>
        <FileUploader accept="image/*" content="Upload from device" name="file-uploader" onChange={onFileUpload} />
      </StyledButton>
    </div>
    <Button color="primaryGradient" onClick={onDoneUrlUpload}>
      {'Done'}
    </Button>
  </DialogActionsContainer>
)

const DialogContentCropping = ({
  crop,
  onCropChange,
  onCropComplete,
  onPictureLoaded,
  picturePreview,
  picturePreviewRef,
}) => (
  <DialogCroppingContainer>
    <HiddenImg alt="" ref={picturePreviewRef} src={picturePreview} />
    <StyledReactCrop
      crop={crop}
      keepSelection
      minHeight={20}
      minWidth={20}
      onChange={onCropChange}
      onComplete={onCropComplete}
      onImageLoaded={onPictureLoaded}
      src={picturePreview}
    />
  </DialogCroppingContainer>
)

const DialogActionsCropping = ({ onCancelCropping, onDoneCropping }) => (
  <DialogActionsContainer>
    <StyledButton color="secondaryText" onClick={onCancelCropping}>
      {'Cancel'}
    </StyledButton>
    <Button color="primaryGradient" onClick={onDoneCropping}>
      {'Done'}
    </Button>
  </DialogActionsContainer>
)

const DialogContentEmpty = () => (
  <DialogEmptyContainer>
    <DialogEmptyIcon alt="" src="/img/icons/ic_emoji_thinking.png" />
    <Typography variant="h5">{'No pictures found'}</Typography>
    <Typography variant="subtitle1">{"You don't have any picture in your gallery. Let's upload one?"}</Typography>
  </DialogEmptyContainer>
)

const DialogActionsEmpty = ({ handleClose, onFileUpload, onUrlUploadClick }) => (
  <DialogActionsEmptyContainer>
    <StyledButton color="secondaryText" onClick={onUrlUploadClick} size="large">
      {'Add from url'}
    </StyledButton>
    <StyledButton color="primaryGradient" onClick={handleClose} size="large" withUploader>
      <FileUploader accept="image/*" content="Upload new" name="file-uploader" onChange={onFileUpload} />
    </StyledButton>
  </DialogActionsEmptyContainer>
)

const PicturesModal = compose(
  withState('activePicture', 'setActivePicture', null),
  withState('emptyState', 'setEmptyState', false),
  withState('isLoading', 'setIsLoading', false),
  withState('isPictureLoading', 'setIsPictureLoading', false),
  withState('pictures', 'setPictures', []),
  withState('pictureUrl', 'setPictureUrl', ''),
  withState('urlUploadState', 'setUrlUploadState', false),
  withHandlers({
    fetchRemotePicture: ({ enqueueSnackbar, onFileUpload, pictureUrl }) => async () => {
      if (isEmpty(pictureUrl.trim())) return enqueueSnackbar('Please enter an URL', { variant: 'error' })
      try {
        decodeURIComponent(pictureUrl)
      } catch {
        return enqueueSnackbar("Can't find any file at this URL", { variant: 'error' })
      }
      const { json: blob, requestError, errors, response, ...rest } = await apiRequest(apiGetRemotePicture, [
        pictureUrl,
      ])
      if (errors || requestError) {
        enqueueSnackbar(errors.message || requestError, { variant: 'error' })
      } else {
        onFileUpload([blob])
      }
      return { blob, response, errors, requestError, ...rest }
    },
    handleClose: ({ setOpen, setUrlUploadState }) => () => {
      setUrlUploadState(false)
      setOpen(false)
    },
    onCancelCropping: ({ onCancelClick, setActivePicture, setUrlUploadState }) => () => {
      onCancelClick()
      setUrlUploadState(false)
      setActivePicture(null)
    },
    onCancelUrlUpload: ({ setUrlUploadState }) => () => {
      setUrlUploadState(false)
    },
    onDialogClose: ({ activePicture, onModalClose }) => () => {
      onModalClose(activePicture ? activePicture.url : null)
    },
    onDoneCropping: ({ onDoneClick, setActivePicture, setUrlUploadState }) => () => {
      onDoneClick()
      setUrlUploadState(false)
      setActivePicture(null)
    },
    onFileUpload: ({ onFileUpload, setUrlUploadState, urlUploadState }) => ({ target: { files } }) => {
      if (urlUploadState) setUrlUploadState(false)
      onFileUpload(files)
    },
    onPictureClick: ({ setActivePicture }) => picture => {
      setActivePicture(picture)
    },
    onUrlUploadClick: ({ setUrlUploadState, setPictureUrl }) => () => {
      setPictureUrl('')
      setUrlUploadState(true)
    },
  }),
  withHandlers({
    fetchPictures: ({
      enqueueSnackbar,
      handleClose,
      previewPicture,
      setActivePicture,
      setEmptyState,
      setPictures,
    }) => async () => {
      const { json, response, errors, requestError, ...rest } = await apiRequest(apiPictureList, '')
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (requestError || errors) {
        setPictures([])
        handleClose()
      } else if (isEmpty(json)) {
        setEmptyState(true)
      } else {
        setPictures(json)
        const activePicture = json.find(picture => picture.url === previewPicture)
        if (activePicture) setActivePicture(activePicture)
      }
      return { json, response, errors, requestError, ...rest }
    },
    onCropKeyup: ({ onDoneCropping }) => ({ keyCode }) => {
      if (keyCode === ENTER_KEYCODE) onDoneCropping()
    },
    onDoneUrlUpload: ({ fetchRemotePicture, setIsPictureLoading }) => async () => {
      setIsPictureLoading(true)
      await fetchRemotePicture()
      setIsPictureLoading(false)
    },
    onGalleryKeyup: ({ onDialogClose }) => ({ keyCode }) => {
      if (keyCode === ENTER_KEYCODE) onDialogClose()
    },
  }),
  withHandlers({
    onDialogEntering: ({ emptyState, fetchPictures, pictures, setIsLoading }) => async () => {
      if (!emptyState && isEmpty(pictures)) {
        setIsLoading(true)
        await fetchPictures()
        setIsLoading(false)
      }
    },
    onUrlUploadKeyup: ({ onDoneUrlUpload }) => ({ keyCode }) => {
      if (keyCode === ENTER_KEYCODE) onDoneUrlUpload()
    },
  })
)(
  ({
    activePicture,
    crop,
    croppingState,
    emptyState,
    handleClose,
    isLoading,
    isPictureLoading,
    onCancelCropping,
    onCancelUrlUpload,
    onCropChange,
    onCropComplete,
    onCropKeyup,
    onDialogClose,
    onDialogEntering,
    onDoneCropping,
    onDoneUrlUpload,
    onGalleryKeyup,
    onFileUpload,
    onPictureClick,
    onPictureLoaded,
    onUrlUploadClick,
    onUrlUploadKeyup,
    open,
    pictures,
    picturePreview,
    picturePreviewRef,
    setPictureUrl,
    urlUploadState,
  }) =>
    !open ? null : croppingState && picturePreview ? (
      <Dialog
        content={
          <DialogContentCropping
            crop={crop}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onPictureLoaded={onPictureLoaded}
            picturePreview={picturePreview}
            picturePreviewRef={picturePreviewRef}
          />
        }
        dialogActions={<DialogActionsCropping onCancelCropping={onCancelCropping} onDoneCropping={onDoneCropping} />}
        fullWidth
        handleClose={onCancelCropping}
        maxWidth="md"
        onEntering={onDialogEntering}
        onKeyUp={onCropKeyup}
        open={open}
        title="Crop the picture, or leave it as default:"
      />
    ) : urlUploadState ? (
      <Dialog
        content={<DialogContentUrlUpload isPictureLoading={isPictureLoading} setPictureUrl={setPictureUrl} />}
        dialogActions={
          <DialogActionsUrlUpload
            onCancelUrlUpload={onCancelUrlUpload}
            onDoneUrlUpload={onDoneUrlUpload}
            onFileUpload={onFileUpload}
          />
        }
        fullWidth
        handleClose={handleClose}
        maxWidth="lg"
        onKeyUp={onUrlUploadKeyup}
        open={open}
        title="Upload picture from URL:"
      />
    ) : isLoading ? (
      <CircularProgress transparent />
    ) : emptyState ? (
      <Dialog
        content={<DialogContentEmpty />}
        dialogActions={<DialogActionsEmpty onFileUpload={onFileUpload} onUrlUploadClick={onUrlUploadClick} />}
        handleClose={handleClose}
        open={open}
        title=""
      />
    ) : (
      <Dialog
        content={
          <DialogContentGallery activePicture={activePicture} onPictureClick={onPictureClick} pictures={pictures} />
        }
        dialogActions={
          <DialogActionsGallery
            onDialogClose={onDialogClose}
            onFileUpload={onFileUpload}
            onUrlUploadClick={onUrlUploadClick}
          />
        }
        fullWidth
        handleClose={handleClose}
        maxWidth="lg"
        onEntering={onDialogEntering}
        onKeyUp={onGalleryKeyup}
        open={open}
        subtitle={
          <DialogSubtitleLink to={routes.picturesList()}>{'Or go to your pictures gallery >'}</DialogSubtitleLink>
        }
        title="Select a picture from the gallery:"
      />
    )
)

const PicturesModal1 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <PicturesModal {...props} enqueueSnackbar={enqueueSnackbar} />
}

export default PicturesModal1
