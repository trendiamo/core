import coffee from '../../images/about-us/coffee.jpg'
import girl from '../../images/about-us/girl.jpg'
import grass from '../../images/about-us/grass.jpg'
import programmers from '../../images/about-us/programmers.jpg'
import React from 'react'
import Section from '../../components/section'
import styled from 'styled-components'
import water from '../../images/about-us/water.jpg'

const Container = styled.div`
  display: flex;
  height: 410px;
  font-size: 0;
  justify-content: space-between;
  position: relative;
  width: 100%;

  @media (min-width: 1000px) {
    height: 580px;
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
    height: 230px;
    max-width: 550px;
    margin: 0;
    top: 180px;
    left: 50%;
    width: 100%;
    right: auto;
    transform: translateX(-50%);
  }
`

const BannerHeader = styled.div`
  text-align: center;
  font-size: 28px;
  color: #111;
  font-weight: 700;
  margin-top: 10px;
  white-space: wrap;

  @media (min-width: 1000px) {
    letter-spacing: 1.8px;
    font-size: 36px;
    white-space: nowrap;
  }
`

const BannerDescription = styled.div`
  color: #111;
  font-size: 22px;
  line-height: 1.2;
  text-align: center;
  margin: 24px auto 0;

  @media (min-width: 1000px) {
    font-size: 26px;
  }
`

const Banner = () => (
  <BannerContainer>
    <BannerHeader>{'We are on a mission'}</BannerHeader>
    <BannerDescription>
      {'Because the united buying power of all of us consumers, will change how businesses'}
      <br />
      {'have to act - it’s up to us.'}
    </BannerDescription>
  </BannerContainer>
)

const StyledSection = styled(Section)`
  flex-direction: column;
`

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
    <MobileImage src={water} />
  </MobileImagesContainer>
)

const MainImages = () => (
  <StyledSection fullWidth>
    <Container>
      <MobileImages />
      <ImageContainer>
        <ImageHalfHeightContainer>
          <Image src={water}></Image>
        </ImageHalfHeightContainer>
        <ImageHalfHeightContainer>
          <Image src={girl}></Image>
        </ImageHalfHeightContainer>
      </ImageContainer>
      <ImageContainer>
        <Image src={programmers}></Image>
      </ImageContainer>
      <ImageContainer>
        <ImageHalfHeightContainer>
          <Image src={grass}></Image>
        </ImageHalfHeightContainer>
        <ImageHalfHeightContainer>
          <Image src={coffee}></Image>
        </ImageHalfHeightContainer>
      </ImageContainer>
      <Banner />
    </Container>
  </StyledSection>
)

export default MainImages
