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
import { apiPictureList, apiRequest } from 'utils'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { Grid, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import 'react-aspect-ratio/aspect-ratio.css'

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

const StyledReactCrop = styled(ReactCrop)`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
`

const DialogCroppingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const HiddenImg = styled.img`
  display: none;
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

const FilteredTypography = props => <Typography {...omit(props, ['fontSize', 'fontWeight'])} />

const StyledTypography = styled(FilteredTypography)`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: black;
`

const DialogSubtitleLink = styled(Link)`
  color: #ff6641;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const DialogEmptyContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;
`

const DialogEmptyIcon = styled.img`
  width: 89px;
  margin-bottom: 10px;
`

const DialogEmptyButton = styled(FiltredButton)`
  margin: 0 auto 10px;
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

const DialogContentGallery = ({ activePicture, isLoading, onPictureClick, pictures }) => (
  <React.Fragment>
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
    {isEmpty(pictures) && isLoading && <CircularProgress />}
  </React.Fragment>
)

const DialogActionsGallery = ({ onDialogClose, onFileUpload }) => (
  <div style={{ padding: '10px' }}>
    <StyledButton color="secondaryText" withUploader>
      <FileUploader accept="image/*" content="Upload new" name="file-uploader" onChange={onFileUpload} />
    </StyledButton>
    <Button color="primaryGradient" onClick={onDialogClose}>
      {'Done'}
    </Button>
  </div>
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
  <div style={{ padding: '10px' }}>
    <StyledButton color="secondaryText" onClick={onCancelCropping}>
      {'Cancel'}
    </StyledButton>
    <Button color="primaryGradient" onClick={onDoneCropping}>
      {'Done'}
    </Button>
  </div>
)

const DialogContentEmpty = () => (
  <DialogEmptyContainer>
    <DialogEmptyIcon alt="" src="/img/icons/ic_emoji_thinking.png" />
    <StyledTypography fontSize="1.8rem" fontWeight="500">
      {'No pictures found'}
    </StyledTypography>
    <StyledTypography fontSize="1rem" fontWeight="400">
      {"You don't have any picture in your gallery. Let's upload one?"}
    </StyledTypography>
  </DialogEmptyContainer>
)

const DialogActionsEmpty = ({ handleClose, onFileUpload }) => (
  <DialogEmptyButton color="primaryGradient" onClick={handleClose} size="large" withUploader>
    <FileUploader accept="image/*" content="Upload new" name="file-uploader" onChange={onFileUpload} />
  </DialogEmptyButton>
)

const picturesGrid = [
  { size: window.innerWidth < 600, tiles: 3 },
  { size: window.innerWidth < 960, tiles: 4 },
  { size: window.innerWidth >= 960, tiles: 6 },
]

const PicturesModal = compose(
  withState('activePicture', 'setActivePicture', null),
  withState('emptyState', 'setEmptyState', true),
  withState('isLoading', 'setIsLoading', false),
  withState('pictures', 'setPictures', []),
  withSnackbar,
  withHandlers({
    handleClose: ({ setOpen }) => () => {
      setOpen(false)
    },
    onCancelCropping: ({ onCancelClick, setActivePicture }) => () => {
      onCancelClick()
      setActivePicture(null)
    },
    onDialogClose: ({ activePicture, onModalClose }) => () => {
      if (activePicture) onModalClose(activePicture.url)
    },
    onDoneCropping: ({ onDoneClick, setActivePicture }) => () => {
      setActivePicture(null)
      onDoneClick()
    },
    onFileUpload: ({ onDrop }) => ({ target: { files } }) => {
      onDrop(files)
    },
    onPictureClick: ({ setActivePicture }) => picture => {
      setActivePicture(picture)
    },
  }),
  withHandlers({
    fetchPictures: ({ enqueueSnackbar, handleClose, setEmptyState, setPictures }) => async () => {
      const { json, response, errors, requestError, ...rest } = await apiRequest(apiPictureList, '')
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (requestError || errors) {
        setPictures([])
        handleClose()
      } else {
        isEmpty(json) ? setEmptyState(true) : setEmptyState(false)
      }
      return { json, response, errors, requestError, ...rest }
    },
    onCropKeyup: ({ onDoneCropping }) => ({ keyCode }) => {
      if (keyCode === 13) onDoneCropping()
    },
  }),
  withHandlers({
    onDialogEntering: ({
      croppingState,
      fetchPictures,
      previewPicture,
      setActivePicture,
      setIsLoading,
      setPictures,
    }) => async () => {
      setIsLoading(true)
      if (croppingState) {
        await new Promise(resolve => setTimeout(resolve, 5000))
      } else {
        await fetchPictures().then(response => {
          setPictures(response.json)
          const activePicture = response.json.find(picture => picture.url === previewPicture)
          if (activePicture) setActivePicture(activePicture)
        })
      }
      setIsLoading(false)
    },
    onGalleryKeyup: ({ activePicture, onDialogClose, pictures, setActivePicture }) => ({ keyCode }) => {
      let newActivePicture = activePicture
      if (activePicture) {
        const activePictureIndex = pictures.indexOf(activePicture)
        if (keyCode === 37 && activePictureIndex > 0) {
          newActivePicture = pictures[activePictureIndex - 1]
        } else if (keyCode === 39 && activePictureIndex < pictures.length - 1) {
          newActivePicture = pictures[activePictureIndex + 1]
        }
        picturesGrid.forEach(grid => {
          if (grid.size) {
            if (keyCode === 38 && activePictureIndex - grid.tiles > -1) {
              newActivePicture = pictures[activePictureIndex - grid.tiles]
            } else if (keyCode === 40 && activePictureIndex + grid.tiles < pictures.length) {
              newActivePicture = pictures[activePictureIndex + grid.tiles]
            }
          }
        })
        setActivePicture(newActivePicture)
        document.getElementById(`picture-${newActivePicture.id}`).scrollIntoView()
      } else {
        if (keyCode === 37 && pictures.length > 0) setActivePicture(pictures[pictures.length - 1])
        if (keyCode === 39 && pictures.length > 0) setActivePicture(pictures[0])
      }
      if (keyCode === 13) onDialogClose()
    },
  }),
  lifecycle({
    componentDidMount() {
      const { fetchPictures } = this.props
      fetchPictures()
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
    onCancelCropping,
    onCropChange,
    onCropComplete,
    onCropKeyup,
    onDialogClose,
    onDialogEntering,
    onDoneCropping,
    onGalleryKeyup,
    onFileUpload,
    onPictureClick,
    onPictureLoaded,
    open,
    pictures,
    picturePreview,
    picturePreviewRef,
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
    ) : emptyState ? (
      <Dialog
        content={<DialogContentEmpty />}
        dialogActions={<DialogActionsEmpty onFileUpload={onFileUpload} />}
        handleClose={handleClose}
        open={open}
        title=""
      />
    ) : (
      <Dialog
        content={
          <DialogContentGallery
            activePicture={activePicture}
            isLoading={isLoading}
            onPictureClick={onPictureClick}
            pictures={pictures}
          />
        }
        dialogActions={<DialogActionsGallery onDialogClose={onDialogClose} onFileUpload={onFileUpload} />}
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

export default PicturesModal
