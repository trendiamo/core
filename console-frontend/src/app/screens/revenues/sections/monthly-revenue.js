import CheckCircle from 'shared/check-circle'
import React, { useMemo } from 'react'
import StripeButton from 'shared/stripe-button'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import * as dateFns from 'date-fns'

const Container = styled.div`
  height: 100%;
  padding: 0.5rem 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`

const Revenue = styled.h1`
  color: #0f7173;
  font-size: 2.8rem;
  margin: 0;
`

const PreviousPaymentMessage = styled(Typography)`
  color: #0f7173;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const NextPaymentMessage = styled(Typography)`
  margin: 0;
`

const StripeNote = styled(Typography)`
  font-size: 14px;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const StyledCheckCircle = styled(CheckCircle)`
  margin-right: 8px;
`

const MonthlyRevenue = ({ dates, orders, hasStripeAccount }) => {
  const revenue = useMemo(
    () => {
      const amount = orders.reduce((revenue, order) => (revenue += +order.sellerAmount), 0).toFixed(2)
      const currency = orders[0].currency
      return `${amount}${currency}`
    },
    [orders]
  )

  const paymentDate = useMemo(() => dateFns.startOfMonth(dateFns.addMonths(new Date(dates.to_date), 1)), [
    dates.to_date,
  ])

  return (
    <Container>
      <Revenue>{revenue}</Revenue>
      {hasStripeAccount ? (
        <>
          {dateFns.isPast(paymentDate) ? (
            <PreviousPaymentMessage variant="h6">
              <StyledCheckCircle height="16" width="16" />
              {`Was paid out on ${dateFns.format(paymentDate, 'MMM do')}`}
            </PreviousPaymentMessage>
          ) : (
            <NextPaymentMessage variant="h6">
              {`Will be paid out on ${dateFns.format(paymentDate, 'MMM do')}`}
            </NextPaymentMessage>
          )}
          <StripeNote variant="caption">
            {'Revenues and prices displayed may slightly vary based on currency exchange rates'}
          </StripeNote>
          <StripeButton color="white" hasStripeAccount />
        </>
      ) : (
        <>
          <StripeNote variant="caption">{'To receive your payouts connect your Stripe account!'}</StripeNote>
          <StripeButton color="primaryGradient" hasStripeAccount={hasStripeAccount} />
        </>
      )}
    </Container>
  )
}

export default MonthlyRevenue
