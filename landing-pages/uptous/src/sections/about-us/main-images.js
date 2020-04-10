import coffee from '../../images/about-us/kite.jpg'
import girl from '../../images/about-us/compass.jpg'
import grass from '../../images/about-us/music.jpg'
import programmers from '../../images/about-us/hiking.jpg'
import React from 'react'
import Section from '../../components/section'
import styled from 'styled-components'
import water from '../../images/about-us/space.jpg'

const Container = styled.div`
  display: flex;
  height: 410px;
  font-size: 0;
  justify-content: space-between;
  position: relative;
  width: 100%;

  @media (min-width: 1000px) {
    height: 570px;
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
  padding: 10px;

  @media (min-width: 1000px) {
    padding: 40px 50px 60px;
    max-width: 560px;
    margin: 0;
    top: 180px;
    left: 50%;
    width: 100%;
    right: auto;
    transform: translateX(-50%);
  }
`

const BannerHeader = styled.div`
  color: #111;
  font-weight: 900;
  font-size: 26px;
  text-align: center;

  @media (min-width: 1000px) {
    font-size: 36px;
    text-align: center;
  }
`

const BannerDescription = styled.div`
  color: #111;
  font-size: 22px;
  line-height: 1.36;
  text-align: center;
  margin: 40px auto 0;

  @media (min-width: 1000px) {
    font-size: 22px;
  }
`

const Banner = ({ data }) => (
  <BannerContainer>
    <BannerHeader>{data.aboutUs.mainBannerHeading}</BannerHeader>
    <BannerDescription>to reverse-engineer the fashion industry together with you, to work demand first - supply second</BannerDescription>
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

const MainImages = ({ data }) => (
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
      <Banner data={data} />
    </Container>
  </StyledSection>
)

export default MainImages
