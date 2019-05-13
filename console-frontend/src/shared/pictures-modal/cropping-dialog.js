import Button from 'shared/button'
import Dialog from 'shared/dialog'
import React from 'react'
import ReactCrop from 'react-image-crop'
import styled from 'styled-components'
import { DialogActionsContainer, StyledButton } from './shared'

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

const CroppingDialog = ({
  crop,
  onCropChange,
  onCropComplete,
  onPictureLoaded,
  picturePreview,
  picturePreviewRef,
  onCancelCropping,
  onDoneCropping,
  handleClose,
  open,
  onEntering,
  onKeyUp,
}) => (
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
    handleClose={handleClose}
    maxWidth="md"
    onEntering={onEntering}
    onKeyUp={onKeyUp}
    open={open}
    title="Crop the picture, or leave it as default:"
  />
)

export default CroppingDialog
