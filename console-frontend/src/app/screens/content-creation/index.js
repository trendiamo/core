import auth from 'auth'
import BioAndPicModal from './bio-and-pic-modal'
import Button from 'shared/button'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { apiMeRequestUpgrade, apiRequest } from 'utils'
import { Callout, CalloutTitle, CardContent, MainCard } from 'shared/uptous'
import { ReactComponent as PlayButtonIcon } from 'assets/icons/play-button.svg'
import { Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`

const RequestPending = styled(Typography)`
  color: #0f7173;
  margin-top: 14px;
  width: 100%;
`

const StyledPlayButtonIcon = styled(PlayButtonIcon)`
  align-self: center;
  width: 62px;
  margin-bottom: 40px;
`

const ContentCreation = () => {
  const appBarContent = useMemo(() => ({ title: 'Become a content editor for brand websites' }), [])
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
        setWasSubmitted(true)
        auth.setUser(json)
        setIsFormSubmitting(false)
      }
    },
    [enqueueSnackbar]
  )

  return (
    <FlexContainer>
      <MainCard>
        <CardContent>
          <StyledPlayButtonIcon />
          <Typography variant="h5">{'Monetize with your content on brand websites!'}</Typography>
          <Typography variant="body2">
            {
              'Gain extra exposure and earn higher commissions by creating and showing guiding and promotional content directly on the brands website! You’ll gain access to additional features that make it easy to upload and submit content to all the brand stores that work with us. However, becoming active in the stores is not automatic and your request to become a content editor will be reviewed by our team within the next 24 hours.'
            }
          </Typography>
        </CardContent>
        <Callout>
          <CalloutTitle align="center" variant="h5">
            {wasSubmitted ? 'YAY!' : 'Become a content editor now'}
          </CalloutTitle>
          {wasSubmitted ? (
            <>
              <Typography variant="body2">
                {
                  'Your request has been submitted and we’ll be in touch as soon as possible! Once you are admitted as a content editor new features will be available here. Check your mail inbox for updates!'
                }
              </Typography>
              <RequestPending variant="button">{'Request pending'}</RequestPending>
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
      </MainCard>
      <BioAndPicModal
        open={isBioAndPicModalOpen}
        sendUpgradeRequest={sendUpgradeRequest}
        setOpen={setIsBioAndPicModalOpen}
      />
    </FlexContainer>
  )
}

export default ContentCreation
