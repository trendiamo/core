import omit from 'lodash.omit'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Chip } from '@material-ui/core'

const StyledChip = styled(props => <Chip {...omit(props, ['active'])} />)`
  border-radius: 4px;
  color: #fff;
  font-family: Lato, 'Helvetica', 'Arial', sans-serif;
  height: 24px;
  margin: 2px;
  text-transform: capitalize;
  transition: all 0.3s;
  ${({ active, clickable }) => !active && clickable && 'opacity: 0.5;'}

  span {
    font-weight: 700;
    padding: 0 6px;
  }
`

const Tag = ({ active, clickable = false, label, onTagClick, tag, ...props }) => {
  const onClick = useCallback(() => (clickable ? onTagClick(tag) : null), [clickable, onTagClick, tag])

  return (
    <StyledChip active={active} clickable={clickable} color="secondary" label={label} onClick={onClick} {...props} />
  )
}

export default Tag
