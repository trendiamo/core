import React from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'

import { LeftArrow, RightArrow } from '../components/arrows'

const StyledRightArrow = styled(RightArrow)`
  position: absolute;
  top: 260px;
  right: 0px;
`

const StyledLeftArrow = styled(LeftArrow)`
  position: absolute;
  top: 260px;
  left: 0px;
`

const NextArrow = ({ onClick }) => <StyledRightArrow onClick={onClick} />
const PrevArrow = ({ onClick }) => <StyledLeftArrow onClick={onClick} />

const sliderSettings = {
  dots: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: false,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 800,
      settings: {
        swipeToSlide: true,
        arrows: false,
        infinite: false,
        dots: true,
      },
    },
  ],
}

const SliderContainer = styled.div``

const FeatureSlide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  h2 {
    font-size: 26px;
    font-weight: normal;
    line-height: 1.2;
  }

  p {
    font-size: 18px;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.7);
  }

  img {
    width: 100%;
  }

  @media (min-width: 800px) {
    img {
      width: 700px;
    }
    h2 {
      font-size: 32px;
    }
  }
`

const SectionLabel = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  text-align: center;
`

const FeatureSlideContainer = styled.div`
  outline: 0;
`

const FeaturesSlider = ({ featuresSlider, featuresSliderContent }) => (
  <Section>
    <Container>
      <SliderContainer>
        <SectionLabel>{featuresSlider.featuresSliderHeading}</SectionLabel>
        <Slider {...sliderSettings}>
          {featuresSliderContent.edges.map(feature => (
            <FeatureSlideContainer key={feature.node.id}>
              <FeatureSlide>
                <h2>{feature.node.slideHeader}</h2>
                <p>{feature.node.slideText.slideText}</p>
                <div>
                  <img alt="" src={feature.node.slideImage.file.url} />
                </div>
              </FeatureSlide>
            </FeatureSlideContainer>
          ))}
        </Slider>
      </SliderContainer>
    </Container>
  </Section>
)

export default FeaturesSlider
