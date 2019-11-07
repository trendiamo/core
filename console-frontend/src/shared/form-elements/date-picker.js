import Button from 'shared/button'
import React from 'react'
import styled from 'styled-components'
import { ArrowDropDown } from '@material-ui/icons'
import { DatePicker as MuiDatePicker } from 'material-ui-pickers'
import { showUpToUsBranding } from 'utils'

const StyledButton = styled(Button)`
  padding: 4px 16px;
`

const DatePickerValue = styled.div`
  ${!showUpToUsBranding() &&
    `
    color: #ff6641;
    padding-left: 5px;
  `}
`

const StyledArrowDropDown = styled(ArrowDropDown)`
  ${showUpToUsBranding()
    ? `margin-right: -12px;
    margin-left: 3px;`
    : 'fill:#ff6641; margin-right: -4px;'}
`

const DatePickerComponent = ({ color, onClick, value }) => (
  <StyledButton color={color} inline onClick={onClick}>
    <DatePickerValue>{value}</DatePickerValue>
    <StyledArrowDropDown />
  </StyledButton>
)

const DatePicker = ({ color = 'whiteBg', maxDate, minDate, setDate, value }) => (
  <MuiDatePicker
    color={color}
    format="MMMM"
    maxDate={maxDate}
    minDate={minDate}
    onChange={setDate}
    TextFieldComponent={DatePickerComponent}
    value={value}
    views={['year', 'month']}
  />
)

export default DatePicker
