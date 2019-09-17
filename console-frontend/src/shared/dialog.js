import CloseIcon from '@material-ui/icons/Close'
import MuiIconButton from '@material-ui/core/IconButton'
import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import { DialogActions, DialogContent, DialogContentText, Dialog as MuiDialog, Typography } from '@material-ui/core'
import { showUpToUsBranding } from 'utils'

const StyledIconButton = styled(MuiIconButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 1;
  ${showUpToUsBranding() &&
    `
    background: #8799a4;
    border-radius: 0px;
    padding: 6px;
    &:hover {
      background: #8799a4;
    }
  `}
`

const CloseIconStyled = styled(CloseIcon)`
  ${showUpToUsBranding() && 'fill: #fff;'}
`

const DialogSubtitle = styled.span`
  font-size: 14px;
  padding-left: 24px;
  padding-bottom: 20px;
  margin-top: -20px;
`

const StyledDialogContent = styled(props => <DialogContent {...omit(props, ['hasManualPadding'])} />)`
  padding-bottom: 0;
  ${({ hasManualPadding }) => hasManualPadding && 'padding: 0;'}
`

const TitleContainer = styled.div`
  padding: ${({ hasManualPadding }) => (hasManualPadding ? '0' : '24px 24px 20px')};
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
  ...props
}) => (
  <MuiDialog
    aria-labelledby="form-dialog-title"
    onClose={handleClose}
    onKeyUp={onKeyUp}
    open={open}
    PaperProps={showUpToUsBranding() ? { style: { borderRadius: '0px' } } : {}}
    {...props}
  >
    <StyledIconButton onClick={handleClose}>
      <CloseIconStyled />
    </StyledIconButton>
    <TitleContainer hasManualPadding={hasManualPadding}>
      {title && <Typography variant={showUpToUsBranding() ? 'h5' : 'h6'}>{title}</Typography>}
    </TitleContainer>
    {subtitle && <DialogSubtitle>{subtitle}</DialogSubtitle>}
    <StyledDialogContent hasManualPadding={hasManualPadding}>
      {typeof content == 'string' ? <DialogContentText>{content}</DialogContentText> : content}
    </StyledDialogContent>
    {dialogActions && <DialogActions style={{ margin: '12px' }}>{dialogActions}</DialogActions>}
  </MuiDialog>
)

export default Dialog
