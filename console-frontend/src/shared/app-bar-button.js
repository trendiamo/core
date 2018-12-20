import classnames from 'classnames'
import React from 'react'
import { compose } from 'recompose'
import { Button as MuiButton } from '@material-ui/core'
import { withClassesConsumer } from 'ext/recompose/with-classes'

const Button = ({ children, classes, disabled, ...props }) => (
  <MuiButton className={classnames(!disabled && classes.appBarButton)} disabled={disabled} {...props}>
    {children}
  </MuiButton>
)

export default compose(withClassesConsumer)(Button)
