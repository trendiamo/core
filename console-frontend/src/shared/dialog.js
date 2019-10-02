import CloseIcon from '@material-ui/icons/Close'
import MuiIconButton from '@material-ui/core/IconButton'
import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
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
    top: 0px;
    right: 0px;
    &:hover {
      background: #8799a4;
    }
  `}
`

const CloseIconStyled = styled(CloseIcon)`
  ${showUpToUsBranding() && 'fill: #fff; width: 30px; height: 30px;'}
`

const DialogSubtitle = styled.span`
  font-size: 14px;
  padding-left: 24px;
  padding-bottom: 20px;
  margin-top: -20px;
`

const StyledDialogContent = styled(props => <DialogContent {...omit(props, ['hasManualPadding', 'flexContent'])} />)`
  padding-bottom: 0;
  ${({ hasManualPadding }) => hasManualPadding && 'padding: 0;'}
  ${({ flexContent }) =>
    flexContent && 'display: flex;'}
`

const TitleContainer = styled.div`
  padding: ${({ hasManualPadding }) => (hasManualPadding ? '0' : '24px 24px 20px')};
`

const Title = ({ title }) => {
  if (typeof title === 'string') {
    return <Typography variant={showUpToUsBranding() ? 'h5' : 'h6'}>{title}</Typography>
  }
  return title
}

const Dialog = ({
  open,
  handleClose,
  onKeyUp,
  dialogActions,
  title,
  subtitle,
  content,
  hasManualPadding,
  width,
  flexContent,
  ...props
}) => (
  <MuiDialog
    aria-labelledby="form-dialog-title"
    fullScreen={!isWidthUp('md', width)}
    onClose={handleClose}
    onKeyUp={onKeyUp}
    open={open}
    PaperProps={showUpToUsBranding() ? { style: { borderRadius: '0px' } } : {}}
    {...props}
  >
    <StyledIconButton onClick={handleClose}>
      <CloseIconStyled />
    </StyledIconButton>
    <TitleContainer hasManualPadding={hasManualPadding}>{title && <Title title={title} />}</TitleContainer>
    {subtitle && <DialogSubtitle>{subtitle}</DialogSubtitle>}
    <StyledDialogContent flexContent={flexContent} hasManualPadding={hasManualPadding}>
      {typeof content == 'string' ? <DialogContentText>{content}</DialogContentText> : content}
    </StyledDialogContent>
    {dialogActions && <DialogActions style={{ margin: '12px' }}>{dialogActions}</DialogActions>}
  </MuiDialog>
)

export default withWidth()(Dialog)
