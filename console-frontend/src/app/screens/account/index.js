import auth from 'auth'
import EditWebsite from './edit-website'
import React, { useMemo } from 'react'
import routes from 'app/routes'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { Actions } from 'shared/table-elements'
import { UsersList } from './users'

const Account = () => {
  const appBarContent = useMemo(() => {
    return {
      Actions:
        auth.isAdmin() || auth.getAccountRole() === 'owner' ? (
          <Actions buttonText="Invite User" createRoute={routes.userInvite()} />
        ) : null,
      title: 'Account',
    }
  }, [])

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
