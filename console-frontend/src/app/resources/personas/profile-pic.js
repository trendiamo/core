import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import { Avatar } from '@material-ui/core'

const FilteredAvatar = props => <Avatar {...omit(props, ['small'])} />

const StyledAvatar = styled(FilteredAvatar)`
  width: ${({ small }) => (small ? '40px' : '100px')};
  height: ${({ small }) => (small ? '40px' : '100px')};
`

const ProfilePic = ({ persona, small }) => <StyledAvatar alt={persona.name} small={small} src={persona.profilePicUrl} />

export default ProfilePic
