import gridImage01 from '../images/u2u-fashion-01.jpeg'
import gridImage02 from '../images/u2u-fashion-02.jpeg'
import gridImage03 from '../images/u2u-fashion-03.jpg'
import gridImage04 from '../images/u2u-fashion-04.jpg'
import React from 'react'
import Section from '../components/section'
import styled from 'styled-components'

const HeroImagesContainer = styled.div`
  display: flex;
  height: 580px;
  font-size: 0;
  justify-content: space-between;
  position: relative;
  width: 100%;

  @media (min-width: 1000px) {
    margin: 0 -5px;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
`

const ImageContainer = styled.div`
  display: none;

  @media (min-width: 1000px) {
    width: 33%;
    height: 100%;
    margin: 0 5px;
    display: block;
  }
`

const ImageHalfHeightContainer = styled.div`
  height: 50%;
  flex: 1;
  & + & {
    padding: 10px 0 0;
  }
`

const BannerContainer = styled.div`
  position: absolute;
  left: 20px;
  right: 20px;
  top: 100px;

  background: #fff;
  padding: 20px;

  @media (min-width: 1000px) {
    height: 320px;
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
  margin-top: 10px;
  white-space: wrap;

  @media (min-width: 1000px) {
    font-size: 36px;
    white-space: nowrap;
  }
`

const BannerDescription = styled.div`
  color: #111;
  margin-top: 15px;
  line-height: 1.2;
  font-size: 16px;
  line-height: 22px;

  @media (min-width: 1000px) {
    width: 100%;
    text-align: center;
  }
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

const BannerInput = styled.input`
  font-family: 'Avenir', sans-serif;
  appearance: none;
  border: 1px solid #111;
  width: 100%;
  font-size: 18px;
  outline: none;
  padding: 10px;
  padding-top: 12px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  border-radius: 0px;

  @media (min-width: 1000px) {
    width: 90%;
  }
`

const BannerButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

const BannerFooterText = styled.div`
  font-size: 12px;
  text-align: center;
  margin-top: 20px;

  a {
    padding: 0 5px;
    color: #111;
    font-weight: 900;
  }
`

const MailchimpForm = () => (
  <form
    action="https://uptous.us4.list-manage.com/subscribe/post?u=45912ce59aa8ef47e7126f2fa&amp;id=33d3cabba0"
    method="post"
    name="mc-embedded-subscribe-form"
    noValidate
    target="_blank"
  >
    <BannerInput name="EMAIL" placeholder="Email address" required type="email" />
    <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
      <input defaultValue="" name="b_45912ce59aa8ef47e7126f2fa_33d3cabba0" tabIndex="-1" type="text" />
    </div>
    <BannerButtonContainer>
      <BannerButton name="subscribe" type="submit" value="Sign me up" />
    </BannerButtonContainer>
    <BannerFooterText>
      {'By clicking this button you subscribe to our newsletter and agree to our'}
      <a href="/terms-and-conditions">{'Terms and Conditions'}</a>
    </BannerFooterText>
  </form>
)

const Banner = () => (
  <BannerContainer>
    <BannerHeader>{"Don't miss out on a revolution"}</BannerHeader>
    <BannerDescription>
      {'Be the first to discover and shop fashion sustainably with up to '}
      <b>{'-30%'}</b>{' '}
      {
        'discounts. Join the worlds first impact driven shopping club and enjoy highly tailored offers while helping to create a better future, together.'
      }
    </BannerDescription>
    <MailchimpForm />
  </BannerContainer>
)

const MobileImagesContainer = styled.div`
  position: relative;
  width: 100%;

  display: block;
  @media (min-width: 1000px) {
    display: none;
  }
`

const MobileImage = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: block;

  object-fit: cover;
`

const MobileImages = () => (
  <MobileImagesContainer>
    <MobileImage src={gridImage04} />
  </MobileImagesContainer>
)

const Hero = () => (
  <Section fullWidth>
    <HeroImagesContainer>
      <MobileImages />
      <ImageContainer>
        <Image src={gridImage01} />
      </ImageContainer>
      <ImageContainer>
        <Image src={gridImage02} />
      </ImageContainer>
      <ImageContainer>
        <ImageHalfHeightContainer>
          <Image src={gridImage03} />
        </ImageHalfHeightContainer>
        <ImageHalfHeightContainer>
          <Image src={gridImage04} />
        </ImageHalfHeightContainer>
      </ImageContainer>
      <Banner />
    </HeroImagesContainer>
  </Section>
)

export default Hero
