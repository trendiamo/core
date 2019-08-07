import Dialog from 'shared/dialog'
import FileUploader from 'shared/file-uploader'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { StyledButton } from './shared'
import { Typography } from '@material-ui/core'

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

const DialogContentEmpty = ({ type }) => {
  const resource = useMemo(() => (type === 'animationsModal' ? 'animation' : 'image'), [type])

  return (
    <DialogEmptyContainer>
      <DialogEmptyIcon alt="" src="/img/icons/ic_emoji_thinking.png" />
      <Typography variant="h5">{`No ${resource}s found`}</Typography>
      <Typography variant="subtitle1">{`You don't have any ${resource} in your gallery. Let's upload one?`}</Typography>
    </DialogEmptyContainer>
  )
}

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

const EmptyDialog = ({ handleClose, onFileUpload, onUrlUploadClick, open, type }) => (
  <Dialog
    content={<DialogContentEmpty type={type} />}
    dialogActions={<DialogActionsEmpty onFileUpload={onFileUpload} onUrlUploadClick={onUrlUploadClick} />}
    handleClose={handleClose}
    open={open}
    title=""
  />
)

export default EmptyDialog
