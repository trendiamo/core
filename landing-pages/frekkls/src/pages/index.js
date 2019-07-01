import React from 'react'

import Future from '../sections/future'
import Hero from '../sections/hero'
import How from '../sections/how'
import Layout from '../layout'
import Pricing from '../sections/pricing'
import SocialProof from '../sections/social-proof'
import Visuals from '../sections/visuals'
import What from '../sections/what'

const IndexPage = ({ className }) => (
  <Layout className={className}>
    <Hero />
    <What />
    <How />
    <Visuals />
    <Future />
    <Pricing />
    <SocialProof />
  </Layout>
)

export default IndexPage
