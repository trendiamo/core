import IconButton from './icon-button'
import MuiDelete from '@material-ui/icons/DeleteOutlined'
import React, { useCallback } from 'react'

const Cancel = ({ index, disabled, onClick, ...props }) => {
  const onClickHandler = useCallback(() => disabled || onClick(index), [disabled, index, onClick])

  return (
    <IconButton onClick={onClickHandler}>
      <MuiDelete {...props} disabled={disabled} />
    </IconButton>
  )
}

export default Cancel
