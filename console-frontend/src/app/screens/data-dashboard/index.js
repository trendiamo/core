import ConversionRate from './conversion-rate'
import React from 'react'
import useAppBarContent from 'ext/hooks/use-app-bar-content'

const appBarContent = { title: 'Data Dashboard' }

const DataDashboard = () => {
  useAppBarContent(appBarContent)

  return <ConversionRate />
}

export default DataDashboard
