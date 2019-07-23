import auth from 'auth'
import ChangePasswordForm from './change-password-form'
import Dialog from 'shared/dialog'
import EditMe from './edit-me'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { HelpOutline } from '@material-ui/icons'
import { Tooltip } from '@material-ui/core'

const HelpIcon = styled(HelpOutline)`
  width: 16px;
  fill: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: inline-block;
  margin-left: 5px;
`

const StyledHeader = styled.div`
  width: auto;
  display: inline-block;
`

const HeaderContainer = styled.div`
  position: relative;
`

const DialogContent = ({ showPasswordForm, togglePasswordForm, handleClose }) => {
  return showPasswordForm ? (
    <ChangePasswordForm handleClose={handleClose} togglePasswordForm={togglePasswordForm} />
  ) : (
    <EditMe togglePasswordForm={togglePasswordForm} />
  )
}

const DialogHeader = ({ showPasswordForm }) => {
  if (showPasswordForm) return <StyledHeader>{'Change Password'}</StyledHeader>
  return (
    <HeaderContainer>
      <StyledHeader>{'Your Personal Info'}</StyledHeader>
      {!auth.isSingleAccount() && (
        <Tooltip placement="top" title="This changes your settings for all accounts">
          <HelpIcon />
        </Tooltip>
      )}
    </HeaderContainer>
  )
}

const UserSettings = ({ open, setOpen }) => {
  const handleClose = useCallback(() => setOpen(false), [setOpen])

  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const togglePasswordForm = useCallback(
    () => {
      setShowPasswordForm(!showPasswordForm)
    },
    [showPasswordForm]
  )

  useEffect(
    () => {
      open && setShowPasswordForm(false)
    },
    [open]
  )

  return (
    <Dialog
      content={
        <DialogContent
          handleClose={handleClose}
          showPasswordForm={showPasswordForm}
          togglePasswordForm={togglePasswordForm}
        />
      }
      fullWidth
      handleClose={handleClose}
      maxWidth="sm"
      open={open}
      title={<DialogHeader showPasswordForm={showPasswordForm} />}
    />
  )
}

export default UserSettings
