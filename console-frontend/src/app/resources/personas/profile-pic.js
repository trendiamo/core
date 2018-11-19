import Avatar from '@material-ui/core/Avatar'
import React from 'react'
import styled from 'styled-components'

const sanitizeProps = props => {
  const newProps = { ...props }
  delete newProps.small
  return newProps
}

const FilteredAvatar = props => <Avatar {...sanitizeProps(props)} />

const StyledAvatar = styled(FilteredAvatar)`
  width: ${({ small }) => (small ? '40px' : '100px')};
  height: ${({ small }) => (small ? '40px' : '100px')};
`

const ProfilePic = ({ persona, small }) => <StyledAvatar alt={persona.name} small={small} src={persona.profilePicUrl} />

export default ProfilePic
