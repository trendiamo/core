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
  z-index: 1;
`

const DialogSubtitle = styled.span`
  font-size: 14px;
  padding-left: 24px;
  padding-bottom: 20px;
  margin-top: -20px;
`

const Dialog = ({ open, handleClose, onKeyUp, dialogActions, title, subtitle, content, ...props }) => (
  <MuiDialog aria-labelledby="form-dialog-title" onClose={handleClose} onKeyUp={onKeyUp} open={open} {...props}>
    <StyledIconButton onClick={handleClose}>
      <CloseIcon />
    </StyledIconButton>
    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
    {subtitle && <DialogSubtitle>{subtitle}</DialogSubtitle>}
    <DialogContent style={{ paddingBottom: '0' }}>
      {typeof content == 'string' ? <DialogContentText>{content}</DialogContentText> : content}
    </DialogContent>
    <DialogActions style={{ margin: '12px' }}>{dialogActions}</DialogActions>
  </MuiDialog>
)

export default Dialog
