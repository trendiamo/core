import omit from 'lodash.omit'
import React from 'react'
import theme from 'app/theme'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { Button as MuiButton, Tooltip } from '@material-ui/core'

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
    ...props
  }) => (
    <Tooltip
      open={tooltipEnabled && tooltipOpen && isFormPristine}
      placement={tooltipPlacement}
      title={tooltipText || ''}
    >
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
        ])}
        onMouseEnter={onButtonHoverStart}
        onMouseLeave={onButtonHoverEnd}
        style={disabled ? theme.customButtons['disabled'] : styleObject}
      />
    </Tooltip>
  )
)

export default Button
