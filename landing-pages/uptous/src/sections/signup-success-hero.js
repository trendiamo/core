import React from 'react'
import Section from '../components/section'
import styled from 'styled-components'
import wallImage from '../images/wall.jpg'
import { Link } from 'gatsby'

const HeroImagesContainer = styled.div`
  display: flex;
  height: 550px;
  font-size: 0;
  justify-content: space-between;
  position: relative;
  width: 100%;

  @media (min-width: 1000px) {
    margin: 0 -5px;
    height: 700px;
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
    top: 215px;
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
    letter-spacing: 1.8px;
    font-size: 36px;
    white-space: nowrap;
  }
`

const BannerDescription = styled.div`
  color: #111;
  margin-top: 20px;
  line-height: 1.2;
  font-size: 16px;
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

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
  text-decoration: none;
`

const Banner = () => (
  <BannerContainer>
    <BannerHeader>{'Welcome to the revolution!'}</BannerHeader>
    <BannerDescription>
      {'We’ll keep you closely in the loop for our launch on 2nd of March!'}
      <br />
      {
        'Soon you will receive interesting articles from our magazine about sustainable fashion as well as offers tailored just for you, to help creating a better future together.'
      }
    </BannerDescription>
    <BannerButtonContainer>
      <StyledLink to="/">
        <BannerButton type="submit" value="Continue to website" />
      </StyledLink>
    </BannerButtonContainer>
  </BannerContainer>
)

const EmailConfirmationHero = () => (
  <Section fullWidth>
    <HeroImagesContainer>
      <Image src={wallImage} />
      <Banner />
    </HeroImagesContainer>
  </Section>
)

export default EmailConfirmationHero
