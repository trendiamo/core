import auth from 'auth'
import Button from 'shared/button'
import EditWebsite from './edit-website'
import React from 'react'
import routes from 'app/routes'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { Link } from 'react-router-dom'
import { showUpToUsBranding } from 'utils'
import { UsersList } from './users'

const Actions = () => {
  return auth.isAdmin() || auth.getAccountRole() === 'owner' ? (
    <Button
      color="primaryGradient"
      component={Link}
      inline
      size={showUpToUsBranding() ? 'small' : 'medium'}
      to={routes.userInvite()}
      variant="contained"
    >
      {'Invite User'}
    </Button>
  ) : null
}

const appBarContent = { Actions: <Actions />, title: 'Account' }

const Account = () => {
  useAppBarContent(appBarContent)

  return (
    <>
      {auth.getAccountRole() !== 'editor' && (
        <>
          <EditWebsite />
          <UsersList />
        </>
      )}
    </>
  )
}

export default Account
