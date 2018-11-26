import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import MuiDialog from '@material-ui/core/Dialog'
import React from 'react'

const Dialog = ({ open, handleClose, dialogActions, title, content }) => (
  <MuiDialog aria-labelledby="form-dialog-title" onClose={handleClose} open={open}>
    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
    <DialogContent>
      {typeof content == 'string' ? <DialogContentText>{content}</DialogContentText> : content}
    </DialogContent>
    <DialogActions style={{ margin: '12px' }}>{dialogActions}</DialogActions>
  </MuiDialog>
)

export default Dialog
