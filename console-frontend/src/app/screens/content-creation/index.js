import auth from 'auth'
import BioAndPicModal from './bio-and-pic-modal'
import Button from 'shared/button'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { apiMeRequestUpgrade, apiRequest } from 'utils'
import { Callout, CardContent, MainCard } from 'shared/uptous'
import { ReactComponent as ContentIcon } from 'assets/icons/content.svg'
import { Grid, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const FlexGrid = styled(Grid)`
  justify-content: center;
`

const StyledCard = styled(MainCard)`
  overflow: visible;
  position: relative;
`

const BetaBadge = styled(props => <div {...props}>{'BETA'}</div>)`
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 1202;
  padding: 5px 20px;
  background-color: #f05d5e;
  border-radius: 6px;
  color: white;
  font-weight: bold;
`

const StyledContentIcon = styled(ContentIcon)`
  align-self: center;
  width: 100px;
  margin-bottom: 20px;

  @media (min-width: 960px) {
    margin-bottom: 40px;
  }
`

const RequestPending = styled(Typography)`
  align-self: flex-start;
  color: #0f7173;
  margin-top: 14px;
`

const ContentCreation = () => {
  const appBarContent = useMemo(() => ({ title: 'Become a product curator on brand websites!' }), [])
  useAppBarContent(appBarContent)

  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [isBioAndPicModalOpen, setIsBioAndPicModalOpen] = useState(false)
  const [wasSubmitted, setWasSubmitted] = useState(!!auth.getUser().requestedUpgradeToSellerAt)
  const { enqueueSnackbar } = useSnackbar()

  const openBioAndPicModal = useCallback(() => {
    setIsBioAndPicModalOpen(true)
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
    <FlexGrid container>
      <Grid item lg={6} md={8} xl={4} xs={12}>
        <StyledCard>
          <BetaBadge />
          <CardContent>
            <StyledContentIcon />
            <Typography variant="h5">{'Push and monetize your content on brand websites'}</Typography>
            <Typography style={{ marginBottom: '20px' }} variant="body2">
              {
                'Apply to our Curation Programme to share your passion and content directly on brand websites and help them to convert their own traffic with your expertise!'
              }
            </Typography>
            <Typography variant="body2">
              {
                'While the programme is in beta mode, only selected impacters may participate. We’ll notify you per email about the status of your application. Thank you!'
              }
            </Typography>
          </CardContent>
          <Callout>
            {wasSubmitted ? (
              <>
                <Typography variant="body2">
                  {'Thank you for your application! We’ll be in touch as soon as we have news!'}
                </Typography>
                <RequestPending>{'Status: Application Pending'}</RequestPending>
              </>
            ) : (
              <Button
                color="primaryGradient"
                disabled={isFormSubmitting}
                isFormSubmitting={isFormSubmitting}
                onClick={openBioAndPicModal}
              >
                {!isFormSubmitting && 'I want in!'}
              </Button>
            )}
          </Callout>
        </StyledCard>
      </Grid>
      <BioAndPicModal
        open={isBioAndPicModalOpen}
        sendUpgradeRequest={sendUpgradeRequest}
        setOpen={setIsBioAndPicModalOpen}
      />
    </FlexGrid>
  )
}

export default ContentCreation
