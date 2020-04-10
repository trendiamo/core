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
  padding: 10px;

  @media (min-width: 1000px) {
    padding: 45px 45px 50px;
    max-width: 560px;
    margin: 0;
    top: 50%;
    left: 50%;
    width: 100%;
    right: auto;
    transform: translate(-50%, -50%);
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
  margin: 50px auto 0;

  @media (min-width: 1000px) {
    font-size: 22px;
  }
`

const Banner = ({ data }) => (
  <BannerContainer>
    <BannerHeader>You are at the center of what we are creating</BannerHeader>
    <BannerDescription>Because your input acts as a blueprint for what we are building.</BannerDescription>
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
