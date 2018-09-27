import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import React from 'react'
// import { Admin, Resource } from 'react-admin'
// import { ExpositionsList } from './expositions'

const Hello = () => (
  <div>
    <h1>{'hello'}</h1>
    <Link to="/">{'Back Home'}</Link>
  </div>
)
export default compose()(Hello)
