import React, { useMemo } from 'react'
import { Avatar } from '@material-ui/core'
import { imgixUrl, stringifyRect } from 'plugin-base'

const UserAvatar = ({ className, user }) => {
  const initials = useMemo(
    () => (!user.firstName || !user.lastName ? null : `${user.firstName[0]}${user.lastName[0]}`),
    [user.firstName, user.lastName]
  )

  return (
    <Avatar className={className} src={user.imgUrl && imgixUrl(user.imgUrl, { rect: stringifyRect(user.imgRect) })}>
      {user.imgUrl ? null : initials ? initials : ''}
    </Avatar>
  )
}

export default UserAvatar
