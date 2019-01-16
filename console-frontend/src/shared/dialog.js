import CloseIcon from '@material-ui/icons/Close'
import MuiIconButton from '@material-ui/core/IconButton'
import React from 'react'
import styled from 'styled-components'
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog as MuiDialog } from '@material-ui/core'

const StyledIconButton = styled(MuiIconButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 4px;
  top: 4px;
`

const Dialog = ({ open, handleClose, dialogActions, title, content, ...props }) => (
  <MuiDialog aria-labelledby="form-dialog-title" onClose={handleClose} open={open} {...props}>
    <StyledIconButton onClick={handleClose}>
      <CloseIcon />
    </StyledIconButton>
    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
    <DialogContent>
      {typeof content == 'string' ? <DialogContentText>{content}</DialogContentText> : content}
    </DialogContent>
    <DialogActions style={{ margin: '12px' }}>{dialogActions}</DialogActions>
  </MuiDialog>
)

export default Dialog
