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

const WebsiteButton = ({ affiliation, websiteHostname }) => {
  const url = affiliation ? `https://${websiteHostname}/?aftk=${affiliation.token}` : `https://${websiteHostname}`

  const onClick = useCallback(
    () => {
      mixpanel.track('Visited Brand Website', { hostname: window.location.hostname, url })
    },
    [url]
  )

  return (
    <a href={url} onClick={onClick} rel="noopener noreferrer" target="_blank">
      <IconButton size="large">
        <StyledNewTabIcon />
      </IconButton>
    </a>
  )
}

const Actions = ({ affiliation, brand, onClickCustomLink, openBrandModal }) => {
  const onCopyAffiliateLink = useCallback(text => {
    mixpanel.track('Copied Affiliate Link', { hostname: window.location.hostname, text })
  }, [])

  const onClickPromoteNow = useCallback(
    () => {
      mixpanel.track('Clicked Promote Now', { hostname: window.location.hostname, brand: brand.name })
      openBrandModal()
    },
    [brand.name, openBrandModal]
  )

  return (
    <Container>
      <ButtonContainer>
        <WebsiteButton affiliation={affiliation} websiteHostname={brand.websiteHostname} />
        {affiliation ? (
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
