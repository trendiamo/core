import React from 'react'
import styled from 'styled-components'

import Layout from '../layout'
import Section from '../components/section'

const NotFoundPage = styled(({ className }) => (
  <Layout className={className}>
    <Section>
      <h1>{'NOT FOUND'}</h1>
      <p>{"You just hit a page that doesn't exist..."}</p>
    </Section>
  </Layout>
))`
  ${Section} {
    justify-content: center;
  }
`

export default NotFoundPage
