import Button from 'shared/button'
import ClipboardInput from 'shared/clipboard-input'
import Coint from 'shared/coin'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useState } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import { Checkbox } from 'shared/form-elements'
import { CURRENCY_SYMBOLS } from 'utils/shared'
import { Typography } from '@material-ui/core'

const CommissionRate = styled(Typography)`
  color: #0f7173;
  font-weight: 700;
  margin-right: 4px;
`

const StyledClipboardInput = styled(ClipboardInput)`
  height: 52px;
  margin-bottom: 10px;
`

const Title = styled(Typography)`
  margin-bottom: 12px;
`

const AvailableLocations = styled(Typography)`
  text-transform: uppercase;
  font-weight: 700;
  margin-left: 4px;
`

const TextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  & + * {
    margin-top: 10px;
  }
`

const CoinValue = styled(Typography)`
  color: #ffb652;
  font-weight: 700;
  margin: 0 6px;
`

const NotificationText = styled(Typography)`
  margin-top: 10px;
`

const TermsAcceptanceContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;

  label {
    color: #272932;
    font-size: 14px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const LabelLink = styled.a`
  color: #0f7173;
  text-decoration: underline;
`

const Conditions = styled.div`
  display: flex;
`

const ImpactRewardContainer = styled.div``

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

const Description = ({
  brand,
  isNotificationButtonClicked,
  isCreateLinkClicked,
  onNotifyMeClick,
  onCreateLinkClick,
  scrollToTermsAndConditions,
  onRemoveNotificationClick,
  onCustomLinkClick,
  affiliation,
  interest,
}) => {
  const [acceptedTermsAndConditions, setAcceptedTermsAndConditions] = useState(false)

  const onCopyAffiliateLink = useCallback(
    text => {
      mixpanel.track('Copied Affiliate Link', {
        hostname: window.location.hostname,
        text,
        brandId: brand.id,
        brand: brand.name,
      })
    },
    [brand.id, brand.name]
  )

  return (
    <>
      {!brand.isPreview && (
        <Section>
          <Title variant="h6">{'Compensation'}</Title>
          <TextContainer>
            <CommissionRate variant="body2">
              {Number(brand.commissionRate).toLocaleString(undefined, { style: 'percent' })}
              {' Commission'}
            </CommissionRate>
            <Typography variant="body2">{brand.commissionDescription}</Typography>
          </TextContainer>
        </Section>
      )}
      {brand.impactRewards && brand.impactRewards.length !== 0 && (
        <Section>
          <Title variant="h6">{'Impact Rewards'}</Title>
          <ImpactRewardContainer>
            {brand.impactRewards.map(impactReward => (
              <TextContainer key={impactReward.id}>
                <Coint />
                <CoinValue variant="body2">{impactReward.impactPointsInCents / 100}</CoinValue>
                <Typography variant="body2">{`after ${impactReward.targetRevenueInCents / 100 || 0}${
                  CURRENCY_SYMBOLS[impactReward.targetRevenueCurrency.toUpperCase()]
                } revenue`}</Typography>
              </TextContainer>
            ))}
          </ImpactRewardContainer>
        </Section>
      )}
      {brand.availableLocations && (
        <Section>
          <Title variant="h6">{'Shipping Zones'}</Title>
          <TextContainer>
            <Typography variant="body2">{'Available in: '}</Typography>
            <AvailableLocations variant="body2">{brand.availableLocations}</AvailableLocations>
          </TextContainer>
        </Section>
      )}
      <Section>
        {brand.isPreview ? (
          <>
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
                width="100%"
                wrapText
              >
                {interest ? 'Remove notification' : 'Notify me'}
              </Button>
            </ButtonContainer>
            <NotificationText align="center" variant="body2">
              {interest
                ? "Great, we'll send you an email when they're ready!"
                : "We'll send you an email once the brand is available for affiliations."}
            </NotificationText>
          </>
        ) : (
          <>
            {affiliation && (
              <>
                <Title variant="h6">{'Your Affiliate Links'}</Title>
                <StyledClipboardInput
                  backgroundColor="#e7ecef"
                  onCopy={onCopyAffiliateLink}
                  size="large"
                  text={affiliation.defaultAffiliateLink}
                />
              </>
            )}
            <ButtonContainer>
              <Button
                color="primaryGradient"
                disabled={!affiliation && (isCreateLinkClicked || !acceptedTermsAndConditions)}
                flex
                fullWidthOnMobile
                isFormSubmitting={!affiliation && isCreateLinkClicked}
                onClick={affiliation ? onCustomLinkClick : onCreateLinkClick}
                size="large"
                width="100%"
                wrapText
              >
                {affiliation ? 'Custom Link' : 'Promote Now'}
              </Button>
            </ButtonContainer>
            {!affiliation && (
              <Conditions>
                <TermsAcceptanceBox
                  acceptedTermsAndConditions={acceptedTermsAndConditions}
                  scrollToTermsAndConditions={scrollToTermsAndConditions}
                  setAcceptedTermsAndConditions={setAcceptedTermsAndConditions}
                />
              </Conditions>
            )}
          </>
        )}
      </Section>
    </>
  )
}

export default Description
