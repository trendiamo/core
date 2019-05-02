import React, { useContext } from 'react'
import { CircularProgress } from '@material-ui/core'
import { StoreContext } from 'ext/hooks/store'

const Loading = ({ transparent }) => {
  const { store } = useContext(StoreContext)
  const classes = store.classes
  return (
    <div className={classes.loadingContainer} style={transparent && { backgroundColor: 'transparent' }}>
      <div className={classes.loadingInnerContainer}>
        <div className={classes.loadingMessage}>
          <CircularProgress className={classes.loadingIcon} color="primary" size="80" />
        </div>
      </div>
    </div>
  )
}

export default Loading
