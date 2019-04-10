import classNames from 'classnames'
import React from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'
import { Button as MuiButton } from '@material-ui/core'
import { withClassesConsumer } from 'ext/recompose/with-classes'

const StyledMuiButton = styled(MuiButton)`
  -moz-transition: none;
  -webkit-transition: none;
  -o-transition: color 0 ease-in;
  transition: none;
  background-image: ${({ disabled }) => (disabled ? 'none' : 'linear-gradient(132deg, #ff843e, #ff6c40 52%, #ff5642)')};
  background-color: ${({ disabled }) => (disabled ? 'rgba(51, 51, 51, 0.25) !important' : 'transparent')};
  color: white;
  &:hover {
    background-image: none;
    background-color: #ff6641;
  }
`

const Button = ({ children, classes, disabled, ...props }) => (
  <StyledMuiButton className={classNames(!disabled && classes.appBarButton)} disabled={disabled} {...props}>
    {children}
  </StyledMuiButton>
)

export default compose(withClassesConsumer)(Button)
