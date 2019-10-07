import auth from 'auth'
import Button from 'shared/button'
import queryString from 'query-string'
import React from 'react'
import styled from 'styled-components'

const goToStripe = () => {
  const user = auth.getUser()

  const stripeUser = {
    'stripe_user[first_name]': user.firstName,
    'stripe_user[last_name]': user.lastName,
    'stripe_user[email]': user.email,
    'stripe_user[url]': user.socialMediaUrl,
    'stripe_user[business_name]': user.socialMediaUrl,
    'stripe_user[business_type]': 'individual',
  }

  window.location = process.env.REACT_APP_STRIPE_REDIRECT_URI
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
  @media (min-width: 960px) {
    width: auto;
  }
`

const StripeButton = () => (
  <Container>
    <Button centered color="primaryGradient" flex fullWidthOnMobile onClick={goToStripe} size="large">
      {'Connect with stripe'}
    </Button>
  </Container>
)

export default StripeButton
