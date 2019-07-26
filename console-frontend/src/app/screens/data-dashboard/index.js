import AvgCartValue from './avg-cart-value'
import ConversionRate from './conversion-rate'
import MostInteractedModules from './most-interacted-modules'
import React, { useCallback, useState } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import WhiteButton from 'shared/white-button'
import { DatePicker } from 'material-ui-pickers'
import { differenceInMonths, endOfMonth, format, startOfMonth, subMonths } from 'date-fns'

const appBarContent = { title: 'Data Dashboard' }

const FlexDiv = styled.div``
const ChartContainer = styled.div``

const TitleMargined = styled.h3`
  margin-top: 45px;
`

const minDate = () =>
  differenceInMonths(Date.now(), new Date('2019-06-01')) >= 4 ? subMonths(Date.now(), 4) : new Date('2019-06-01')

const DatePickerValue = styled.div`
  color: #ff6641;
  padding-left: 5px;
`

const DatePickerComponent = ({ onClick, label, value }) => {
  return (
    <WhiteButton onClick={onClick} variant="contained">
      <div>{`${label}:`}</div>
      <DatePickerValue>{value}</DatePickerValue>
    </WhiteButton>
  )
}

const DateSelector = ({ dates, handleDateChange }) => (
  <DatePicker
    disableFuture
    format="MMMM"
    label="Month"
    maxDate={Date.now()}
    minDate={minDate()}
    onChange={handleDateChange}
    TextFieldComponent={DatePickerComponent}
    value={dates.from_date}
    views={['year', 'month']}
  />
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
      <ChartContainer>
        <TitleMargined>{'Module Interactions'}</TitleMargined>
        <MostInteractedModules dates={dates} />
      </ChartContainer>
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
      color: #333;
      text-align: center;
    }
  }
`

export default DataDashboard
