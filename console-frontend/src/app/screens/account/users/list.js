import auth from 'auth'
import React, { useMemo } from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import styled from 'styled-components'
import { apiUserDestroy, apiUserList } from 'utils'
import { Avatar, EnhancedList, TableCell } from 'shared/table-elements'
import { Typography } from '@material-ui/core'

const StyledAvatar = styled(Avatar)`
  display: flex;
  font-size: 1rem;
  margin-right: 0.5rem;
`

const columns = [
  { name: 'avatar' },
  { name: 'firstName', label: 'name', sortable: true },
  { name: 'email', label: 'email', sortable: true },
  { name: 'role', label: 'role', sortable: true },
]

const BlankState = () => (
  <Section title="Users">
    <Typography variant="body1">{'There are no users yet in this account.'}</Typography>
  </Section>
)

const UsersRow = ({ record: { email, firstName, lastName, profilePicUrl, roles } }) => {
  const role = useMemo(() => roles[auth.getSessionAccount().id], [roles])

  const initials = useMemo(() => (!firstName || !lastName ? null : `${firstName[0]}${lastName[0]}`), [
    firstName,
    lastName,
  ])

  return (
    <>
      <TableCell>
        <StyledAvatar src={profilePicUrl}>{profilePicUrl ? null : initials ? initials : ''}</StyledAvatar>
      </TableCell>
      <TableCell width="40%">
        {firstName} {lastName}
      </TableCell>
      <TableCell width="40%">{email}</TableCell>
      <TableCell width="20%">{role.charAt(0).toUpperCase() + role.slice(1)}</TableCell>
    </>
  )
}

const api = { fetch: apiUserList, destroy: apiUserDestroy }
const canEditResource = () => auth.isAdmin()
const defaultSorting = { column: 'role', direction: 'asc' }
const usersRoutes = { create: routes.userCreate }

const UsersList = () => (
  <EnhancedList
    api={api}
    BlankState={BlankState}
    canEditResource={canEditResource}
    columns={columns}
    defaultSorting={defaultSorting}
    ResourceRow={UsersRow}
    routes={usersRoutes}
    title="Users"
  />
)

export default UsersList
