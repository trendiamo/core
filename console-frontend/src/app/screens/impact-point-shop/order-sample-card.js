import Button from 'shared/button'
import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Callout, CalloutTitle, CardContent, MainCard } from 'shared/uptous'
import { ReactComponent as PackageIcon } from 'assets/icons/package.svg'
import { TextField, Typography } from '@material-ui/core'

const StyledPackageIcon = styled(PackageIcon)`
  align-self: center;
  margin-bottom: 20px;

  @media (min-width: 960px) {
    margin-bottom: 40px;
  }
`

const StyledCallout = styled(Callout)`
  text-align: center;
`

const StyledTextField = styled(TextField)`
  align-self: center;
  width: 100%;
  margin-bottom: 20px;
  background-color: #e7ecef;
`

const CalloutButton = styled(Button)`
  margin: 0 auto;
`

const OrderSampleCard = ({ setShowAddressConfirmationModal, isLoading, productMessage, setProductMessage }) => {
  const isButtonDisabled = useMemo(() => isLoading || productMessage === '', [isLoading, productMessage])

  const setProductMessageValue = useCallback(
    event => {
      setProductMessage(event.target.value)
    },
    [setProductMessage]
  )

  const openAddressConfirmationModal = useCallback(() => setShowAddressConfirmationModal(true), [
    setShowAddressConfirmationModal,
  ])

  return (
    <MainCard>
      <CardContent>
        <StyledPackageIcon />
        <Typography variant="h4">{'Receive free samples for Impact Points'}</Typography>
        <Typography style={{ marginBottom: '20px' }} variant="body2">
          {
            'You can order samples by spending your Impact Points. One Impact Point equals one Euro. Paste the link to the product you wish to receive below along with some additional information about sizes, colors etc. if needed.'
          }
        </Typography>
        <Typography variant="body2">
          {
            'If you have enough Impact Points in your balance we’ll send you the product and the points will be deducted from your balance.'
          }
        </Typography>
      </CardContent>
      <StyledCallout>
        <CalloutTitle>{'Paste product information here'}</CalloutTitle>
        <StyledTextField
          id="filled-textarea"
          multiline
          onChange={setProductMessageValue}
          placeholder={'https://example.com/products/example-product\nSize: M\nColor: Pink...'}
          rows="4"
          value={productMessage}
          variant="outlined"
        />
        <CalloutButton color="primaryGradient" disabled={isButtonDisabled} onClick={openAddressConfirmationModal}>
          {'Order sample'}
        </CalloutButton>
      </StyledCallout>
    </MainCard>
  )
}

export default OrderSampleCard
