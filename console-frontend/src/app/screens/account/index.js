import AppBarButton from 'shared/app-bar-button'
import auth from 'auth'
import EditWebsite from './edit-website'
import React from 'react'
import routes from 'app/routes'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { Link } from 'react-router-dom'
import { UsersList } from './users'

const Actions = () => {
  return auth.isAdmin() || auth.getAccountRole() === 'owner' ? (
    <AppBarButton color="primary" component={Link} to={routes.userInvite()} variant="contained">
      {'Invite User'}
    </AppBarButton>
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
