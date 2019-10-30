import CallUs from './call-us'
import EnableUptous from './enable-uptous'
import React from 'react'
import { Layout } from '@shopify/polaris'

const Hero = ({ acceptsTerms, setIsAppEnabled, isAppEnabled, setRequestError, shopName }) => {
  return (
    <Layout>
      <Layout.Section twoThird>
        <CallUs shopName={shopName} />
      </Layout.Section>
      <Layout.Section oneThird>
        <EnableUptous
          acceptsTerms={acceptsTerms}
          isAppEnabled={isAppEnabled}
          setIsAppEnabled={setIsAppEnabled}
          setRequestError={setRequestError}
        />
      </Layout.Section>
    </Layout>
  )
}

export default Hero
