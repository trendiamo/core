import peopleHands from '../../images/about-us/people-hands.jpg'
import React from 'react'
import Section from '../../components/section'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  display: flex;
  height: 500px;
  font-size: 0;
  justify-content: space-between;

  @media (min-width: 1000px) {
    height: 700px;
    margin: 0 -5px;
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
  padding: 20px;

  @media (min-width: 1000px) {
    height: 330px;
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
  text-align: center;
  font-size: 28px;
  color: #111;
  font-weight: 700;
  margin-top: 10px;
  white-space: wrap;

  @media (min-width: 1000px) {
    margin-top: 30px;
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
    margin: 38px auto 0;
    font-size: 28px;
    width: 466px;
  }
`

const Banner = ({ data }) => (
  <BannerContainer>
    <BannerHeader>{data.aboutUs.middleBannerHeading}</BannerHeader>
    <BannerDescription>{data.aboutUs.middleBannerSubHeading}</BannerDescription>
  </BannerContainer>
)

const StyledSection = styled(Section)`
  flex-direction: column;
`

const MainImages = ({ data }) => (
  <StyledSection fullWidth>
    <Container>
      <Image src={peopleHands}></Image>
      <Banner data={data} />
    </Container>
  </StyledSection>
)

export default MainImages
