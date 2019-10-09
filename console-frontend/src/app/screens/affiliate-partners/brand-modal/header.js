import LanguageIcon from '@material-ui/icons/Language'
import React from 'react'
import styled from 'styled-components'
import { ReactComponent as FacebookIcon } from 'assets/icons/facebook.svg'
import { ReactComponent as InstagramIcon } from 'assets/icons/instagram.svg'
import { ReactComponent as TwitterIcon } from 'assets/icons/twitter.svg'

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  height: 100%;
  user-select: none;
`

const Container = styled.div`
  position: relative;
`

const BrandLogoContainer = styled.div`
  border-radius: 8px;
  border: 2px solid #e7ecef;
  width: 120px;
  height: 120px;
  background: #fff;
`

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
`

const HeaderContent = styled.div`
  position: absolute;
  bottom: -60px;
  left: 22px;
  @media (min-height: 960px) {
    left: 60px;
  }
`

const BrandLogo = ({ brand }) => {
  return (
    <BrandLogoContainer>
      <Logo src={brand.logoUrl} />
    </BrandLogoContainer>
  )
}

const HeaderImageContainer = styled.div`
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

const SocialLinksContainer = styled.div`
  position: absolute;
  left: 130px;
  top: 60px;
  padding: 17px 0;
  display: flex;
`

const SocialLinkContainer = styled.a`
  padding: 10px;
  font-size: 0;
  svg {
    fill: black;
    width: 22px;
    height: 22px;
  }
  @media (min-width: 960px) {
    svg {
      width: 26px;
      height: 26px;
    }
  }
`

const SocialLink = ({ href, Icon }) => (
  <SocialLinkContainer href={href} rel="noopener noreferrer" target="_blank">
    <Icon />
  </SocialLinkContainer>
)

const BrandSocialLinks = ({ brand }) => {
  return (
    <SocialLinksContainer>
      <SocialLink href={`https://${brand.websiteHostname}`} Icon={LanguageIcon} />
      {brand.instagramUrl && <SocialLink href={brand.instagramUrl} Icon={InstagramIcon} />}
      {brand.facebookUrl && <SocialLink href={brand.facebookUrl} Icon={FacebookIcon} />}
      {brand.twitterUrl && <SocialLink href={brand.twitterUrl} Icon={TwitterIcon} />}
    </SocialLinksContainer>
  )
}

const Header = ({ brand, headerRef }) => {
  return (
    <Container ref={headerRef}>
      <HeaderImageContainer>
        <Image src={brand.headerImageUrl} />
      </HeaderImageContainer>
      <HeaderContent>
        <BrandLogo brand={brand} />
        <BrandSocialLinks brand={brand} />
      </HeaderContent>
    </Container>
  )
}

export default Header
