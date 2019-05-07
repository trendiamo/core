import React, { memo, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import theme from 'app/theme'
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

const Field = ({ max, label, value, required, onBlur, onFocus, onChange, ...props }) => {
  const [textLength, setTextLength] = useState(0)
  const [isOutsideLimits, setIsOutsideLimits] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleChange = useCallback(
    event => {
      const textLength = event.target.value.length
      setTextLength(textLength)
      setIsOutsideLimits(textLength > max)
      onChange(event)
    },
    [max, onChange]
  )

  const handleFocus = useCallback(
    () => {
      setFocused(true)
      onFocus && onFocus()
    },
    [onFocus]
  )

  const handleBlur = useCallback(
    () => {
      setFocused(false)
      onBlur && onBlur()
    },
    [onBlur]
  )

  useEffect(
    () => {
      if (value.length !== textLength) {
        setTextLength(value.length)
        setIsOutsideLimits(value.length > max)
      }
    },
    [max, textLength, value.length]
  )

  return (
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
}

export default memo(
  Field,
  (prevProps, nextProps) => prevProps.value === nextProps.value && prevProps.disabled === nextProps.disabled
)
