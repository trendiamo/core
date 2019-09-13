import AspectRatio from 'react-aspect-ratio'
import auth from 'auth'
import Button from 'shared/button'
import Dialog from 'shared/dialog'
import FileUploader from 'shared/file-uploader'
import React, { useCallback, useEffect, useState } from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import { DialogActionsContainer, StyledButton } from './shared'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

const Image = styled.img`
  object-fit: cover;
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

const DialogContentGallery = ({ activeImage, onImageClick, images }) => (
  <Grid container spacing={24}>
    {images &&
      images
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .map(image => (
          <GalleryImage image={image} isActive={image === activeImage} key={image.id} onImageClick={onImageClick} />
        ))}
  </Grid>
)

const DialogActionsGallery = ({ activeImage, onGalleryDoneClick, onFileUpload, onUrlUploadClick }) => {
  const [isDoneButtonDisabled, setIsDoneButtonDisabled] = useState(() => !!activeImage)

  const newOnDoneButtonClick = useCallback(
    () => {
      onGalleryDoneClick(activeImage)
    },
    [onGalleryDoneClick, activeImage]
  )

  useEffect(
    () => {
      setIsDoneButtonDisabled(!activeImage)
    },
    [activeImage]
  )

  return (
    <DialogActionsContainer style={{ justifyContent: 'space-between' }}>
      <div style={{ display: 'flex' }}>
        <StyledButton color="secondaryText" onClick={onUrlUploadClick}>
          {'Add from url'}
        </StyledButton>
        <StyledButton color="secondaryText" withUploader>
          <FileUploader accept="image/*" content="Upload new" name="file-uploader" onChange={onFileUpload} />
        </StyledButton>
      </div>
      <Button color="primaryGradient" disabled={isDoneButtonDisabled} onClick={newOnDoneButtonClick}>
        {'Done'}
      </Button>
    </DialogActionsContainer>
  )
}

const GalleryImage = ({ isActive, onImageClick, image }) => {
  const newOnImageClick = useCallback(() => onImageClick(image), [onImageClick, image])

  return (
    <Grid item md={2} sm={3} xs={4}>
      <AspectRatio style={{ width: '100%' }}>
        <Image id={`image-${image.id}`} isActive={isActive} onClick={newOnImageClick} src={image.url} />
        {isActive && <CheckBoxIcon src="/img/icons/select.svg" />}
      </AspectRatio>
    </Grid>
  )
}

const GalleryDialog = ({
  activeImage,
  handleClose,
  onDialogClose,
  onEntering,
  onFileUpload,
  onGalleryDoneClick,
  onKeyUp,
  onImageClick,
  onUrlUploadClick,
  open,
  images,
  isUserProfileImage,
}) => (
  <Dialog
    content={<DialogContentGallery activeImage={activeImage} images={images} onImageClick={onImageClick} />}
    dialogActions={
      <DialogActionsGallery
        activeImage={activeImage}
        onDialogClose={onDialogClose}
        onFileUpload={onFileUpload}
        onGalleryDoneClick={onGalleryDoneClick}
        onUrlUploadClick={onUrlUploadClick}
      />
    }
    fullWidth
    handleClose={handleClose}
    maxWidth="lg"
    onEntering={onEntering}
    onKeyUp={onKeyUp}
    open={open}
    subtitle={
      !auth.isSeller() &&
      !isUserProfileImage && (
        <DialogSubtitleLink to={routes.imagesList()}>{'Or go to the image gallery >'}</DialogSubtitleLink>
      )
    }
    title="Select an image from the gallery:"
  />
)

export default GalleryDialog
