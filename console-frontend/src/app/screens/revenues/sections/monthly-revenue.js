import auth from 'auth'
import CheckCircle from 'shared/check-circle'
import Link from 'shared/link'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import { FormHelperText } from 'shared/form-elements'
import { isTrendiamoUser } from 'utils'
import * as dateFns from 'date-fns'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
`

const RevenueContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Revenue = styled.h1`
  color: #ffc842;
  font-size: 2.8rem;
  margin: 0;
`

const PreviousPaymentMessage = styled(Typography)`
  color: #0f7173;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`

const NextPaymentMessage = styled(Typography)`
  margin: 0;
`

const StyledFormHelperText = styled(FormHelperText)`
  text-align: center;
  margin-bottom: 0.8rem;
`

const StyledCheckCircle = styled(CheckCircle)`
  margin-right: 8px;
`

const MonthlyRevenue = ({ dates, orders }) => {
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
      <RevenueContainer>
        <Revenue>{revenue}</Revenue>
        {dateFns.isPast(paymentDate) ? (
          <PreviousPaymentMessage variant="h6">
            <StyledCheckCircle />
            {`Was paid out on ${dateFns.format(paymentDate, 'MMM do')}`}
          </PreviousPaymentMessage>
        ) : (
          <NextPaymentMessage variant="h6">{`Will be paid out on ${dateFns.format(
            paymentDate,
            'MMM do'
          )}`}</NextPaymentMessage>
        )}
      </RevenueContainer>
      <StyledFormHelperText>
        {'Revenues and prices displayed may slightly vary based on currency exchange rates'}
      </StyledFormHelperText>
      {isTrendiamoUser() && (
        <Link
          href={`https://dashboard.stripe.com/${auth.getUser().stripeUserId}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {'Check your Stripe account'}
        </Link>
      )}
    </Container>
  )
}

export default MonthlyRevenue
