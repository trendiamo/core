import Button from 'shared/button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React, { useCallback, useState } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { IconButton } from 'shared/form-elements'
import { Link } from 'react-router-dom'
import { showUpToUsBranding } from 'utils'

const Actions = ({ buttonText, createRoute, width }) => {
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

  if (!createRoute) return null

  if (isWidthUp('sm', width)) {
    return (
      <Button
        color="primaryGradient"
        component={Link}
        inline
        size={showUpToUsBranding() ? 'small' : 'medium'}
        to={createRoute}
        variant="contained"
      >
        {buttonText}
      </Button>
    )
  }

  return (
    <>
      <IconButton aria-haspopup="true" aria-owns="actions-menu" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} id="actions-menu" keepMounted onClose={handleClose} open={!!anchorEl}>
        <MenuItem component={Link} dense onClick={handleClose} to={createRoute}>
          {buttonText}
        </MenuItem>
      </Menu>
    </>
  )
}

export default withWidth()(Actions)
