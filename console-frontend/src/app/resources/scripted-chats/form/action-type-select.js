import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'

const ActionTypeSelect = ({ onChange, value }) => (
  <FormControl fullWidth margin="normal">
    <InputLabel shrink>{'Action'}</InputLabel>
    <Select name="chatOption_actionType" onChange={onChange} value={value}>
      <MenuItem value="simple">{'Go to next step'}</MenuItem>
      <MenuItem value="reset">{'Reset'}</MenuItem>
      <MenuItem value="stop">{'Stop'}</MenuItem>
    </Select>
  </FormControl>
)

export default ActionTypeSelect
