import React from 'react'

import Layout from '../layout'

const NotFoundPage = ({ className }) => (
  <Layout className={className}>
    <h1>{'NOT FOUND'}</h1>
    <p>{"You just hit a page that doesn't exist..."}</p>
  </Layout>
)

export default NotFoundPage
