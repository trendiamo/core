import Actions from './actions'
import ClipboardInput from 'shared/clipboard-input'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const Container = styled.div`
  background: #e7ecef;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  padding: 20px 24px 20px;
  @media (min-width: 960px) {
    padding: 20px 60px 20px;
  }
`

const CommissionRate = styled.span`
  color: #0f7173;
  font-weight: 700;
`

const CommissionDescription = styled.span`
  color: #0f7173;
`

const StyledClipboardInput = styled(ClipboardInput)`
  max-width: 450px;
  margin: 20px auto 19px;
`

const SuccessScreen = ({ brand, selectedAffiliation }) => {
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
    <Container>
      <Typography align="center" variant="overline">
        {'Your affiliate link'}
      </Typography>
      <StyledClipboardInput onCopy={onCopyAffiliateLink} size="large" text={selectedAffiliation.defaultAffiliateLink} />
    </Container>
  )
}

const Footer = ({
  brand,
  createAffiliation,
  createInterest,
  scrollToTermsAndConditions,
  removeAffiliation,
  selectedAffiliation,
  isLoading,
  interest,
  removeInterest,
}) => {
  const [isCreateLinkClicked, setIsCreateLinkClicked] = useState(false)
  const [isNotificationButtonClicked, setIsNotificationButtonClicked] = useState(false)

  const onCreateLinkClick = useCallback(
    async () => {
      setIsCreateLinkClicked(true)
      const { errors, requestError } = await createAffiliation(brand)
      if (!errors && !requestError) {
        mixpanel.track('Created Affiliate Link', {
          hostname: window.location.hostname,
          brandId: brand.id,
          brand: brand.name,
        })
      }
      setIsCreateLinkClicked(false)
    },
    [brand, createAffiliation]
  )

  const onNotifyMeClick = useCallback(
    async () => {
      setIsNotificationButtonClicked(true)
      const { errors, requestError } = await createInterest(brand)
      if (!errors && !requestError) {
        mixpanel.track('Clicked Notify Me', {
          hostname: window.location.hostname,
          brandId: brand.id,
          brand: brand.name,
        })
      }
      setIsNotificationButtonClicked(false)
    },
    [brand, createInterest]
  )

  const onRemoveNotificationClick = useCallback(
    async () => {
      setIsNotificationButtonClicked(true)
      mixpanel.track('Clicked Remove Notification', {
        hostname: window.location.hostname,
        brand: brand.name,
        brandId: brand.id,
      })
      removeInterest(interest).then(() => setIsNotificationButtonClicked(false))
    },
    [brand.id, brand.name, interest, removeInterest]
  )

  if (selectedAffiliation)
    return (
      <SuccessScreen
        brand={brand}
        isLoading={isLoading}
        removeAffiliation={removeAffiliation}
        selectedAffiliation={selectedAffiliation}
      />
    )

  return (
    <Container>
      {!brand.isPreview && (
        <div>
          <span>{'Affiliate terms: '}</span>
          <CommissionRate>
            {Number(brand.commissionRate).toLocaleString(undefined, { style: 'percent' })}
          </CommissionRate>
          <CommissionDescription> {brand.commissionDescription}</CommissionDescription>
        </div>
      )}
      <Actions
        brand={brand}
        interest={interest}
        isCreateLinkClicked={isCreateLinkClicked}
        isNotificationButtonClicked={isNotificationButtonClicked}
        onCreateLinkClick={onCreateLinkClick}
        onNotifyMeClick={onNotifyMeClick}
        onRemoveNotificationClick={onRemoveNotificationClick}
        scrollToTermsAndConditions={scrollToTermsAndConditions}
      />
    </Container>
  )
}

export default Footer
