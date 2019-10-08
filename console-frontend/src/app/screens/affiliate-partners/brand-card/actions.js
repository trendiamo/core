import Button from 'shared/button'
import ButtonContainer from 'shared/button-container'
import ClipboardInput from 'shared/clipboard-input'
import mixpanel from 'ext/mixpanel'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { IconButton } from 'shared/form-elements'
import { ReactComponent as NewTabIcon } from 'assets/icons/new-tab.svg'

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
  margin-top: 50px;
  @media (min-width: 960px) {
    width: auto;
    flex-direction: row;
    margin-top: 0;
  }
`

const StyledNewTabIcon = styled(NewTabIcon)`
  height: 30px;
  width: 30px;
`

const StyledClipboardInput = styled(ClipboardInput)`
  margin-left: 12px;
  @media (min-width: 960px) {
    margin-left: 10px;
    min-width: 320px;
  }
`

const WebsiteButton = ({ affiliation, brand }) => {
  const url = affiliation
    ? `https://${brand.websiteHostname}/?aftk=${affiliation.token}`
    : `https://${brand.websiteHostname}`

  const onClick = useCallback(
    () => {
      mixpanel.track('Visited Brand Website', {
        hostname: window.location.hostname,
        url,
        brandId: brand.id,
        brand: brand.name,
      })
    },
    [brand.id, brand.name, url]
  )

  return (
    <a href={url} onClick={onClick} rel="noopener noreferrer" target="_blank">
      <IconButton size="large">
        <StyledNewTabIcon />
      </IconButton>
    </a>
  )
}

const Actions = ({ affiliation, brand, onClickCustomLink, removeInterest, openBrandModal, interest }) => {
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

  const onClickPromoteNow = useCallback(
    () => {
      mixpanel.track('Clicked Promote Now', {
        hostname: window.location.hostname,
        brandId: brand.id,
        brand: brand.name,
      })
      openBrandModal()
    },
    [brand.id, brand.name, openBrandModal]
  )

  const onClickNotifyMe = useCallback(
    () => {
      mixpanel.track('Clicked Notify Me', {
        hostname: window.location.hostname,
        brandId: brand.id,
        brand: brand.name,
      })
      openBrandModal()
    },
    [brand.id, brand.name, openBrandModal]
  )

  const onClickRemoveNotification = useCallback(
    () => {
      mixpanel.track('Clicked Remove Notification', {
        hostname: window.location.hostname,
        brand: brand.name,
        brandId: brand.id,
      })
      removeInterest(interest)
    },
    [brand.id, brand.name, interest, removeInterest]
  )

  return (
    <Container>
      <ButtonContainer>
        <WebsiteButton affiliation={affiliation} brand={brand} />
        {brand.isPreview ? (
          <Button
            color={interest ? 'white' : 'primaryGradient'}
            flex
            fullWidthOnMobile
            inline
            onClick={interest ? onClickRemoveNotification : onClickNotifyMe}
            size="large"
          >
            {interest ? 'Remove notification' : 'Notify me'}
          </Button>
        ) : affiliation ? (
          <StyledClipboardInput
            backgroundColor="#e7ecef"
            onCopy={onCopyAffiliateLink}
            size="large"
            text={affiliation.defaultAffiliateLink}
          />
        ) : (
          <Button color="primaryGradient" flex fullWidthOnMobile inline onClick={onClickPromoteNow} size="large">
            {'Promote now'}
          </Button>
        )}
      </ButtonContainer>
      {affiliation && (
        <Button color="white" flex fullWidthOnMobile inlineOnDesktop onClick={onClickCustomLink} size="large">
          {'Custom link'}
        </Button>
      )}
    </Container>
  )
}

export default Actions
