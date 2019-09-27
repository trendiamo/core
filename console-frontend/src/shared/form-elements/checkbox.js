import React, { useCallback } from 'react'
import styled from 'styled-components'
import { FormControlLabel, FormLabel, Checkbox as MuiCheckbox } from '@material-ui/core'

const StyledLabel = styled(FormLabel)`
  cursor: pointer;
  user-select: none;
`

const Checkbox = ({ value, setValue, onChange, label, required, color, ...props }) => {
  const onClick = useCallback(
    () => {
      onChange ? onChange(!value) : setValue(!value)
    },
    [onChange, setValue, value]
  )

  return (
    <FormControlLabel
      control={
        <MuiCheckbox checked={value} color={color || 'primary'} onChange={onClick} required={required} {...props} />
      }
      label={<StyledLabel onClick={onClick}>{label}</StyledLabel>}
    />
  )
}

export default Checkbox
