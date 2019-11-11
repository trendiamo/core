import Button from 'shared/button'
import CircularProgress from 'shared/circular-progress'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { apiMeDetails, apiRequest } from 'utils'
import { StoreContext } from 'ext/hooks/store'
import { Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ContentContainer = styled.div`
  overflow-x: hidden;
  padding: 40px 24px 22px;
  position: relative;

  @media (min-width: 960px) {
    padding: 40px 40px 22px;
  }
`

const ContentScrollContainer = styled.div`
  max-height: auto;
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const Footer = styled.div`
  background: #e7ecef;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (min-height: 960px) {
    padding: 30px 80px;
  }
`

const StyledButton = styled(Button)`
  margin: 0 10px;
`

const StyledCircularProgress = styled(props => (
  <div {...props}>
    <CircularProgress />
  </div>
))`
  padding: 40px 0;
`

const isValidAddress = shippingAddress => {
  return (
    !!shippingAddress.addressLine1 &&
    !!shippingAddress.city &&
    !!shippingAddress.country &&
    !!shippingAddress.shippingFirstName &&
    !!shippingAddress.shippingLastName &&
    !!shippingAddress.zipCode
  )
}

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

const ValidAddressContent = ({ shippingAddress }) => (
  <>
    <Typography variant="body2">
      {
        'Please confirm that this is the address at which you wish to receive the product. In case you want to receive the product at a different address you can change it in your account settings.'
      }
    </Typography>
    <br />
    <Typography variant="body2">
      {shippingAddress.shippingFirstName + ' ' + shippingAddress.shippingLastName}
    </Typography>
    <Typography variant="body2">{shippingAddress.addressLine1}</Typography>
    {shippingAddress.addressLine2 && <Typography variant="body2">{shippingAddress.addressLine2}</Typography>}
    <Typography variant="body2">{shippingAddress.zipCode}</Typography>
    <Typography variant="body2">{shippingAddress.city}</Typography>
    <Typography variant="body2">{shippingAddress.country}</Typography>
  </>
)

const Terms = styled(props => (
  <div {...props}>
    <div>
      <Typography variant="body2">
        {
          'By clicking on „Confirm Order” you accept that your full name and your address will be shared with the brand to be able to send you the package.'
        }
      </Typography>
    </div>
  </div>
))`
  margin-top: 24px;

  > div {
    padding-top: 12px;
    border-top: 3px solid #e7ecef;
  }
  p {
    font-size: 14px;
    text-align: left;
  }
`

const Content = ({ orderSample, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState(true)
  const [shippingAddress, setShippingAddress] = useState({})

  const { store } = useContext(StoreContext)
  const { setIsUserModalOpen } = store

  const onGoToSettingsClick = useCallback(() => {
    handleClose()
    setIsUserModalOpen(true)
  }, [handleClose, setIsUserModalOpen])

  const onConfirmOrderClick = useCallback(() => {
    handleClose()
    orderSample()
  }, [handleClose, orderSample])

  useEffect(() => {
    ;(async () => {
      const { json, requestError } = await apiRequest(apiMeDetails, [])
      if (requestError) {
        enqueueSnackbar(requestError, { variant: 'error' })
      }
      const { addressLine1, addressLine2, city, country, shippingFirstName, shippingLastName, zipCode } = json
      setShippingAddress({ addressLine1, addressLine2, city, country, shippingFirstName, shippingLastName, zipCode })
      setIsLoading(false)
    })()
  }, [enqueueSnackbar])

  if (isLoading) return <StyledCircularProgress />

  return (
    <MainContainer>
      <ContentScrollContainer>
        <ContentContainer>
          <Typography variant="h4">{'Confirm your address'}</Typography>
          {isValidAddress(shippingAddress) ? (
            <>
              <ValidAddressContent shippingAddress={shippingAddress} />
              <Terms />
            </>
          ) : (
            <InvalidAddressContent />
          )}
        </ContentContainer>
      </ContentScrollContainer>
      <Footer>
        <StyledButton color="white" onClick={onGoToSettingsClick} variant="contained">
          {'Go To Settings'}
        </StyledButton>
        {isValidAddress(shippingAddress) && (
          <StyledButton color="primaryGradient" onClick={onConfirmOrderClick} variant="contained">
            {'Confirm Order'}
          </StyledButton>
        )}
      </Footer>
    </MainContainer>
  )
}

export default Content
