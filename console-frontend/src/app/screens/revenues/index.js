import auth from 'auth'
import BlankState from './blank-state'
import CircularProgress from 'shared/circular-progress'
import DatePicker from 'shared/form-elements/date-picker'
import Grid from '@material-ui/core/Grid'
import omit from 'lodash.omit'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import SectionBase from 'shared/section'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { Activity, BrandsSplit, MonthlyRevenue, Orders } from './sections'
import { apiAffiliationsList, apiOrdersList, apiRequest } from 'utils'
import * as dateFns from 'date-fns'

const EXCHANGE_RATES_API_URL = 'https://api.exchangerate-api.com/v4/latest'

const CURRENCY_SYMBOLS = {
  EUR: '€',
  GBP: '£',
  CHF: 'CHF',
  USD: '$',
}

const computeMinDate = () => {
  const userCreationDate = new Date(auth.getUser().createdAt)
  const startDate = new Date('2019-07-01')
  return userCreationDate < startDate ? startDate : dateFns.startOfMonth(userCreationDate)
}

const computeMaxDate = () => {
  const atStartOfWeek = dateFns.startOfWeek(new Date(), { weekStartsOn: 1 })
  return dateFns.subDays(atStartOfWeek, 1)
}

const computeDate = (minDate, maxDate) => {
  const today = new Date()
  if (today < minDate) {
    return minDate
  } else if (today > maxDate) {
    return maxDate
  } else {
    return today
  }
}

const GridContainer = styled(props => <Grid container {...props} />)`
  height: calc(100vh - 86px);
`

const GridItem = styled(props => <Grid item {...props} />)`
  height: ${({ md }) => (md === 6 ? '60%' : '40%')};

  @media (min-width: 960px) and (min-height: 800px) {
    height: ${({ md }) => (md === 6 ? '66.6%' : '33.3%')};
  }
`

const Section = styled(({ children, ...props }) => (
  <SectionBase {...props}>
    <SectionInner>{children}</SectionInner>
  </SectionBase>
))`
  height: 100%;
`

const SectionInner = styled.div`
  flex-grow: 1;
  height: inherit;
`

const calculateSellerAmount = (amount, rate) => ((amount * rate) / 100).toFixed(2)

const Revenues = () => {
  const minDate = useMemo(() => computeMinDate(), [])
  const maxDate = useMemo(() => computeMaxDate(), [])
  const [date, setDate] = useState(computeDate(minDate, maxDate))
  const [isLoading, setIsLoading] = useState(true)
  const [affiliations, setAffiliations] = useState([])
  const [orders, setOrders] = useState([])
  const [hasErrors, setHasErrors] = useState(false)

  const dates = useMemo(
    () => ({
      from_date: dateFns.format(dateFns.startOfMonth(date), 'yyyy-MM-dd'),
      to_date: dateFns.format(dateFns.endOfMonth(date), 'yyyy-MM-dd'),
    }),
    [date]
  )

  const appBarContent = useMemo(
    () => ({
      Actions: affiliations.length > 0 && (
        <DatePicker maxDate={maxDate} minDate={minDate} setDate={setDate} value={date} />
      ),
      sticky: false,
      title: 'Your Revenues',
    }),
    [affiliations.length, date, maxDate, minDate]
  )
  useAppBarContent(appBarContent)

  const fetchAffiliations = useCallback(async () => {
    const { json, errors, requestError } = await apiRequest(apiAffiliationsList, [])
    if (requestError || errors) return setHasErrors(true)
    setAffiliations(json)
  }, [])

  const fetchExchangeRates = useCallback(async base => {
    const response = await fetch(`${EXCHANGE_RATES_API_URL}/${base}`)
    const { rates } = await response.json()
    if (!rates) return setHasErrors(true)
    const { EUR, GBP, CHF, USD } = rates
    return { EUR, GBP, CHF, USD, PTT: 6.9 * EUR }
  }, [])

  const convertOrdersAmount = useCallback(
    async orders => {
      const userCurrency = auth.getUser().currency.toUpperCase()
      const exchangeRates = await fetchExchangeRates(userCurrency)
      if (!exchangeRates) return

      return orders.map(order => {
        if (order.currency === userCurrency) return order
        return {
          sellerAmount: calculateSellerAmount(
            order.amountInCents / exchangeRates[order.currency],
            +order.commissionRate
          ),
          currency: CURRENCY_SYMBOLS[userCurrency],
          products: order.products.map(product => {
            if (userCurrency === product) return product
            return {
              currency: CURRENCY_SYMBOLS[userCurrency],
              sellerAmount: calculateSellerAmount(
                product.price / exchangeRates[product.currency],
                +order.commissionRate
              ),
              ...omit(product, ['currency', 'price']),
            }
          }),
          ...omit(order, 'amountInCents', 'currency', 'products'),
        }
      })
    },
    [fetchExchangeRates]
  )

  const fetchOrders = useCallback(
    async () => {
      const { json, errors, requestError } = await apiRequest(apiOrdersList, [dates])
      if (requestError || errors) return setHasErrors(true)
      const orders = await convertOrdersAmount(json)
      setOrders(orders)
    },
    [convertOrdersAmount, dates]
  )

  useEffect(
    () => {
      ;(async () => {
        setIsLoading(true)
        await Promise.all([fetchAffiliations(), fetchOrders()])
        setIsLoading(false)
      })()
    },
    [fetchAffiliations, fetchOrders]
  )

  if (isLoading) return <CircularProgress />

  if (minDate > maxDate || hasErrors || affiliations.length < 1 || orders.length < 1) {
    return <BlankState hasAffiliations={affiliations.length > 0} hasErrors={minDate > maxDate || hasErrors} />
  }

  return (
    <GridContainer spacing={16}>
      <GridItem md={8} xs={12}>
        <Section title="Activity">
          <Activity dates={dates} orders={orders} />
        </Section>
      </GridItem>
      <GridItem md={4} xs={12}>
        <Section title="Monthly Revenue">
          <MonthlyRevenue dates={dates} orders={orders} />
        </Section>
      </GridItem>
      <GridItem md={6} xs={12}>
        <Section title="Brand Split">
          <BrandsSplit orders={orders} />
        </Section>
      </GridItem>
      <GridItem md={6} xs={12}>
        <Section title="Orders">
          <Orders orders={orders} />
        </Section>
      </GridItem>
    </GridContainer>
  )
}

export default Revenues
