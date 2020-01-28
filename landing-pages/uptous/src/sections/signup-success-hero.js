import React from 'react'
import Section from '../components/section'
import styled from 'styled-components'
import waterImage from '../images/about-us/water.jpg'

const HeroImagesContainer = styled.div`
  display: flex;
  height: 400px;
  font-size: 0;
  justify-content: space-between;
  position: relative;
  width: 100%;

  @media (min-width: 1000px) {
    margin: 0 -5px;
    height: 500px;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
`

const BannerContainer = styled.div`
  position: absolute;
  left: 20px;
  right: 20px;
  top: 100px;

  background: #fff;
  padding: 40px 20px;

  @media (min-width: 1000px) {
    max-width: 585px;
    margin: 0;
    top: 90px;
    left: 50%;
    width: 100%;
    right: auto;
    transform: translateX(-50%);
  }
`

const BannerHeader = styled.div`
  text-align: center;
  font-size: 20px;
  color: #111;
  font-weight: 700;
  white-space: wrap;

  @media (min-width: 1000px) {
    font-size: 36px;
    white-space: nowrap;
  }
`

const BannerSubHeader = styled.div`
  text-align: center;
  font-size: 14px;
  color: green;
  white-space: wrap;
  margin-top: 10px;

  @media (min-width: 1000px) {
    font-size: 20px;
    white-space: nowrap;
  }
`

const BannerDescription = styled.div`
  color: #111;
  margin-top: 20px;
  line-height: 1.2;
  font-size: 16px;
  line-height: 22px;

  @media (min-width: 1000px) {
    text-align: center;
  }
`

const BannerButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`

const BannerButton = styled.input`
  appearance: none;
  border: 1px solid #111;
  outline: none;
  background: #111;
  color: #fff;
  font-size: 18px;
  padding: 8px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 3px;
  width: 100%;

  @media (min-width: 1000px) {
    width: auto;
    padding: 8px 90px;
  }
`

const StyledLink = styled.a`
  width: 100%;
  display: flex;
  justify-content: center;
  text-decoration: none;
`

const StyledSection = styled(Section)`
  padding-top: 0;
  @media (min-width: 1000px) {
    padding-top: 0;
  }
`

// The HTTP Links should stay this way because magazine is currently a separate server!
const Banner = ({ data }) => (
  <BannerContainer>
    <BannerHeader>{data.successPage.value.heading}</BannerHeader>
    <BannerSubHeader>{data.successPage.value.indicator}</BannerSubHeader>
    <BannerDescription>
      {data.successPage.value.subHeading1}
      <br />
      {data.successPage.value.subHeading2}
    </BannerDescription>
    <BannerButtonContainer>
      <StyledLink href="https://uptous.co/magazine">
        <BannerButton type="submit" value={data.layout5.value.buttons.continueToMagazine} />
      </StyledLink>
    </BannerButtonContainer>
  </BannerContainer>
)

const EmailConfirmationHero = ({ data }) => (
  <StyledSection fullWidth>
    <HeroImagesContainer>
      <Image src={waterImage} />
      <Banner data={data} />
    </HeroImagesContainer>
  </StyledSection>
)

export default EmailConfirmationHero
