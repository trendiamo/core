import auth from 'auth'
import Button from 'shared/button'
import Link from 'shared/link'
import queryString from 'query-string'
import React from 'react'

const user = auth.getUser()

const stripeUser = {
  'stripe_user[first_name]': user.firstName,
  'stripe_user[last_name]': user.lastName,
  'stripe_user[email]': user.email,
  'stripe_user[url]': user.socialMediaUrl,
  'stripe_user[business_name]': user.socialMediaUrl,
  'stripe_user[business_type]': 'individual',
}

const stripeLink = `https://connect.stripe.com/express/oauth/authorize?client_id=${
  process.env.REACT_APP_STRIPE_CLIENT_ID
}&${queryString.stringify(stripeUser)}`

const StripeButton = ({ isLoading }) => {
  return (
    <Link href={stripeLink}>
      <Button color="primaryGradient" disabled={isLoading} inline isFormSubmitting={isLoading} size="large">
        {'Connect with stripe'}
      </Button>
    </Link>
  )
}

export default StripeButton
