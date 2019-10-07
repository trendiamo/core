import omit from 'lodash.omit'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import theme from 'app/theme'
import { CircularProgress } from '@material-ui/core'
import { Button as MuiButton, Tooltip } from '@material-ui/core'
import { showUpToUsBranding } from 'utils'

const ButtonContainer = styled(props => (
  <div {...omit(props, ['inline', 'centered', 'width', 'fullWidthOnMobile', 'inlineOnDesktop'])} />
))`

  ${({ inlineOnDesktop }) =>
    inlineOnDesktop &&
    `
    @media (min-width: 960px) {
      display: inline-block;
        * + & {
          margin-left: 10px;
        }
    }
  `}

${({ inline }) =>
  inline
    ? `display: inline-block;
      * + & {
        margin-left: 10px;
      }`
    : `display: flex;
      margin-top: 12px;
      @media (min-width: 960px) {
        margin-top: 0px;
      }`}
  justify-content: ${({ centered }) => (centered ? 'center' : 'normal')};
${({ fullWidthOnMobile, width }) =>
  fullWidthOnMobile
    ? `
        width: 100%;
        @media (min-width: 960px) {
          width: ${width || 'auto'};
        }
      `
    : `width: ${({ width }) => width || 'auto'};`}

`

const ButtonContents = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; /* centers the loading indicator */
`

const CircularProgressContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 20px;
  z-index: 1;
`

const uptousButtonSizes = {
  mobile: {
    small: 'padding: 4px 12px; font-size: 14px;',
    medium: 'padding: 6px 20px; font-size: 16px;',
    large: 'padding: 8px 24px; font-size: 16px;',
  },
  desktop: {
    small: 'padding: 6px 15px; font-size: 14px;',
    medium: 'padding: 8px 24px; font-size: 16px;',
    large: 'padding: 10px 30px; font-size: 16px;',
  },
}

const StyledMuiButton = styled(props => <MuiButton {...omit(props, ['flex'])} />)`
  white-space: nowrap;
  ${({ flex }) => flex && 'width: 100%;'}
  ${({ size }) =>
    showUpToUsBranding() && uptousButtonSizes['mobile'][size || 'medium']}
  @media (min-width: 960px) {
    ${({ size }) => showUpToUsBranding() && uptousButtonSizes['desktop'][size || 'medium']}
  }
`

const StyledCircularProgress = () => (
  <CircularProgressContainer>
    <CircularProgress size={20} />
  </CircularProgressContainer>
)

// Needed for when button is disabled as it won't fire the needed hover events for the tootip
const EventFirer = styled.div`
  width: 100%;
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
  fullWidthOnMobile,
  inlineOnDesktop,
  flex,
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
    <ButtonContainer
      centered={centered}
      fullWidthOnMobile={fullWidthOnMobile}
      inline={inline}
      inlineOnDesktop={inlineOnDesktop}
      width={width}
    >
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
              'centered',
            ])}
            disabled={disabled}
            flex={flex}
            onClick={onClick}
            onMouseEnter={onButtonHoverStart}
            onMouseLeave={onButtonHoverEnd}
            style={disabled ? buttonStyles['disabled'] : styleObject}
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
