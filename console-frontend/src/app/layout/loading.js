import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'

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
