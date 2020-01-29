import gridImage01 from '../../images/jobs/hero-01.jpg'
import gridImage02 from '../../images/jobs/hero-02.jpg'
import gridImage03 from '../../images/jobs/hero-03.jpg'
import gridImage04 from '../../images/jobs/hero-04.jpg'
import gridImage05 from '../../images/jobs/hero-05.jpg'
import React from 'react'
import Section from '../../components/section'
import styled from 'styled-components'

const HeroImagesContainer = styled.div`
  width: 100%;
  @media (min-width: 1000px) {
    margin: 0 -5px;
    width: auto;
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
  left: 10px;
  right: 10px;
  top: 100px;

  background: #fff;
  padding: 10px;

  @media (min-width: 1000px) {
    max-width: 570px;
    margin: 0;
    top: 160px;
    left: 50%;
    width: 100%;
    right: auto;
    transform: translateX(-50%);
  }
`

const BannerHeader = styled.div`
  text-align: center;
  font-size: 26px;
  color: #111;
  font-weight: 700;
  margin-top: 10px;

  @media (min-width: 1000px) {
    letter-spacing: 1.2px;
    font-size: 36px;
  }
`

const BannerDescription = styled.p`
  color: #111;
  margin: 15px 0 15px;
  font-size: 20px;
  line-height: 22px;
  text-align: center;
  line-height: 1.36;

  @media (min-width: 1000px) {
    font-size: 22px;
    width: 100%;
  }
`

const Banner = ({ data }) => (
  <BannerContainer>
    <BannerHeader>{data.jobs.value.heroHeading}</BannerHeader>
    <BannerDescription dangerouslySetInnerHTML={{ __html: data.jobs.value.heroSubheading }} />
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
  height: 460px;
  font-size: 0;
  justify-content: space-between;
  position: relative;
  width: 100%;

  @media (min-width: 1000px) {
    height: 570px;
  }
`

const MobileImages = () => (
  <MobileImagesContainer>
    <MobileImage src={gridImage01} />
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
          <ImageHalfHeightContainer>
            <Image src={gridImage04} />
          </ImageHalfHeightContainer>
          <ImageHalfHeightContainer>
            <Image src={gridImage02} />
          </ImageHalfHeightContainer>
        </ImageContainer>
        <ImageContainer>
          <Image src={gridImage05} />
        </ImageContainer>
        <ImageContainer>
          <ImageHalfHeightContainer>
            <Image src={gridImage01} />
          </ImageHalfHeightContainer>
          <ImageHalfHeightContainer>
            <Image src={gridImage03} />
          </ImageHalfHeightContainer>
        </ImageContainer>
        <Banner data={data} />
      </MarginContainer>
    </HeroImagesContainer>
  </StyledSection>
)

export default Hero
