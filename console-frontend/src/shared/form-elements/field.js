import omit from 'lodash.omit'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import theme from 'app/theme'
import { FormControl, Input, InputLabel } from '@material-ui/core'

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

const Field = ({ autoFocus, disabled, label, max, onBlur, onChange, onFocus, required, value, ...props }) => {
  const inputRef = useRef(null)
  const [focused, setFocused] = useState(false)
  const [hasFocused, setHasFocused] = useState(false)
  const [isOutsideLimits, setIsOutsideLimits] = useState(false)
  const [textLength, setTextLength] = useState(0)

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
      if (!autoFocus || hasFocused || disabled) return
      setHasFocused(true)
      inputRef.current.focus()
    },
    [autoFocus, disabled, hasFocused]
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
        <InputLabel required={required} shrink={focused || value.length !== 0}>
          {label}
        </InputLabel>
        <Input
          disabled={!hasFocused && disabled}
          inputRef={inputRef}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          required={required}
          value={value}
          {...omit(props, ['autoFocus', 'margin', 'setFocused', 'setIsOutsideLimits', 'setTextLength'])}
        />
      </FormControl>
      {focused && max && (
        <Counter isOutsideLimits={isOutsideLimits}>
          {isOutsideLimits ? 'Might be too long to display correctly on all devices' : max - textLength}
        </Counter>
      )}
    </Container>
  )
}

export default memo(Field)
