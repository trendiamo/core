import { Button } from 'shared/buttons'
import pick from 'lodash/pick'
import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { compose, withHandlers } from 'recompose'

const StripeButton = ({ handlePay, product }) => (
  <StripeCheckout
    allowRememberMe={false}
    amount={product.price * 100}
    currency="EUR"
    description={product.description}
    image={product.featuredImage}
    name={product.name}
    panelLabel="To pay:"
    shippingAddress
    stripeKey={process.env.REACT_APP_STRIPE_KEY}
    token={handlePay}
  >
    <Button fullWidth>{'Buy Now'}</Button>
  </StripeCheckout>
)

export default compose(
  withHandlers({
    handlePay: ({ product }) => (token, shipping) =>
      fetch(`${process.env.REACT_APP_BACKEND_URL}/rest/orders`, {
        body: JSON.stringify({ product: pick(product, ['id', 'name', 'price', 'vendor']), shipping, token }),
        headers: { 'content-type': 'application/json' },
        method: 'POST',
        mode: 'cors',
        referrer: 'no-referrer',
      }),
  })
)(StripeButton)
