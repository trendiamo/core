import Button from 'shared/button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'

const SimpleMenu = ({
  anchorEl,
  handleClick,
  handleClose,
  isFormPristine,
  isFormSubmitting,
  disabled,
  message,
  actions,
  closeMenu,
}) => (
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

export default compose(
  withState('anchorEl', 'setAnchorEl', null),
  withHandlers({
    closeMenu: ({ setAnchorEl }) => () => setAnchorEl(null),
    handleClose: ({ onFormSubmit, setAnchorEl }) => (event, action) => {
      setAnchorEl(null)
      onFormSubmit(event, action)
    },
    handleClick: ({ setAnchorEl }) => event => setAnchorEl(event.currentTarget),
  })
)(SimpleMenu)
