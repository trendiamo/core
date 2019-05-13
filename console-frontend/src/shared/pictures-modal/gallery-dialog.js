import AspectRatio from 'react-aspect-ratio'
import Button from 'shared/button'
import Dialog from 'shared/dialog'
import FileUploader from 'shared/file-uploader'
import React from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'
import { DialogActionsContainer, StyledButton } from './shared'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

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

const DialogSubtitleLink = styled(Link)`
  color: #ff6641;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const DialogContentGallery = ({ activePicture, onPictureClick, pictures }) => (
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

const GalleryDialog = ({
  activePicture,
  handleClose,
  onDialogClose,
  onEntering,
  onFileUpload,
  onKeyUp,
  onPictureClick,
  onUrlUploadClick,
  open,
  pictures,
}) => (
  <Dialog
    content={<DialogContentGallery activePicture={activePicture} onPictureClick={onPictureClick} pictures={pictures} />}
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
    onEntering={onEntering}
    onKeyUp={onKeyUp}
    open={open}
    subtitle={<DialogSubtitleLink to={routes.picturesList()}>{'Or go to your pictures gallery >'}</DialogSubtitleLink>}
    title="Select a picture from the gallery:"
  />
)

export default GalleryDialog
