import AvgCartValue from './avg-cart-value'
import ConversionRate from './conversion-rate'
import React, { useCallback, useState } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { DatePicker } from 'material-ui-pickers'
import { differenceInMonths, endOfMonth, format, startOfMonth, subMonths } from 'date-fns'
import { FormControl } from '@material-ui/core'

const appBarContent = { title: 'Data Dashboard' }

const FlexDiv = styled.div``
const ChartContainer = styled.div``

const minDate = () =>
  differenceInMonths(Date.now(), new Date('2019-06-01')) >= 4 ? subMonths(Date.now(), 4) : new Date('2019-06-01')

const DateSelector = ({ dates, handleDateChange }) => (
  <FormControl style={{ flex: '1', textAlign: 'right' }}>
    <div className="picker">
      <DatePicker
        disableFuture
        format="MMMM"
        label="Month"
        maxDate={Date.now()}
        minDate={minDate()}
        onChange={handleDateChange}
        value={dates.from_date}
        views={['year', 'month']}
      />
    </div>
  </FormControl>
)

const DataDashboard = styled(({ className }) => {
  useAppBarContent(appBarContent)

  const [dates, setDates] = useState({
    from_date: format(startOfMonth(Date.now()), 'yyyy-MM-dd'),
    to_date: format(endOfMonth(Date.now()), 'yyyy-MM-dd'),
  })

  const handleDateChange = useCallback(value => {
    setDates({ from_date: format(startOfMonth(value), 'yyyy-MM-dd'), to_date: format(endOfMonth(value), 'yyyy-MM-dd') })
  }, [])

  return (
    <Section
      actions={<DateSelector dates={dates} handleDateChange={handleDateChange} />}
      className={className}
      title="Data Dashboard"
    >
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
