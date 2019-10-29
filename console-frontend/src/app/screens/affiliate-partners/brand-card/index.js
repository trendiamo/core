import Description from './description'
import Footer from './footer'
import mixpanel from 'ext/mixpanel'
import omit from 'lodash.omit'
import React, { useCallback, useMemo } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import { ReactComponent as NewTabIcon } from 'assets/icons/new-tab.svg'
import { Typography } from '@material-ui/core'

const StyledSection = styled(props => <Section {...omit(props, ['animate'])} />)`
  transition: all 1s 0.2s;
  ${({ animate }) =>
    !animate &&
    `
    opacity: 0;
    transform: translateY(10px);
  `}
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180px;
  flex-shrink: 0;
  cursor: pointer;
  overflow: hidden;
`

const Image = styled.img`
  object-fit: cover;
  user-select: none;
  width: 100%;
  height: 100%;
`

const MainContainer = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
`

const LogoContainer = styled.div`
  border: 2px solid #e7ecef;
  width: 110px;
  height: 110px;
  background: #fff;
  position: absolute;
  top: -68px;
  left: 0;
  @media (min-width: 960px) {
    top: -70px;
  }
`

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
`

const Subheader = styled.div`
  padding-left: 124px;
  min-height: 52px;
  @media (min-width: 960px) {
    padding-left: 126px;
    min-height: 56px;
  }
`

const BrandName = styled(Typography)`
  margin: 0;
`

const Logo = ({ brand }) => (
  <LogoContainer>
    <LogoImage src={brand.logoUrl} />
  </LogoContainer>
)

const StyledNewTabIcon = styled(NewTabIcon)`
  height: 20px;
  width: 20px;
`

const IconLink = styled.a`
  font-size: 0;
  vertical-align: middle;
  display: inline-block;
  margin-left: 10px;
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
    <IconLink href={url} onClick={onClick} rel="noopener noreferrer" target="_blank">
      <StyledNewTabIcon />
    </IconLink>
  )
}

const BrandCard = ({
  affiliation,
  animate,
  brand,
  setIsCustomLinkModalOpen,
  setIsBrandModalOpen,
  setSelectedBrand,
  interests,
  removeInterest,
}) => {
  const onClickCustomLink = useCallback(
    () => {
      mixpanel.track('Clicked Custom Link', {
        hostname: window.location.hostname,
        brandId: brand.id,
        brand: brand.name,
      })
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
        brandId: brand.id,
        brand: brand.name,
        token: affiliation && affiliation.token,
      })
      openBrandModal()
    },
    [affiliation, brand.id, brand.name, openBrandModal]
  )

  const interest = useMemo(() => interests && interests.find(interest => interest.brand.id === brand.id), [
    brand.id,
    interests,
  ])

  return (
    <StyledSection
      animate={animate}
      key={brand.id}
      title={
        <ImageContainer onClick={onClickBrandLogo}>
          <Image src={brand.headerImageUrl} />
        </ImageContainer>
      }
    >
      <MainContainer>
        <Logo brand={brand} />
        <Subheader>
          <BrandName variant="h5">
            {brand.name}
            <WebsiteButton affiliation={affiliation} brand={brand} />
          </BrandName>
        </Subheader>
        <Description brand={brand} />
        <Footer
          affiliation={affiliation}
          brand={brand}
          interest={interest}
          onClickCustomLink={onClickCustomLink}
          openBrandModal={openBrandModal}
          removeInterest={removeInterest}
        />
      </MainContainer>
    </StyledSection>
  )
}

export default BrandCard
