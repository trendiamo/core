import React from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'

import { LeftArrow, RightArrow } from '../components/arrows'

const NextArrow = ({ onClick }) => <RightArrow onClick={onClick} />
const PrevArrow = ({ onClick }) => <LeftArrow onClick={onClick} />

const sliderSettings = {
  dots: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 620,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows: false,
        infinite: false,
        dots: true,
      },
    },
    {
      breakpoint: 930,
      settings: {
        swipeToSlide: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        dots: true,
      },
    },
  ],
}

const SliderContainer = styled.div`
  width: 100%;
  @media (min-width: 380px) {
    width: 350px;
  }
  @media (min-width: 620px) {
    width: 600px;
  }
  @media (min-width: 1130px) {
    width: 800px;
  }
`

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    white-space: nowrap;
  }
  @media (min-width: 930px) {
    flex-direction: row;
    h3 {
      white-space: nowrap;
      margin: 0px 100px 140px 0px;
    }
  }
`

const Portrait = styled.div`
  float: left;
  width: 360px;
  padding: 6px;
  text-align: left;

  img {
    width: 100%;
    object-fit: contain;
  }
  h4 {
    font-size: 24px;
    margin: 10px 0px;
  }
  h5 {
    font-size: 19px;
    color: #617283;
  }
`

const AboutTeam = ({ aboutPortraits, teamMembers }) => (
  <Section>
    <StyledContainer>
      <h3>{aboutPortraits.teamSectionHeading}</h3>
      <SliderContainer>
        <Slider {...sliderSettings}>
          {teamMembers.edges.map(e => (
            <Portrait key={e.node.id}>
              <img alt="" src={e.node.profilePicture.fixed.src} />
              <h4>{e.node.profileName}</h4>
              <h5>{e.node.jobTitle}</h5>
            </Portrait>
          ))}
        </Slider>
      </SliderContainer>
    </StyledContainer>
  </Section>
)

export default AboutTeam
