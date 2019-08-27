import AffiliateAppRouter from './affiliate'
import auth from 'auth'
import FrekklsAppRouter from './frekkls'
import React from 'react'

const AppRouter = props => {
  return auth.isAffiliate() ? <AffiliateAppRouter {...props} /> : <FrekklsAppRouter {...props} />
}

export default AppRouter
