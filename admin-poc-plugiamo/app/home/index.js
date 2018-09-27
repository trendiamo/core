import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import React from 'react'
// import { Admin, Resource } from 'react-admin'

const Home = () => (
  <div>
    <h1>{'home'}</h1>
    <Link to="/hello">{'To Hello'}</Link>
  </div>
)

export default compose()(Home)
