import Account from './account'
import Affiliate from './affiliate'
import React from 'react'
import { showUpToUsBranding } from 'utils'

const Signup = () => {
  if (showUpToUsBranding()) {
    return <Affiliate />
  } else {
    return <Account />
  }
}

export default Signup
