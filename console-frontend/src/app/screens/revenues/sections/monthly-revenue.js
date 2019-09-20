import CheckCircle from '@material-ui/icons/CheckCircle'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
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

const CheckIcon = styled(CheckCircle)`
  margin-right: 4px;
`

const PreviousPaymentMessage = styled(props => <Typography variant="subtitle2" {...props} />)`
  color: #0f7173;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const NextPaymentMessage = styled(props => <Typography variant="subtitle2" {...props} />)`
  margin: 0;
`

const Message = styled(props => <Typography variant="body2" {...props} />)`
  font-size: 13px;
  margin: 0;
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
          <PreviousPaymentMessage>
            <CheckIcon />
            {`Was paid out on ${dateFns.format(paymentDate, 'MMM do')}`}
          </PreviousPaymentMessage>
        ) : (
          <NextPaymentMessage>{`Will be paid out on ${dateFns.format(paymentDate, 'MMM do')}`}</NextPaymentMessage>
        )}
      </RevenueContainer>
      <Message>{'Revenues and prices displayed may slightly vary based on currency exchange rates'}</Message>
    </Container>
  )
}

export default MonthlyRevenue
