import React from 'react'
import { FooterHelp, Layout, Link } from '@shopify/polaris'

const Footer = () => (
  <Layout>
    <Layout.Section>
      <FooterHelp>
        {'If you need help, '}
        <Link external url="mailto:support@uptous.co">
          {'contact us'}
        </Link>
      </FooterHelp>
    </Layout.Section>
  </Layout>
)

export default Footer
