import Button from 'shared/button'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Checkbox } from 'shared/form-elements'
import { Typography } from '@material-ui/core'

const Conditions = styled.div`
  display: flex;
`

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const Details = styled.div`
  width: 100%;
`

const TermsAcceptanceContainer = styled.div`
  display: flex;
  align-items: flex-start;
`

const LabelLink = styled.a`
  text-decoration: underline;
`

const CreateAffiliateLinkContainer = styled.div`
  display: flex;
  justify-content: center;
`

const ButtonContainer = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: center;
`

const TermsAcceptanceBox = ({
  setAcceptedTermsAndConditions,
  scrollToTermsAndConditions,
  acceptedTermsAndConditions,
}) => {
  const clickLabelLink = useCallback(
    event => {
      event.stopPropagation()
      scrollToTermsAndConditions()
    },
    [scrollToTermsAndConditions]
  )

  return (
    <TermsAcceptanceContainer>
      <Checkbox
        label={
          <>
            {'I have read and accepted the '}
            <LabelLink onClick={clickLabelLink}>{'Terms & Conditions'}</LabelLink>
            {' for promoting this brand.'}
          </>
        }
        setValue={setAcceptedTermsAndConditions}
        value={acceptedTermsAndConditions}
      />
    </TermsAcceptanceContainer>
  )
}

const Actions = ({
  brand,
  isNotificationButtonClicked,
  isCreateLinkClicked,
  onNotifyMeClick,
  onCreateLinkClick,
  scrollToTermsAndConditions,
  interest,
  onRemoveNotificationClick,
}) => {
  const [acceptedTermsAndConditions, setAcceptedTermsAndConditions] = useState(false)

  return (
    <ActionsContainer>
      <Details>
        {brand.isPreview ? (
          <>
            <Typography align="center" variant="h6">{`Want to become a promoter for ${brand.name}?`}</Typography>
            <Typography align="center" variant="body2">
              {interest
                ? "Great, we'll send you an email when they're ready!"
                : 'Get notified as soon as the brand is available for affiliations'}
            </Typography>
            <ButtonContainer>
              <Button
                centered
                color={interest ? 'white' : 'primaryGradient'}
                disabled={isNotificationButtonClicked}
                flex
                fullWidthOnMobile
                isFormSubmitting={isNotificationButtonClicked}
                onClick={interest ? onRemoveNotificationClick : onNotifyMeClick}
                size="large"
                variant="contained"
              >
                {interest ? 'Remove notification' : 'Notify me'}
              </Button>
            </ButtonContainer>
          </>
        ) : (
          <>
            <Conditions>
              <TermsAcceptanceBox
                acceptedTermsAndConditions={acceptedTermsAndConditions}
                scrollToTermsAndConditions={scrollToTermsAndConditions}
                setAcceptedTermsAndConditions={setAcceptedTermsAndConditions}
              />
            </Conditions>
            <CreateAffiliateLinkContainer>
              <Button
                color="primaryGradient"
                disabled={isCreateLinkClicked || !acceptedTermsAndConditions}
                flex
                fullWidthOnMobile
                isFormSubmitting={isCreateLinkClicked}
                onClick={onCreateLinkClick}
                size="large"
              >
                {'Create Affiliate Link'}
              </Button>
            </CreateAffiliateLinkContainer>
          </>
        )}
      </Details>
    </ActionsContainer>
  )
}

export default Actions
