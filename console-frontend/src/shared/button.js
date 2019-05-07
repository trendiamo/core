import omit from 'lodash.omit'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import theme from 'app/theme'
import { CircularProgress } from '@material-ui/core'
import { Button as MuiButton, Tooltip } from '@material-ui/core'

const ButtonContainer = styled.div`
  display: flex;
  justify-content: ${({ centered }) => (centered ? 'center' : '')};
`

const ButtonContents = styled.div`
  display: flex;
  flex-direction: row;
`

const CircularProgressContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 20px;
  z-index: 1;
`

const StyledMuiButton = styled(MuiButton)`
  width: ${({ width }) => (width ? width : 'auto')};
`

const StyledCircularProgress = () => (
  <CircularProgressContainer>
    <CircularProgress size={20} />
  </CircularProgressContainer>
)

// Needed for when button is disabled as it won't fire the needed hover events for the tootip
const EventFirer = styled.div`
  max-width: fit-content;
`

const ConditionalWrap = ({ disabled, wrap, children }) => (disabled ? wrap(children) : children)

// Customized button (since Mui accepts a very small range of params in the original Button component)
const Button = ({
  color,
  disabled,
  tooltipEnabled,
  tooltipText,
  tooltipPlacement,
  isFormPristine,
  onClick,
  isFormSubmitting,
  width,
  centered,
  children,
  ...props
}) => {
  const [styleObject, setStyleObject] = useState({})
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const onButtonHoverStart = useCallback(
    () => {
      setTooltipOpen(true)
      setStyleObject(theme.customButtons[color] && theme.customButtons[color].hover)
    },
    [color]
  )

  const onButtonHoverEnd = useCallback(
    () => {
      setTooltipOpen(false)
      setStyleObject(omit(theme.customButtons[color], ['hover']))
    },
    [color]
  )

  useEffect(
    () => {
      setStyleObject(omit(theme.customButtons[color], ['hover']))
    },
    [color]
  )

  return (
    <ButtonContainer centered={centered}>
      <Tooltip
        open={tooltipEnabled && tooltipOpen && isFormPristine}
        placement={tooltipPlacement}
        title={tooltipText || ''}
      >
        <ConditionalWrap
          disabled={disabled}
          wrap={children => (
            <EventFirer onMouseEnter={onButtonHoverStart} onMouseLeave={onButtonHoverEnd}>
              {children}
            </EventFirer>
          )}
        >
          <StyledMuiButton
            {...omit(props, [
              'color',
              'tooltipEnabled',
              'isFormPristine',
              'tooltipText',
              'tooltipPlacement',
              'isFormSubmitting',
              'width',
              'centered',
            ])}
            disabled={disabled}
            onClick={onClick}
            onMouseEnter={onButtonHoverStart}
            onMouseLeave={onButtonHoverEnd}
            style={disabled ? theme.customButtons['disabled'] : styleObject}
            width={width}
          >
            <ButtonContents>
              {isFormSubmitting && <StyledCircularProgress />}
              {children}
            </ButtonContents>
          </StyledMuiButton>
        </ConditionalWrap>
      </Tooltip>
    </ButtonContainer>
  )
}

export default Button
