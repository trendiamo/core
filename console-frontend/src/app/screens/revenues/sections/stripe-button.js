import auth from 'auth'
import Button from 'shared/button'
import queryString from 'query-string'
import React from 'react'

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

  window.location = `https://connect.stripe.com/express/oauth/authorize?client_id=${
    process.env.REACT_APP_STRIPE_CLIENT_ID
  }&${queryString.stringify(stripeUser)}&redirect_uri=https://338cda40.ngrok.io/revenues`
}

const StripeButton = ({ isLoading }) => (
  <Button
    color="primaryGradient"
    disabled={isLoading}
    inline
    isFormSubmitting={isLoading}
    onClick={goToStripe}
    size="large"
  >
    {'Connect with stripe'}
  </Button>
)

export default StripeButton
