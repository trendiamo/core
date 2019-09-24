import Button from 'shared/button'
import ClipboardInput from 'shared/clipboard-input'
import mixpanel from 'ext/mixpanel'
import omit from 'lodash.omit'
import React, { useCallback, useMemo } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import { Chip, Typography } from '@material-ui/core'
import { IconButton } from 'shared/form-elements'
import { ReactComponent as NewTabIcon } from 'assets/icons/new-tab.svg'

const StyledSection = styled(props => <Section {...omit(props, ['animate'])} />)`
  margin-top: 10px;
  transition: all 1s 0.2s;
  min-width: 900px;
  ${({ animate }) =>
    !animate &&
    `
    opacity: 0;
    transform: translateY(10px);
  `}
  &:first-child {
    margin-top: 0;
  }
`

const MainContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  min-height: 140px;
`

const ImageAndDescriptionContainer = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
`

const ImageContainer = styled.div`
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 140px;
  flex-shrink: 0;
  cursor: pointer;
`

const Image = styled.img`
  max-width: 100%;
  max-height: 140px;
  object-fit: contain;
  user-select: none;
`

const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
`

const StyledNewTabIcon = styled(NewTabIcon)`
  height: 30px;
  width: 30px;
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
      <IconButton>
        <StyledNewTabIcon />
      </IconButton>
    </a>
  )
}

const StyledClipboardInput = styled(ClipboardInput)`
  margin-left: 10px;
  min-width: 320px;
`

const TagsContainer = styled.div`
  min-width: 100px;
  display: flex;
  flex-wrap: wrap;
  margin: -4px;
  * + & {
    margin-top: 8px;
  }
`

const Tag = styled(Chip)`
  background-color: #8799a4;
  border-radius: 0;
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  height: 21px;
  text-transform: uppercase;
  flex: 0;
  span {
    padding-left: 8px;
    padding-right: 8px;
  }
  margin: 4px;
`

const BrandCard = ({
  affiliation,
  animate,
  brand,
  setIsCustomLinkModalOpen,
  setIsBrandModalOpen,
  setSelectedBrand,
}) => {
  const affiliationUrl = useMemo(() => affiliation && `https://${brand.websiteHostname}/?aftk=${affiliation.token}`, [
    affiliation,
    brand.websiteHostname,
  ])

  const onClickCustomLink = useCallback(
    () => {
      mixpanel.track('Clicked Custom Link', { hostname: window.location.hostname, brand: brand.name })
      setIsCustomLinkModalOpen(true)
      setSelectedBrand(brand)
    },
    [brand, setIsCustomLinkModalOpen, setSelectedBrand]
  )

  const openBrandModal = useCallback(
    () => {
      setIsBrandModalOpen(true)
      setSelectedBrand(brand)
    },
    [brand, setIsBrandModalOpen, setSelectedBrand]
  )

  const onClickBrandLogo = useCallback(
    () => {
      mixpanel.track('Clicked Brand Logo', {
        hostname: window.location.hostname,
        brand: brand.name,
        token: affiliation && affiliation.token,
      })
      openBrandModal()
    },
    [affiliation, brand.name, openBrandModal]
  )

  const onClickPromoteNow = useCallback(
    () => {
      mixpanel.track('Clicked Promote Now', { hostname: window.location.hostname, brand: brand.name })
      openBrandModal()
    },
    [brand.name, openBrandModal]
  )

  const onCopyAffiliateLink = useCallback(text => {
    mixpanel.track('Copied Affiliate Link', { hostname: window.location.hostname, text })
  }, [])

  return (
    <>
      <StyledSection animate={animate}>
        <MainContainer key={brand.id}>
          <ImageAndDescriptionContainer>
            <ImageContainer onClick={onClickBrandLogo}>
              <Image src={brand.logoUrl} />
            </ImageContainer>
            <div>
              {!affiliation && <Typography variant="body2">{brand.description}</Typography>}
              <TagsContainer>
                {brand.tags.split(',').map(tag => (
                  <Tag key={tag} label={tag} size="small" />
                ))}
              </TagsContainer>
            </div>
          </ImageAndDescriptionContainer>
          <Actions>
            <WebsiteButton affiliation={affiliation} websiteHostname={brand.websiteHostname} />
            {affiliation && (
              <StyledClipboardInput
                backgroundColor="#e7ecef"
                onCopy={onCopyAffiliateLink}
                size="large"
                text={affiliationUrl}
              />
            )}
            <div />
            <Button
              color={affiliation ? 'white' : 'primaryGradient'}
              inline
              onClick={affiliation ? onClickCustomLink : onClickPromoteNow}
              size="large"
            >
              {affiliation ? 'Custom link' : 'Promote now'}
            </Button>
          </Actions>
        </MainContainer>
      </StyledSection>
    </>
  )
}

export default BrandCard
