import CloseIcon from '@material-ui/icons/Close'
import MuiIconButton from '@material-ui/core/IconButton'
import omit from 'lodash.omit'
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

const StyledDialogTitle = styled(props => <DialogTitle {...omit(props, ['hasManualPadding'])} />)`
  ${({ hasManualPadding }) => hasManualPadding && 'padding: 0;'}
`

const StyledDialogContent = styled(props => <DialogContent {...omit(props, ['hasManualPadding'])} />)`
  padding-bottom: 0;
  ${({ hasManualPadding }) => hasManualPadding && 'padding: 0;'}
`

const Dialog = ({
  open,
  handleClose,
  onKeyUp,
  dialogActions,
  title,
  subtitle,
  content,
  hasManualPadding,
  PaperProps,
  ...props
}) => (
  <MuiDialog
    aria-labelledby="form-dialog-title"
    onClose={handleClose}
    onKeyUp={onKeyUp}
    open={open}
    PaperProps={PaperProps}
    {...props}
  >
    <StyledIconButton onClick={handleClose}>
      <CloseIcon />
    </StyledIconButton>
    <StyledDialogTitle hasManualPadding={hasManualPadding} id="form-dialog-title">
      {title}
    </StyledDialogTitle>
    {subtitle && <DialogSubtitle>{subtitle}</DialogSubtitle>}
    <StyledDialogContent hasManualPadding={hasManualPadding}>
      {typeof content == 'string' ? <DialogContentText>{content}</DialogContentText> : content}
    </StyledDialogContent>
    {dialogActions && <DialogActions style={{ margin: '12px' }}>{dialogActions}</DialogActions>}
  </MuiDialog>
)

export default Dialog
