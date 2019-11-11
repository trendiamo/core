import CircularProgress from 'shared/circular-progress'
import ConfirmAddress from './confirm-address'
import ConfirmRequest from './confirm-request'
import Footer from './footer'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import SuccessMessage from './success-message'
import Terms from './terms'
import { apiMeDetails, apiMeRequestSample, apiRequest } from 'utils'
import { StoreContext } from 'ext/hooks/store'
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

const StyledCircularProgress = styled(props => (
  <div {...props}>
    <CircularProgress />
  </div>
))`
  padding: 40px 0;
`

const Content = ({ brand, handleClose }) => {
  const [address, setAddress] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [productMessage, setProductMessage] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    ;(async () => {
      const { json, requestError } = await apiRequest(apiMeDetails, [])
      if (requestError) {
        enqueueSnackbar(requestError, { variant: 'error' })
      }
      const { addressLine1, addressLine2, city, country, shippingFirstName, shippingLastName, zipCode } = json
      setAddress({ addressLine1, addressLine2, city, country, shippingFirstName, shippingLastName, zipCode })
      setIsLoading(false)
    })()
  }, [enqueueSnackbar])

  const isValidAddress = useMemo(
    () =>
      !!address.addressLine1 &&
      !!address.city &&
      !!address.country &&
      !!address.shippingFirstName &&
      !!address.shippingLastName &&
      !!address.zipCode,
    [address]
  )

  const setProductMessageValue = useCallback(event => setProductMessage(event.target.value), [setProductMessage])

  const { store } = useContext(StoreContext)
  const { setIsUserModalOpen } = store

  const onGoToSettingsClick = useCallback(() => {
    handleClose()
    setIsUserModalOpen(true)
  }, [handleClose, setIsUserModalOpen])

  const orderSample = useCallback(async () => {
    setIsLoading(true)
    const { requestError } = await apiRequest(apiMeRequestSample, [
      { productMessage, brand: { name: brand.name, email: brand.email } },
    ])
    if (requestError) {
      enqueueSnackbar(requestError, { variant: 'error' })
    } else {
      mixpanel.track('Requested Sample Product', { hostname: window.location.hostname })
      setShowSuccessMessage(true)
    }
    setIsLoading(false)
  }, [brand.email, brand.name, enqueueSnackbar, productMessage])

  if (isLoading) return <StyledCircularProgress />

  if (showSuccessMessage) return <SuccessMessage closeModal={handleClose} />

  return (
    <MainContainer>
      <ContentScrollContainer>
        <ContentContainer>
          {isValidAddress && <ConfirmRequest message={productMessage} setMessageValue={setProductMessageValue} />}
          <ConfirmAddress address={address} isValidAddress={isValidAddress} />
          {isValidAddress && <Terms />}
        </ContentContainer>
      </ContentScrollContainer>
      <Footer
        isValidAddress={isValidAddress}
        isValidMessage={productMessage.length > 0}
        onConfirmOrderClick={orderSample}
        onGoToSettingsClick={onGoToSettingsClick}
      />
    </MainContainer>
  )
}

export default Content
