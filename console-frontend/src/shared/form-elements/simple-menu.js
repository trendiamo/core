import Button from 'shared/button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import React, { useCallback, useState } from 'react'

const SimpleMenu = ({ isFormPristine, isFormSubmitting, disabled, message, actions, onFormSubmit }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const closeMenu = useCallback(() => setAnchorEl(null), [])
  const handleClose = useCallback(
    (event, action) => {
      setAnchorEl(null)
      onFormSubmit(event, action)
    },
    [onFormSubmit]
  )
  const handleClick = useCallback(event => setAnchorEl(event.currentTarget), [])

  return (
    <div>
      <Button
        aria-haspopup="true"
        aria-owns={anchorEl ? 'actions-menu' : undefined}
        color="actions"
        disabled={disabled}
        isFormPristine={isFormPristine}
        isFormSubmitting={isFormSubmitting}
        onClick={handleClick}
      >
        {message || 'Select Action'}
      </Button>
      <Menu anchorEl={anchorEl} id="actions-menu" onClose={closeMenu} open={Boolean(anchorEl)}>
        {actions.map((action, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <MenuItem key={index} onClick={event => handleClose(event, action.label)}>
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default SimpleMenu
