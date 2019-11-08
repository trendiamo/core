import React from 'react'
import { Typography } from '@material-ui/core'

const ValidAddressContent = ({ address }) => (
  <>
    <Typography variant="body2">
      {
        'Please confirm that this is the address at which you wish to receive the product. In case you want to receive the product at a different address you can change it in your account settings.'
      }
    </Typography>
    <br />
    <Typography variant="body2">{`${address.shippingFirstName} ${address.shippingLastName}`}</Typography>
    <Typography variant="body2">{address.addressLine1}</Typography>
    {address.addressLine2 && <Typography variant="body2">{address.addressLine2}</Typography>}
    <Typography variant="body2">{address.zipCode}</Typography>
    <Typography variant="body2">{address.city}</Typography>
    <Typography variant="body2">{address.country}</Typography>
  </>
)

const InvalidAddressContent = () => {
  return (
    <>
      <Typography variant="body2">
        {'Please provide a valid address at which you wish to receive the product.'}
      </Typography>
      <Typography variant="body2">{'You can input or change the address in your account settings.'}</Typography>
    </>
  )
}

const ConfirmAddress = ({ address, isValidAddress }) =>
  isValidAddress ? (
    <>
      <Typography variant="h5">{'Confirm your shipping address'}</Typography>
      <ValidAddressContent address={address} />
    </>
  ) : (
    <>
      <Typography variant="h4">{'We need a valid address'}</Typography>
      <InvalidAddressContent />
    </>
  )

export default ConfirmAddress
