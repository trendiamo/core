import humps from 'humps'
import { isSnapshot } from 'ext/react-snapshot'
import loadScript from 'ext/load-script'
import React from 'react'
import ReactDOM from 'react-dom'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'

const PaypalButton = compose(
  withProps(({ paypal }) => ({
    ButtonComponent: paypal.Button.driver('react', { React, ReactDOM }),
  }))
)(({ ButtonComponent, handleAuthorize, handlePayment }) => (
  <ButtonComponent
    client={{ [process.env.REACT_APP_PAYPAL_ENV]: process.env.REACT_APP_PAYPAL_KEY }}
    commit
    env={process.env.REACT_APP_PAYPAL_ENV}
    onAuthorize={handleAuthorize}
    payment={handlePayment}
    style={{ color: 'gold', label: 'buynow', shape: 'rect', size: 'responsive' }}
  />
))

export default compose(
  withState('paypal', 'setPaypal', null),
  lifecycle({
    componentWillMount() {
      if (window.paypal) {
        this.props.setPaypal(window.paypal)
      } else if (!isSnapshot) {
        loadScript('https://www.paypalobjects.com/api/checkout.js').then(paypal => this.props.setPaypal(paypal))
      }
    },
  }),
  branch(({ paypal }) => !paypal, renderNothing),
  withHandlers({
    handleAuthorize: ({ handleSuccess }) => (data, actions) =>
      actions.payment.execute().then(payment => handleSuccess(humps.camelizeKeys(payment))),
    handlePayment: ({ price }) => (data, actions) =>
      actions.payment.create({
        payment: {
          transactions: [{ amount: { currency: 'EUR', total: price } }],
        },
      }),
  })
)(PaypalButton)
