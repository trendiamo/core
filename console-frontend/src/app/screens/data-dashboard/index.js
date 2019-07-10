import AvgCartValue from './avg-cart-value'
import ConversionRate from './conversion-rate'
import React from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'

const appBarContent = { title: 'Data Dashboard' }

const dates = {
  from_date: '2019-06-01',
  to_date: '2019-07-01',
}

const FlexDiv = styled.div``
const ChartContainer = styled.div``

const DataDashboard = styled(({ className }) => {
  useAppBarContent(appBarContent)

  return (
    <Section className={className} title="Data Dashboard">
      <FlexDiv>
        <ChartContainer>
          <h3>{'Conversion Rate'}</h3>
          <ConversionRate dates={dates} />
        </ChartContainer>
        <ChartContainer>
          <h3>{'Avg Cart Value'}</h3>
          <AvgCartValue dates={dates} />
        </ChartContainer>
      </FlexDiv>
    </Section>
  )
})`
  ${FlexDiv} {
    display: flex;
    margin-left: -1rem;
    margin-right: -1rem;
  }

  ${ChartContainer} {
    flex: 1;
    padding-left: 1rem;
    padding-right: 1rem;

    > h3 {
      text-align: center;
    }
  }
`

export default DataDashboard
