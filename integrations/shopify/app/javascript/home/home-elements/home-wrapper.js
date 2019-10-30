import React from 'react'
import { AppProvider, Page } from '@shopify/polaris'

const HomeWrapper = ({ children }) => {
  return (
    <AppProvider>
      <Page>{children}</Page>
    </AppProvider>
  )
}

export default HomeWrapper
