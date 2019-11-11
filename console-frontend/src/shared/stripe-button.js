import auth from 'auth'
import Button from 'shared/button'
import queryString from 'query-string'
import React, { useCallback } from 'react'
import styled from 'styled-components'

const generateStripeConnectionUrl = () => {
  const user = auth.getUser()

  const stripeUser = {
    'stripe_user[first_name]': user.firstName,
    'stripe_user[last_name]': user.lastName,
    'stripe_user[email]': user.email,
    'stripe_user[url]': user.socialMediaUrl,
    'stripe_user[business_name]': user.socialMediaUrl,
    'stripe_user[business_type]': 'individual',
  }

  return process.env.REACT_APP_STRIPE_REDIRECT_URI
    ? `https://connect.stripe.com/express/oauth/authorize?client_id=${
        process.env.REACT_APP_STRIPE_CLIENT_ID
      }&${queryString.stringify(stripeUser)}&redirect_uri=${process.env.REACT_APP_STRIPE_REDIRECT_URI}`
    : `https://connect.stripe.com/express/oauth/authorize?client_id=${
        process.env.REACT_APP_STRIPE_CLIENT_ID
      }&${queryString.stringify(stripeUser)}`
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  @media (min-width: 480px) {
    width: auto;
  }
`

const StripeButton = ({ hasStripeAccount, ...props }) => {
  const connectWithStripe = useCallback(() => {
    const stripeConnectionUrl = generateStripeConnectionUrl()
    window.location = stripeConnectionUrl
  }, [])

  const goToStripeDashboard = useCallback(
    () => (window.location = `https://dashboard.stripe.com/${auth.getUser().stripeUserId}`),
    []
  )

  return (
    <Container>
      <Button
        centered
        flex
        fullWidthOnMobile
        onClick={hasStripeAccount ? goToStripeDashboard : connectWithStripe}
        {...props}
      >
        {hasStripeAccount ? 'Go to stripe' : 'Connect with stripe'}
      </Button>
    </Container>
  )
}

export default StripeButton
