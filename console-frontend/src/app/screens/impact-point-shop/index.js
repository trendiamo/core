import AddressConfirmationModal from './address-confirmation-modal'
import mixpanel from 'ext/mixpanel'
import OrderSampleCard from './order-sample-card'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import SuccessCard from './success-card'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { apiMeRequestSample, apiRequest } from 'utils'
import { Grid } from '@material-ui/core'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { useSnackbar } from 'notistack'

const FlexGrid = styled(props => <Grid container {...props} />)`
  height: 100%;
  justify-content: center;
  align-items: center;
`

const ImpactPointShop = () => {
  const { enqueueSnackbar } = useSnackbar()
  const appBarContent = useMemo(() => ({ title: 'Exchange Impact points for free samples!' }), [])

  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: 'impactPointShop', stageName: 'uptous', pathname: window.location.pathname }),
    []
  )
  useOnboardingHelp(onboardingHelp)

  useAppBarContent(appBarContent)

  const [showAddressConfirmationModal, setShowAddressConfirmationModal] = useState(false)
  const [showSuccessCard, setShowSuccessCard] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [productMessage, setProductMessage] = useState('')

  const orderSample = useCallback(async () => {
    setIsLoading(true)
    const { requestError } = await apiRequest(apiMeRequestSample, [{ productMessage }])
    if (requestError) {
      enqueueSnackbar(requestError, { variant: 'error' })
    } else {
      mixpanel.track('Requested Sample Product', { hostname: window.location.hostname })
      setShowSuccessCard(true)
    }
    setIsLoading(false)
  }, [enqueueSnackbar, productMessage, setShowSuccessCard])

  return (
    <>
      <FlexGrid>
        <Grid item lg={8} md={9} xl={6} xs={12}>
          {showSuccessCard ? (
            <SuccessCard setProductMessage={setProductMessage} setShowSuccessCard={setShowSuccessCard} />
          ) : (
            <OrderSampleCard
              isLoading={isLoading}
              productMessage={productMessage}
              setProductMessage={setProductMessage}
              setShowAddressConfirmationModal={setShowAddressConfirmationModal}
            />
          )}
        </Grid>
      </FlexGrid>
      <AddressConfirmationModal
        open={showAddressConfirmationModal}
        orderSample={orderSample}
        setOpen={setShowAddressConfirmationModal}
      />
    </>
  )
}

export default ImpactPointShop
