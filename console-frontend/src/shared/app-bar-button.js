import classnames from 'classnames'
import MuiButton from '@material-ui/core/Button'
import React from 'react'
import { compose } from 'recompose'
import { withClassesConsumer } from 'ext/recompose/with-classes'

const Button = ({ children, classes, disabled, ...props }) => (
  <MuiButton className={classnames(!disabled && classes.appBarButton)} disabled={disabled} {...props}>
    {children}
  </MuiButton>
)

export default compose(withClassesConsumer)(Button)
