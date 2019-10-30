import React from 'react'
import { Card, Heading, Layout } from '@shopify/polaris'

const ThankYou = () => {
  return (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <Heading element="h1">{'Thanks for installing our app and welcome to UPTOUS!'}</Heading>
          <br />
          <p>{'You are just one step away from having your brand promoted by hundreds of influencers.'}</p>
        </Card>
      </Layout.Section>
    </Layout>
  )
}

export default ThankYou
