import AppBarButton from 'shared/app-bar-button'
import auth from 'auth'
import EditMe from './edit-me'
import EditWebsite from './edit-website'
import React from 'react'
import routes from 'app/routes'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { Link } from 'react-router-dom'
import { UsersList } from './users'

const Actions = () => {
  return auth.isAdmin() ? (
    <AppBarButton color="primary" component={Link} to={routes.userCreate()} variant="contained">
      {'Add User'}
    </AppBarButton>
  ) : null
}

const appBarContent = { Actions: <Actions />, title: 'Account' }

const Account = () => {
  useAppBarContent(appBarContent)

  return (
    <>
      {(auth.isAdmin() || auth.getUser().role !== 'editor') && (
        <>
          <EditWebsite />
          <UsersList />
        </>
      )}
      {!auth.isAdmin() && <EditMe />}
    </>
  )
}

export default Account
