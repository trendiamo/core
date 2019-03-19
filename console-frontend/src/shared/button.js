import omit from 'lodash.omit'
import React from 'react'
import theme from 'app/theme'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { Button as MuiButton } from '@material-ui/core'

// Customized button (since Mui accepts a very small range of params in the original Button component)
const Button = compose(
  withState('styleObject', 'setStyleObject', {}),
  withHandlers({
    onButtonHoverStart: ({ setStyleObject, color }) => () => {
      setStyleObject(theme.customButtons[color] && theme.customButtons[color].hover)
    },
    onButtonHoverEnd: ({ setStyleObject, color }) => () => {
      setStyleObject(omit(theme.customButtons[color], ['hover']))
    },
  }),
  lifecycle({
    componentDidMount() {
      const { color, setStyleObject } = this.props
      setStyleObject(omit(theme.customButtons[color], ['hover']))
    },
  })
)(({ styleObject, onButtonHoverStart, onButtonHoverEnd, disabled, ...props }) => (
  <MuiButton
    {...omit(props, ['color', 'setStyleObject'])}
    onMouseEnter={onButtonHoverStart}
    onMouseLeave={onButtonHoverEnd}
    style={disabled ? theme.customButtons['disabled'] : styleObject}
  />
))

export default Button
