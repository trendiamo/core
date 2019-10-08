import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React, { useCallback, useState } from 'react'
import { IconButton } from 'shared/form-elements'

const SimpleMenuItem = ({ action, handleClose, disabled }) => {
  const onClick = useCallback(event => handleClose(event, action), [action, handleClose])

  return (
    <MenuItem disabled={disabled} onClick={onClick}>
      {action.label}
    </MenuItem>
  )
}

const SimpleMenu = ({ actions, disabled }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const closeMenu = useCallback(() => setAnchorEl(null), [])

  const handleClose = useCallback((event, action) => {
    event.persist()
    setAnchorEl(null)
    // setTimeout needed to trigger form validation
    action.onClick && setTimeout(() => action.onClick(event, action), 0)
  }, [])
  const handleClick = useCallback(event => setAnchorEl(event.currentTarget), [])

  return (
    <>
      <IconButton aria-haspopup="true" aria-owns="actions-menu" disabled={disabled} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} id="actions-menu" onClose={closeMenu} open={Boolean(anchorEl)}>
        {actions.map(action => (
          <SimpleMenuItem action={action} disabled={action.disabled} handleClose={handleClose} key={action.label} />
        ))}
      </Menu>
    </>
  )
}

export default SimpleMenu
