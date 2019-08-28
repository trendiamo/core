import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  height: 100%;
`

const Container = styled.div`
  position: relative;
`

const BrandLogoContainer = styled.div`
  border-radius: 8px;
  border: 2px solid #333;
  width: 120px;
  height: 120px;
  background: #fff;
`

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const HeaderContent = styled.div`
  position: absolute;
  bottom: -60px;
  left: 60px;
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
  height: 300px;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #ccc, rgba(255, 255, 255, 0));
`

const SocialLinkContainer = styled.a`
  width: 26px;
  height: 26px;
  & + & {
    margin-left: 10px;
  }
`

const SocialLinksContainer = styled.div`
  position: absolute;
  left: 120px;
  top: 60px;
  padding: 17px;
  display: flex;
`

const SocialLink = ({ brand, type }) => (
  <SocialLinkContainer href={brand[`${type}Url`]} rel="noopener noreferrer" target="_blank">
    <img alt="" src={`/img/icons/${type}.svg`} />
  </SocialLinkContainer>
)

const BrandSocialLinks = ({ brand }) => {
  return (
    <SocialLinksContainer>
      {brand.instagramUrl && <SocialLink brand={brand} type="instagram" />}
      {brand.facebookUrl && <SocialLink brand={brand} type="facebook" />}
      {brand.twitterUrl && <SocialLink brand={brand} type="twitter" />}
    </SocialLinksContainer>
  )
}

const Header = ({ brand }) => {
  return (
    <Container>
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
