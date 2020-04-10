import backgroundImage from '../images/astronaut.jpg'
import borderImage from '../images/space_button.png'
import React, { useCallback, useMemo } from 'react'
import Section from '../components/section'
import styled from 'styled-components'
import { pushToGA } from '../utils'

const HeroImagesContainer = styled.div`
  width: 100%;
  @media (min-width: 1000px) {
    margin: 0 -5px;
    width: auto;
    border: 1px solid #1d6e94;
    padding: 8px;
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
    width: 100%;
    height: 100%;
    margin: 0;
    display: block;
  }
`

const BannerContainer = styled.div`
  position: absolute;
  left: 20px;
  right: 20px;
  top: calc(50% - 180px);

  border: 1px solid #1d6e94;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  color: white;

  @media (min-width: 1000px) {
    height: auto;
    max-width: 585px;
    margin: 0;
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
  color: white;
  line-height: 24px;

  @media (min-width: 1000px) {
    font-size: 32px;
    line-height: 36px;
  }
`

const BannerDescription = styled.div`
  color: white;
  margin-top: 15px;
  line-height: 1.2;
  font-size: 20px;
  line-height: 22px;
  text-align: center;

  @media (min-width: 1000px) {
    width: 100%;
  }
`

const BannerButton = styled.input`
  appearance: none;
  outline: none;
  height: 46px;
  width: 100%;
  border: 1px solid transparent;
  border-image: url('${borderImage}');
  border-image-slice: 100 100 fill;
  border-image-width: 100px;
  background: transparent;
  color: white;
  font-size: 18px;
  padding: 8px;
  font-weight: 700;
  cursor: pointer;

  @media (min-width: 1000px) {
    width: auto;
    padding: 8px 90px;
    width: 90% !important;
  }
`

const BannerInput = styled.input`
  font-family: 'Avenir', sans-serif;
  appearance: none;
  border: 1px solid #1d6e94;
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
  background: rgba(5, 38, 62, 0.58);
  color: white;

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
    color: white;
    font-weight: 900;
  }
`

const MailchimpForm = ({ data }) => {
  const onSubscribeClick = useCallback(() => {
    pushToGA({
      event: 'buttonClick',
      eventCategory: 'CTAs',
      eventAction: 'Button Click',
      eventLabel: 'Hero Sign me up',
    })
  }, [])

  const termsAndConditionsText = useMemo(
    () =>
      data.layout.value.texts.byClickingThisButton.replace(
        '[:termsAndConditions]',
        `<a href="/terms-and-conditions" >${data.layout.value.legalPageNames.termsAndConditions}</a>`
      ),
    [data.layout.value.legalPageNames.termsAndConditions, data.layout.value.texts.byClickingThisButton]
  )

  return (
    <form
      action="https://uptous.us4.list-manage.com/subscribe/post?u=45912ce59aa8ef47e7126f2fa&amp;id=33d3cabba0"
      method="post"
      name="mc-embedded-subscribe-form"
      noValidate
      target="_blank"
    >
      <BannerInput name="EMAIL" placeholder={data.layout.value.texts.emailInputPlaceholder} required type="email" />
      <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
        <input defaultValue="" name="b_45912ce59aa8ef47e7126f2fa_33d3cabba0" tabIndex="-1" type="text" />
      </div>
      <BannerButtonContainer>
        <BannerButton
          name="subscribe"
          onClick={onSubscribeClick}
          type="submit"
          value={"Enable The New System"}
        />
      </BannerButtonContainer>
      <BannerFooterText dangerouslySetInnerHTML={{ __html: termsAndConditionsText }}></BannerFooterText>
    </form>
  )
}

const Banner = ({ data }) => (
  <BannerContainer>
    <BannerHeader>Let's equip the crew of #spaceshipearth with life sustaining fashion together, with you.</BannerHeader>
    <BannerDescription dangerouslySetInnerHTML={{ __html: "We are launching the first produce on demand fashion platform soon. Subscribe to stay in the loop!" }} />
    <MailchimpForm data={data} />
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

const MarginContainer = styled.div`
  display: flex;
  height: 540px;
  font-size: 0;
  justify-content: space-between;
  position: relative;
  width: 100%;
`

const MobileImages = () => (
  <MobileImagesContainer>
    <MobileImage src={backgroundImage} />
  </MobileImagesContainer>
)

const StyledSection = styled(Section)`
  padding-top: 0;
  @media (min-width: 1000px) {
    padding-top: 0;
  }
`

const Hero = ({ data }) => (
  <StyledSection fullWidth>
    <HeroImagesContainer>
      <MarginContainer>
        <MobileImages />
        <ImageContainer>
          <Image src={backgroundImage} />
        </ImageContainer>
        <Banner data={data} />
      </MarginContainer>
    </HeroImagesContainer>
  </StyledSection>
)

export default Hero
