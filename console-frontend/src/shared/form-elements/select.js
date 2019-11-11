import Label from './label'
import React, { memo, useCallback, useState } from 'react'
import snakeCase from 'lodash.snakecase'
import styled from 'styled-components'
import { FormControl, MenuItem, Select as MuiSelect } from '@material-ui/core'

const StyledSelect = styled(MuiSelect)`
  div[role='button']:focus {
    background: transparent;
  }
`

const Select = ({ fullWidth, label, margin, onChange, onClose, onOpen, options, required, value, ...props }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setOpen(true)
    onOpen && onOpen()
  }, [onOpen])

  const handleClose = useCallback(() => {
    setOpen(false)
    onClose && onClose()
  }, [onClose])

  return (
    <FormControl fullWidth={fullWidth} margin={margin} required={required}>
      <Label required={required} shrink={open || !!value}>
        {label}
      </Label>
      <StyledSelect onChange={onChange} onClose={handleClose} onOpen={handleOpen} open={open} value={value} {...props}>
        {options.map(option => {
          return (
            <MenuItem key={snakeCase(option)} value={snakeCase(option)}>
              {option}
            </MenuItem>
          )
        })}
      </StyledSelect>
    </FormControl>
  )
}

export default memo(Select)
