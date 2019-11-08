import auth from 'auth'
import BioAndPicModal from './bio-and-pic-modal'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useMemo, useState } from 'react'
import RequestUpgradeCard from './request-upgrade-card'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { apiMeRequestUpgrade, apiRequest } from 'utils'
import { Grid } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const FlexGrid = styled(props => <Grid container {...props} />)`
  height: 100%;
  justify-content: center;
  align-items: center;
`

const ContentCreation = () => {
  const [isBioAndPicModalOpen, setIsBioAndPicModalOpen] = useState(false)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [wasSubmitted, setWasSubmitted] = useState(!!auth.getUser().requestedUpgradeToSellerAt)

  const appBarContent = useMemo(() => ({ title: 'Become a product curator on brand websites!' }), [])
  useAppBarContent(appBarContent)

  const { enqueueSnackbar } = useSnackbar()

  const openBioAndPicModal = useCallback(() => {
    setIsBioAndPicModalOpen(true)
  }, [])

  const closeBioAndPicModal = useCallback(() => {
    setIsBioAndPicModalOpen(false)
  }, [])

  const sendUpgradeRequest = useCallback(
    async () => {
      setIsFormSubmitting(true)
      const { json, requestError } = await apiRequest(apiMeRequestUpgrade, [])
      if (requestError) {
        enqueueSnackbar(requestError, { variant: 'error' })
        setIsFormSubmitting(false)
        return
      }
      if (json && json.requestedUpgradeToSellerAt) {
        mixpanel.track('Requested Upgrade to Seller', { hostname: window.location.hostname })
        setWasSubmitted(true)
        auth.setUser(json)
        setIsFormSubmitting(false)
      }
    },
    [enqueueSnackbar]
  )

  return (
    <FlexGrid>
      <Grid item lg={8} md={9} xl={6} xs={12}>
        <RequestUpgradeCard
          isFormSubmitting={isFormSubmitting}
          openBioAndPicModal={openBioAndPicModal}
          wasSubmitted={wasSubmitted}
        />
      </Grid>
      <BioAndPicModal
        closeBioAndPicModal={closeBioAndPicModal}
        open={isBioAndPicModalOpen}
        sendUpgradeRequest={sendUpgradeRequest}
      />
    </FlexGrid>
  )
}

export default ContentCreation
