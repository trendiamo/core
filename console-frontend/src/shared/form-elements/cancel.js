import MuiDelete from '@material-ui/icons/DeleteOutlined'
import React, { memo, useCallback } from 'react'
import { IconButton } from '@material-ui/core'

const Cancel = ({ index, disabled, onClick, ...props }) => {
  const onClickHandler = useCallback(() => disabled || onClick(index), [disabled, index, onClick])

  return (
    <IconButton onClick={onClickHandler}>
      <MuiDelete {...props} disabled={disabled} />
    </IconButton>
  )
}

export default memo(
  Cancel,
  (prevProps, nextProps) => prevProps.disabled === nextProps.disabled && prevProps.index === nextProps.index
)
