import Img from 'gatsby-image'
import React, { useState } from 'react'
import Slider from 'react-slick'

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

const CustomerJourneySlider = ({ customerJourneySlider, customerJourneySliderContent }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  return (
    <Section>
      <StyledContainer>
        <h3>{customerJourneySlider.customerJourneySliderHeading}</h3>
        <h2>{customerJourneySlider.customerJourneySliderSubHeading}</h2>
        <SliderContainer>
          <Slider {...sliderSettings(customerJourneySliderContent, setCurrentSlideIndex, currentSlideIndex)}>
            {customerJourneySliderContent.edges.map(slide => (
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
                    <Img alt="" fixed={slide.node.image.fixed} />
                  </ImageContainer>
                </Slide>
              </div>
            ))}
          </Slider>
        </SliderContainer>
      </StyledContainer>
    </Section>
  )
}

export default CustomerJourneySlider
