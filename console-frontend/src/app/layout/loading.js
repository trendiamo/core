import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { compose } from 'recompose'
import { withClassesConsumer } from 'ext/recompose/with-classes'

const Loading = ({ classes }) => (
  <div className={classes.loadingContainer}>
    <div className={classes.loadingInnerContainer}>
      <div className={classes.loadingMessage}>
        <CircularProgress className={classes.loadingIcon} color="primary" size="80" />
      </div>
    </div>
  </div>
)

export default compose(withClassesConsumer)(Loading)
