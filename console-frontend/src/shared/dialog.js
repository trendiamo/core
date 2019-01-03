import React from 'react'
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog as MuiDialog } from '@material-ui/core'

const Dialog = ({ open, handleClose, dialogActions, title, content, ...props }) => (
  <MuiDialog aria-labelledby="form-dialog-title" onClose={handleClose} open={open} {...props}>
    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
    <DialogContent>
      {typeof content == 'string' ? <DialogContentText>{content}</DialogContentText> : content}
    </DialogContent>
    <DialogActions style={{ margin: '12px' }}>{dialogActions}</DialogActions>
  </MuiDialog>
)

export default Dialog
