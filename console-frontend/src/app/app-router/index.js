import FrekklsAppRouter from './frekkls'
import React from 'react'
import UptousAppRouter from './uptous'
import { isUpToUs } from 'utils'

const AppRouter = props => {
  return isUpToUs() ? <UptousAppRouter {...props} /> : <FrekklsAppRouter {...props} />
}

export default AppRouter
