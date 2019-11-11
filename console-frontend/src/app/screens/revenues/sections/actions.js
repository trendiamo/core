import DatePicker from 'shared/form-elements/date-picker'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React, { useCallback, useState } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { IconButton } from 'shared/form-elements'

const Actions = ({ maxDate, minDate, setDate, value, width, disabled }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = useCallback(
    event => {
      setAnchorEl(event.currentTarget)
    },
    [setAnchorEl]
  )

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  if (isWidthUp('sm', width)) return <DatePicker maxDate={maxDate} minDate={minDate} setDate={setDate} value={value} />

  return (
    <>
      <IconButton aria-haspopup="true" aria-owns="actions-menu" disabled={disabled} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} id="actions-menu" keepMounted onClose={handleClose} open={!!anchorEl}>
        <MenuItem dense disableGutters onClick={handleClose}>
          <DatePicker color="primaryText" maxDate={maxDate} minDate={minDate} setDate={setDate} value={value} />
        </MenuItem>
      </Menu>
    </>
  )
}

export default withWidth()(Actions)
