import DescriptionExtra from './description-extra'
import LanguageIcon from '@material-ui/icons/Language'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useMemo } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import Tag from 'shared/tag'
import { BrandLogo } from 'shared/uptous'
import { ReactComponent as FacebookIcon } from 'assets/icons/facebook.svg'
import { ReactComponent as InstagramIcon } from 'assets/icons/instagram.svg'
import { ReactComponent as TwitterIcon } from 'assets/icons/twitter.svg'
import { Typography } from '@material-ui/core'

const StyledSection = styled(Section)`
  @media (min-width: 960px) {
    margin-right: 16px;
  }
`

const Header = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
  overflow: hidden;
  border-radius: 6px 6px 0 0;
  ${({ imgSrc }) =>
    `
    background: ${imgSrc &&
      `url(${imgSrc}) no-repeat center center, `}linear-gradient(45deg, #ccc, rgba(255, 255, 255, 0));
    background-size: cover;
  `}

  @media (min-width: 960px) {
    height: 300px;
  }
`

const MainContainer = styled.div`
  padding: 4px 12px;
`

const Subheader = styled.div`
  padding-left: 14px;
`

const SubheaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`

const ContentContainer = styled.div`
  position: relative;
  font-family: Lato, 'Helvetica', 'Arial', sans-serif;
`

const DescriptionContent = styled.p`
  line-height: 1.2;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`

const SocialLinksContainer = styled.div`
  display: flex;
  margin-left: 8px;
`

const SocialLinkContainer = styled.a`
  padding: 4px;
  font-size: 0;

  svg {
    fill: #999;
    width: 22px;
    height: 22px;
  }

  @media (min-width: 960px) {
    svg {
      width: 20px;
      height: 20px;
    }
  }
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const SocialLink = ({ href, Icon, type, brand }) => {
  const onClick = useCallback(
    () => {
      mixpanel.track(type === 'web' ? 'Visited Brand Website' : 'Visited Brand Social Media', {
        hostname: window.location.hostname,
        brand: brand.name,
        brandId: brand.id,
        linkType: type,
        url: href,
      })
    },
    [brand.id, brand.name, href, type]
  )

  return (
    <SocialLinkContainer href={href} onClick={onClick} rel="noopener noreferrer" target="_blank">
      <Icon />
    </SocialLinkContainer>
  )
}

const Title = ({ brand, titleRef }) => (
  <TitleContainer>
    <Typography ref={titleRef} variant="h4">
      {brand.name}
    </Typography>
    <SocialLinksContainer>
      <SocialLink brand={brand} href={`https://${brand.websiteHostname}`} Icon={LanguageIcon} type="web" />
      {brand.instagramUrl && (
        <SocialLink brand={brand} href={brand.instagramUrl} Icon={InstagramIcon} type="instagram" />
      )}
      {brand.facebookUrl && <SocialLink brand={brand} href={brand.facebookUrl} Icon={FacebookIcon} type="facebook" />}
      {brand.twitterUrl && <SocialLink brand={brand} href={brand.twitterUrl} Icon={TwitterIcon} type="twitter" />}
    </SocialLinksContainer>
  </TitleContainer>
)

const Description = ({
  brand,
  headerRef,
  termsRef,
  termsAndConditionsExpanded,
  onTermsAndConditionsChange,
  setTermsAndConditionsExpanded,
}) => {
  const tags = useMemo(() => brand.positiveImpactAreaList.concat(brand.productCategoryList), [brand])

  return (
    <StyledSection title={<Header imgSrc={brand.headerImageUrl} ref={headerRef} />}>
      <MainContainer>
        <SubheaderContainer>
          <BrandLogo brand={brand} />
          <Subheader>
            <Title brand={brand} />
            <Tags>
              {tags.map(tag => (
                <Tag key={tag} label={tag} />
              ))}
            </Tags>
          </Subheader>
        </SubheaderContainer>
        <ContentContainer>
          <DescriptionContent dangerouslySetInnerHTML={{ __html: brand.fullDescription }} />
          <DescriptionExtra
            brand={brand}
            onTermsAndConditionsChange={onTermsAndConditionsChange}
            setTermsAndConditionsExpanded={setTermsAndConditionsExpanded}
            termsAndConditionsExpanded={termsAndConditionsExpanded}
            termsRef={termsRef}
          />
        </ContentContainer>
      </MainContainer>
    </StyledSection>
  )
}

export default Description
