import React from 'react'
import { CircularProgress } from '@material-ui/core'

const Loading = ({ classes }) => (
  <div className={classes.loadingContainer}>
    <div className={classes.loadingInnerContainer}>
      <div className={classes.loadingMessage}>
        <CircularProgress className={classes.loadingIcon} color="primary" size="80" />
      </div>
    </div>
  </div>
)

export default Loading
