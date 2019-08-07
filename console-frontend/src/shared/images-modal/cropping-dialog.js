import Button from 'shared/button'
import Dialog from 'shared/dialog'
import React, { useCallback, useState } from 'react'
import ReactCrop from 'react-image-crop'
import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core'
import { DialogActionsContainer, StyledButton } from './shared'

// max-height: 253px = dialog's margin (96px) + dialog title height (76px) + dialog action height (81px)
const DialogCroppingContainer = styled.div`
  min-height: 200px;
  max-height: calc(100vh - 253px);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ crop }) => (JSON.stringify(crop) === '{}' ? 0 : 1)};
`

const StyledReactCrop = styled(ReactCrop)`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
`

const HiddenImg = styled.img`
  display: none;
`

const CircularProgressContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DialogContentCropping = ({ crop, onCropChange, onCropComplete, onImageLoaded, image, imagePreviewRef }) => {
  const [isImageLoading, setIsImageLoading] = useState(true)

  const newOnImageLoaded = useCallback(
    image => {
      onImageLoaded(image)
      setIsImageLoading(false)
    },
    [onImageLoaded]
  )

  return (
    <>
      <DialogCroppingContainer crop={crop}>
        <HiddenImg alt="" ref={imagePreviewRef} src={image} />
        <StyledReactCrop
          crop={crop}
          keepSelection
          minHeight={20}
          minWidth={20}
          onChange={onCropChange}
          onComplete={onCropComplete}
          onImageLoaded={newOnImageLoaded}
          src={image}
        />
      </DialogCroppingContainer>
      {isImageLoading && (
        <CircularProgressContainer>
          <CircularProgress size={80} />
        </CircularProgressContainer>
      )}
    </>
  )
}

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
  onImageLoaded,
  image,
  imagePreviewRef,
  onCancelCropping,
  onDoneCropping,
  handleClose,
  open,
  onKeyUp,
}) => (
  <Dialog
    content={
      <DialogContentCropping
        crop={crop}
        image={image}
        imagePreviewRef={imagePreviewRef}
        onCropChange={onCropChange}
        onCropComplete={onCropComplete}
        onImageLoaded={onImageLoaded}
      />
    }
    dialogActions={<DialogActionsCropping onCancelCropping={onCancelCropping} onDoneCropping={onDoneCropping} />}
    fullWidth
    handleClose={handleClose}
    maxWidth="md"
    onKeyUp={onKeyUp}
    open={open}
    title="Crop the image, or leave it as default:"
  />
)

export default CroppingDialog
