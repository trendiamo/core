import React, { memo } from 'react'
import styled from 'styled-components'
import theme from 'app/theme'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { FormControl, Input, InputLabel } from '@material-ui/core'
import { omit } from 'lodash'

const Counter = styled.div`
  position: absolute;
  bottom: -8px;
  right: 0;
  font-size: 14px;
  color: ${({ isOutsideLimits }) => (isOutsideLimits ? theme.palette.error.main : '#555')};
`

const Container = styled.div`
  position: relative;
`

const Label = memo(
  InputLabel,
  (prevProps, nextProps) => prevProps.children === nextProps.children && prevProps.shrink === nextProps.shrink
)

const FieldTemplate = ({
  isOutsideLimits,
  handleFocus,
  handleBlur,
  focused,
  handleChange,
  textLength,
  max,
  label,
  value,
  required,
  ...props
}) => (
  <Container>
    <FormControl fullWidth margin="normal">
      <Label required={required} shrink={focused || value.length !== 0}>
        {label}
      </Label>
      <Input
        required={required}
        {...omit(props, ['setTextLength', 'setIsOutsideLimits', 'setFocused', 'margin'])}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        value={value}
      />
    </FormControl>
    {focused && max && (
      <Counter isOutsideLimits={isOutsideLimits}>
        {isOutsideLimits ? 'Might be too long to display correctly' : max - textLength}
      </Counter>
    )}
  </Container>
)

const Field = compose(
  withState('textLength', 'setTextLength', 0),
  withState('isOutsideLimits', 'setIsOutsideLimits', false),
  withState('focused', 'setFocused', false),
  withHandlers({
    handleChange: ({ onChange, max, setTextLength, setIsOutsideLimits }) => event => {
      const textLength = event.target.value.length
      setTextLength(textLength)
      setIsOutsideLimits(textLength > max)
      onChange(event)
    },
    handleFocus: ({ setFocused, onFocus }) => () => {
      setFocused(true)
      onFocus && onFocus()
    },
    handleBlur: ({ setFocused, onBlur }) => () => {
      setFocused(false)
      onBlur && onBlur()
    },
  }),
  lifecycle({
    componentDidUpdate() {
      const { value, textLength, setTextLength, max, setIsOutsideLimits } = this.props
      if (value.length !== textLength) {
        setTextLength(value.length)
        setIsOutsideLimits(value.length > max)
      }
    },
  })
)(FieldTemplate)

export default memo(
  Field,
  (prevProps, nextProps) => prevProps.value === nextProps.value && prevProps.disabled === nextProps.disabled
)
