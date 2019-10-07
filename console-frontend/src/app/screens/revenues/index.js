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
import { apiAffiliationsList, apiConnectStripe, apiOrdersList, apiRequest } from 'utils'
import { Hidden } from '@material-ui/core'
import { parse } from 'query-string'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router'
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
  min-height: 260px;
`

const Section = styled(({ children, ...props }) => (
  <SectionBase {...props}>
    <SectionInner>{children}</SectionInner>
  </SectionBase>
))`
  min-height: 100%;
`

const SectionInner = styled.div`
  flex-grow: 1;
  height: inherit;
  flex: 1;
`

const calculateSellerAmount = (amount, rate) => ((amount * rate) / 100).toFixed(2)

const Revenues = ({ history }) => {
  const minDate = useMemo(() => computeMinDate(), [])
  const maxDate = useMemo(() => computeMaxDate(), [])
  const [date, setDate] = useState(computeDate(minDate, maxDate))
  const [isLoading, setIsLoading] = useState(auth.getUser().stripeUserId)
  const [affiliations, setAffiliations] = useState([])
  const [orders, setOrders] = useState([])
  const [hasErrors, setHasErrors] = useState(false)
  const [hasStripeAccount, setHasStripeAccount] = useState(!!auth.getUser().stripeUserId)

  const { enqueueSnackbar } = useSnackbar()

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
        return {
          sellerAmount: calculateSellerAmount(
            order.amountInCents / exchangeRates[order.currency],
            +order.commissionRate
          ),
          currency: CURRENCY_SYMBOLS[userCurrency],
          products: order.products.map(product => {
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

  useEffect(
    () => {
      ;(async () => {
        if (window.location.search.includes('code') && window.document.referrer === 'https://connect.stripe.com/') {
          const stripeActivationCode = parse(window.location.search).code
          history.push(window.location.pathname)
          setIsLoading(true)
          const { json, requestError } = await apiRequest(apiConnectStripe, [{ code: stripeActivationCode }])
          setIsLoading(false)
          if (requestError) {
            enqueueSnackbar(requestError, { variant: 'error' })
          } else {
            setHasStripeAccount(!!json.stripeUserId)
            auth.setUser(json)
          }
        }
      })()
    },
    [enqueueSnackbar, history]
  )

  if (isLoading) return <CircularProgress />

  if (minDate > maxDate || hasErrors || affiliations.length < 1 || orders.length < 1) {
    return <BlankState hasAffiliations={affiliations.length > 0} hasErrors={minDate > maxDate || hasErrors} />
  }

  return (
    <GridContainer spacing={16}>
      <Hidden xsDown>
        <GridItem md={8} xs={12}>
          <Section title="Activity">
            <Activity dates={dates} orders={orders} />
          </Section>
        </GridItem>
      </Hidden>
      <GridItem md={4} xs={12}>
        <Section title="Monthly Revenue">
          <MonthlyRevenue dates={dates} hasStripeAccount={hasStripeAccount} orders={orders} />
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

export default withRouter(Revenues)
