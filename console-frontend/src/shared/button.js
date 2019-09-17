import omit from 'lodash.omit'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import theme from 'app/theme'
import { CircularProgress } from '@material-ui/core'
import { Button as MuiButton, Tooltip } from '@material-ui/core'
import { showUpToUsBranding } from 'utils'

const ButtonContainer = styled(props => <div {...omit(props, ['inline', 'centered'])} />)`
${({ inline }) =>
  inline
    ? `display: inline-block;
       * + & {margin-left: 10px;}`
    : 'display: flex;'}
  justify-content: ${({ centered }) => (centered ? 'center' : 'normal')};
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

const uptousButtonSizes = {
  small: 'padding: 8px 15px; font-size: 14px;',
  medium: 'padding: 7px 24px; font-size: 16px; svg { height: 28px; }',
  large: 'padding: 10px 30px; font-size: 16px; svg { height: 28px; }',
}

const StyledMuiButton = styled(MuiButton)`
  width: ${({ width }) => (width ? width : 'auto')};
  ${({ size }) => showUpToUsBranding() && uptousButtonSizes[size || 'medium']}
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
  inline,
  ...props
}) => {
  const [styleObject, setStyleObject] = useState({})
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const buttonStyles = useMemo(() => theme.buttons, [])

  const onButtonHoverStart = useCallback(
    () => {
      setTooltipOpen(true)
      setStyleObject(buttonStyles[color] && buttonStyles[color].hover)
    },
    [buttonStyles, color]
  )

  const onButtonHoverEnd = useCallback(
    () => {
      setTooltipOpen(false)
      setStyleObject(omit(buttonStyles[color], ['hover']))
    },
    [buttonStyles, color]
  )

  useEffect(
    () => {
      setStyleObject(omit(buttonStyles[color], ['hover']))
    },
    [buttonStyles, color]
  )

  const wrap = useCallback(
    children => (
      <EventFirer onMouseEnter={onButtonHoverStart} onMouseLeave={onButtonHoverEnd}>
        {children}
      </EventFirer>
    ),
    [onButtonHoverEnd, onButtonHoverStart]
  )

  return (
    <ButtonContainer centered={centered} inline={inline}>
      <Tooltip
        open={tooltipEnabled && tooltipOpen && isFormPristine}
        placement={tooltipPlacement}
        title={tooltipText || ''}
      >
        <ConditionalWrap disabled={disabled} wrap={wrap}>
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
            style={disabled ? buttonStyles['disabled'] : styleObject}
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
