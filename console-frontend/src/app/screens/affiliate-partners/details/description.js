import DescriptionExtra from './description-extra'
import LanguageIcon from '@material-ui/icons/Language'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useMemo } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import Tag from 'shared/form-elements/tag'
import { BrandLogo } from 'shared/uptous'
import { ReactComponent as FacebookIcon } from 'assets/icons/facebook.svg'
import { ReactComponent as InstagramIcon } from 'assets/icons/instagram.svg'
import { ReactComponent as TwitterIcon } from 'assets/icons/twitter.svg'
import { Typography } from '@material-ui/core'

const StyledSection = styled(Section)`
  @media (min-width: 960px) {
    margin-right: 14px;
  }
`

const HeaderContainer = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #ccc, rgba(255, 255, 255, 0));
  @media (min-width: 960px) {
    height: 300px;
  }
`

const Header = styled.img`
  width: 100%;
  object-fit: cover;
  height: 100%;
  user-select: none;
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

const DescriptionContent = styled.div``

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

const SocialLinks = ({ brand }) => {
  return (
    <SocialLinksContainer>
      <SocialLink brand={brand} href={`https://${brand.websiteHostname}`} Icon={LanguageIcon} type="web" />
      {brand.instagramUrl && (
        <SocialLink brand={brand} href={brand.instagramUrl} Icon={InstagramIcon} type="instagram" />
      )}
      {brand.facebookUrl && <SocialLink brand={brand} href={brand.facebookUrl} Icon={FacebookIcon} type="facebook" />}
      {brand.twitterUrl && <SocialLink brand={brand} href={brand.twitterUrl} Icon={TwitterIcon} type="twitter" />}
    </SocialLinksContainer>
  )
}

const Description = ({ brand }) => {
  const tags = useMemo(() => brand.positiveImpactAreaList.concat(brand.productCategoryList), [brand])

  return (
    <StyledSection
      title={
        <HeaderContainer>
          <Header src={brand.headerImageUrl} />
        </HeaderContainer>
      }
    >
      <SubheaderContainer>
        <BrandLogo brand={brand} />
        <Subheader>
          <TitleContainer>
            <Typography variant="h5">{brand.name}</Typography>
            <SocialLinks brand={brand} />
          </TitleContainer>
          <Tags>
            {tags.map(tag => (
              <span key={tag}>
                <Tag color="primary" label={tag} />
              </span>
            ))}
          </Tags>
        </Subheader>
      </SubheaderContainer>
      <ContentContainer>
        <DescriptionContent dangerouslySetInnerHTML={{ __html: brand.fullDescription }} />
        <DescriptionExtra brand={brand} />
      </ContentContainer>
    </StyledSection>
  )
}

export default Description
