import React, { useState } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'

import Section from '../components/section'
import {
  DetailsContainer,
  ImageContainer,
  MobileIcon,
  Slide,
  SliderContainer,
  sliderSettings,
  StyledContainer,
} from '../components/slider-components'

const StyledSection = styled(Section)`
  padding-bottom: 0px !important;
`

const BridgeSlider = ({ bridgeSlider, bridgeSliderContent }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  return (
    <StyledSection>
      <StyledContainer>
        <h3>{bridgeSlider.bridgeSliderHeading}</h3>
        <h2>{bridgeSlider.bridgeSliderSubHeading}</h2>
        <SliderContainer>
          <Slider {...sliderSettings(bridgeSliderContent, setCurrentSlideIndex, currentSlideIndex)}>
            {bridgeSliderContent.edges.map(slide => (
              <div className="slide-container" key={slide.node.id}>
                <Slide key={slide.node.id}>
                  <MobileIcon>
                    <img alt="" src={slide.node.activeIcon.file.url} />
                  </MobileIcon>
                  <DetailsContainer>
                    <h3>{slide.node.heading}</h3>
                    <h2>{slide.node.subHeading}</h2>
                    <p>{slide.node.mainText.mainText}</p>
                  </DetailsContainer>
                  <ImageContainer>
                    <img alt="" src={slide.node.image.fixed.src} />
                  </ImageContainer>
                </Slide>
              </div>
            ))}
          </Slider>
        </SliderContainer>
      </StyledContainer>
    </StyledSection>
  )
}

export default BridgeSlider
