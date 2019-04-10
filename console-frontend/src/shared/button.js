import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import theme from 'app/theme'
import { CircularProgress } from '@material-ui/core'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { Button as MuiButton, Tooltip } from '@material-ui/core'

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

const StyledCircularProgress = () => (
  <CircularProgressContainer>
    <CircularProgress size={20} />
  </CircularProgressContainer>
)

// Needed for when button is disabled as it won't fire the needed hover events for the tootip
const EventFirer = styled.div`
  max-width: fit-content;
`

// Customized button (since Mui accepts a very small range of params in the original Button component)
const Button = compose(
  withState('styleObject', 'setStyleObject', {}),
  withState('tooltipOpen', 'setTooltipOpen', false),
  withHandlers({
    onButtonHoverStart: ({ setStyleObject, color, setTooltipOpen }) => () => {
      setTooltipOpen(true)
      setStyleObject(theme.customButtons[color] && theme.customButtons[color].hover)
    },
    onButtonHoverEnd: ({ setStyleObject, color, setTooltipOpen }) => () => {
      setTooltipOpen(false)
      setStyleObject(omit(theme.customButtons[color], ['hover']))
    },
  }),
  lifecycle({
    componentDidMount() {
      const { color, setStyleObject } = this.props
      setStyleObject(omit(theme.customButtons[color], ['hover']))
    },
  })
)(
  ({
    styleObject,
    onButtonHoverStart,
    onButtonHoverEnd,
    disabled,
    tooltipEnabled,
    tooltipOpen,
    tooltipText,
    tooltipPlacement,
    isFormPristine,
    onClick,
    isFormSubmitting,
    children,
    ...props
  }) => (
    <Tooltip
      open={tooltipEnabled && tooltipOpen && isFormPristine}
      placement={tooltipPlacement}
      title={tooltipText || ''}
    >
      <EventFirer onMouseEnter={onButtonHoverStart} onMouseLeave={onButtonHoverEnd}>
        <MuiButton
          {...omit(props, [
            'color',
            'setStyleObject',
            'tooltipEnabled',
            'tooltipOpen',
            'setTooltipOpen',
            'isFormPristine',
            'tooltipText',
            'tooltipPlacement',
            'isFormSubmitting',
          ])}
          disabled={disabled}
          onClick={onClick}
          style={disabled ? theme.customButtons['disabled'] : styleObject}
        >
          <ButtonContents>
            {isFormSubmitting && <StyledCircularProgress />}
            {children}
          </ButtonContents>
        </MuiButton>
      </EventFirer>
    </Tooltip>
  )
)

export default Button
