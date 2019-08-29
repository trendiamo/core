import auth from 'auth'
import Button from 'shared/button'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { apiMeRequestUpgrade, apiRequest } from 'utils'
import { Callout, CardContent, MainCard } from 'shared/uptous'
import { useSnackbar } from 'notistack'

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`

const SuccessTitle = styled.div`
  text-align: center;
  color: #12e5c4;
`

const RequestPending = styled.div`
  color: #ffc843;
`

const Success = () => {
  return (
    <div>
      <SuccessTitle>{'YAY!'}</SuccessTitle>
      <p>
        {
          'Your request has been submitted and we’ll be in touch as soon as possible! Once you are admitted as a content editor new features will be available here. Check your mail inbox for updates!'
        }
      </p>
      <RequestPending>{'Request pending'}</RequestPending>
    </div>
  )
}

const ContentCreation = () => {
  const appBarContent = useMemo(() => ({ title: 'Appear on brand websites' }), [])
  useAppBarContent(appBarContent)

  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [wasSubmitted, setWasSubmitted] = useState(!!auth.getUser().requestedUpgradeToSellerAt)
  const { enqueueSnackbar } = useSnackbar()

  const sendUpgradeRequest = useCallback(
    async () => {
      setIsFormSubmitting(true)
      const { json, requestError } = await apiRequest(apiMeRequestUpgrade, [])
      if (requestError) {
        enqueueSnackbar(requestError, { variant: 'error' })
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
          <img alt="" src="/img/icons/testimonial.svg" />
          <h2>{'Make an impact on the brands website!'}</h2>
          <p>
            {
              'Gain extra exposure and earn higher commissions by creating and showing guiding and promotional content directly on the brands website! You’ll gain access to additional features that make it easy to upload and submit content to all the brand stores that work with us. However, becoming active in the stores is not automatic and your request to become a content editor will be reviewed by our team within the next 24 hours.'
            }
          </p>
        </CardContent>
        <Callout>
          {wasSubmitted ? (
            <Success />
          ) : (
            <>
              {' '}
              <b>{'Become a content editor now'}</b>
              <Button
                color="primaryGradient"
                disabled={isFormSubmitting}
                isFormSubmitting={isFormSubmitting}
                onClick={sendUpgradeRequest}
              >
                {!isFormSubmitting && 'I want in!'}
              </Button>
            </>
          )}
        </Callout>
      </MainCard>
    </FlexContainer>
  )
}

export default ContentCreation
