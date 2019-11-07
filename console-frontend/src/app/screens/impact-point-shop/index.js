import AddressConfirmationModal from './address-confirmation-modal'
import mixpanel from 'ext/mixpanel'
import OrderSampleCard from './order-sample-card'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import SuccessCard from './success-card'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { apiMeRequestSample, apiRequest } from 'utils'
import { Grid } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const FlexGrid = styled(Grid)`
  justify-content: center;
`

const ImpactPointShop = () => {
  const { enqueueSnackbar } = useSnackbar()
  const appBarContent = useMemo(() => ({ title: 'Exchange Impact points for free samples!' }), [])
  useAppBarContent(appBarContent)

  const [showAddressConfirmationModal, setShowAddressConfirmationModal] = useState(false)
  const [showSuccessCard, setShowSuccessCard] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [productMessage, setProductMessage] = useState('')

  const orderSample = useCallback(
    async () => {
      setIsLoading(true)
      const { requestError } = await apiRequest(apiMeRequestSample, [{ productMessage }])
      if (requestError) {
        enqueueSnackbar(requestError, { variant: 'error' })
      } else {
        mixpanel.track('Requested Sample Product', { hostname: window.location.hostname })
        setShowSuccessCard(true)
      }
      setIsLoading(false)
    },
    [enqueueSnackbar, productMessage, setShowSuccessCard]
  )

  return (
    <>
      <FlexGrid container>
        <Grid item lg={8} md={8} xl={4} xs={12}>
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
