import auth from 'auth'
import AvgCartValue from './avg-cart-value'
import ConversionRate from './conversion-rate'
import DatePicker from 'shared/form-elements/date-picker'
import ErrorMessage from './error-message'
import MostInteractedModules from './most-interacted-modules'
import React, { useMemo, useState } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import * as dateFns from 'date-fns'

const appBarContent = { title: 'Data Dashboard' }

const FlexDiv = styled.div``
const ChartContainer = styled.div``

const TitleMargined = styled.h3`
  margin-top: 45px;
`

const computeMinDate = () => {
  const startOfMonth = dateFns.startOfMonth(Date.now())
  const dateMinLimit = dateFns.max([
    new Date('2019-08-01'),
    dateFns.startOfMonth(dateFns.addMonths(new Date(auth.getAccount().createdAt), 1)),
  ])
  if (dateFns.differenceInMonths(startOfMonth, dateMinLimit) >= 4) {
    return dateFns.subMonths(startOfMonth, 4)
  } else {
    return dateMinLimit
  }
}

const computeMaxDate = () => {
  const atStartOfWeek = dateFns.startOfWeek(new Date(), { weekStartsOn: 1 })
  const atEndOfPreviousWeek = dateFns.subDays(atStartOfWeek, 1)
  return atEndOfPreviousWeek
}

const computeCurrentDate = (minDate, maxDate) => {
  const today = new Date()
  if (today < minDate) {
    return minDate
  } else if (today > maxDate) {
    return maxDate
  } else {
    return today
  }
}

const DateDashboardContent = styled(({ className, date, dates, maxDate, minDate, setDate }) => {
  return (
    <Section
      actions={<DatePicker maxDate={maxDate} minDate={minDate} setDate={setDate} value={date} />}
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

const DataDashboard = () => {
  useAppBarContent(appBarContent)

  const minDate = computeMinDate()
  const maxDate = computeMaxDate()

  const [date, setDate] = useState(computeCurrentDate(minDate, maxDate))

  const dates = useMemo(
    () => ({
      from_date: dateFns.format(dateFns.startOfMonth(date), 'yyyy-MM-dd'),
      to_date: dateFns.format(dateFns.endOfMonth(date), 'yyyy-MM-dd'),
    }),
    [date]
  )

  if (minDate >= maxDate) {
    return <ErrorMessage>{'⚠️ There was a problem loading your data, please try again or contact us.'}</ErrorMessage>
  }

  return <DateDashboardContent date={date} dates={dates} maxDate={maxDate} minDate={minDate} setDate={setDate} />
}

export default DataDashboard
