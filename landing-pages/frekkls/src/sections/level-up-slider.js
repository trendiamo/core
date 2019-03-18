import React, { useState } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Container from '../components/container'
import Section from '../components/section'

const ScrollBarContainer = styled.div`
  display: block;
  border-radius: 50px;
  position: absolute;
  top: -50px;
  width: 810px;
  left: 50%;
  height: 74px;
  transform: translateX(-50%);

  @media (min-width: 900px) {
    display: block;
    background-color: #f2f4f7;
  }
`

const DotsContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 80px;
  right: 305px;

  @media (min-width: 900px) {
    width: 810px;
    right: 90px;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const SlideLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 74px;
  font-size: 20px;
  font-weight: 500;
  color: ${({ isSelected }) => (isSelected ? '#ffffff' : 'rgba(0, 0, 0, 0.5)')};
  border-radius: 50px;
  white-space: nowrap;
  box-shadow: ${({ isSelected }) => (isSelected ? '2px 9px 14px 0 rgba(255, 104, 63, 0.42)' : 'none')};
  background-image: ${({ isSelected }) => (isSelected ? ' linear-gradient(135deg, #ff843e, #ff5642)' : 'none')};
  width: 201px;
  align-self: center;
`

const LabelContainer = styled.div`
  width: 201px;
  @media (min-width: 900px) {
    height: 74px;
  }
`
const AppendDotsFactory = () => {
  const AppendDots = dots => (
    <ScrollBarContainer style={{ width: '810px' }}>
      <DotsContainer>
        {dots.map(dot => (
          <LabelContainer key={dot.key}>{dot}</LabelContainer>
        ))}
      </DotsContainer>
    </ScrollBarContainer>
  )
  return AppendDots
}

const getSlideName = (levelUpSliderContent, selectedSlide) => {
  return levelUpSliderContent.edges[selectedSlide].node.slideName
}

const CustomPagingFactory = (levelUpSliderContent, currentSlideIndex) => {
  const CustomPaging = index => (
    <SlideLabel isSelected={currentSlideIndex === index}>{getSlideName(levelUpSliderContent, index)}</SlideLabel>
  )
  return CustomPaging
}

const DefaultCustomPageing = () => <button type="submit" />

const sliderSettings = (levelUpSliderContent, setCurrentSlideIndex, currentSlideIndex) => {
  return {
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlideIndex(newIndex)
    },
    appendDots: AppendDotsFactory(),
    customPaging: CustomPagingFactory(levelUpSliderContent, currentSlideIndex),
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          infinite: false,
          dots: true,
          customPaging: DefaultCustomPageing,
        },
      },
    ],
  }
}

const SliderContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  max-height: 1100px;

  .slide-container {
    outline: 0;
  }

  @media (min-width: 900px) {
    margin-top: 100px;
    max-height: 800px;
  }
  @media (min-width: 1200px) {
    margin-top: 100px;
    max-height: 700px;
  }
`

const StyledContainer = styled(Container)`
  text-align: center;
  h1 {
    font-size: 30px;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.7);
  }

  h2 {
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1.5px;
    color: #777;
    text-transform: uppercase;
  }

  h3 {
    font-size: 26px;
    line-height: 1.46;
    color: #171717;
  }
  @media (min-width: 600px) {
    h1 {
      font-size: 42px;
    }
  }
  @media (min-width: 900px) {
    h1 {
      font-size: 46px;
    }
  }
`

const Slide = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 100px;
  @media (min-width: 900px) {
    flex-direction: row;
    margin-top: 100px;
  }
`

const Card = styled.div`
  width: 95%;
  text-align: left;
  padding: 30px;

  box-shadow: 3px 9px 26px 0 rgba(0, 0, 0, 0.13);
  border-radius: 12px;
  position: relative;
  background: #fff;
  z-index: 1;

  p {
    margin-top: 30px;
    margin-bottom: 120px;
    font-size: 18px;
  }

  a {
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
    padding-bottom: 10px;
    border-bottom: solid black 2px;
    position: absolute;
    bottom: 40px;
  }

  @media (min-width: 500px) {
    padding: 60px 80px;
    a {
      bottom: 80px;
    }
  }

  @media (min-width: 600px) {
    width: 80%;

    p {
      font-size: 20px;
    }
  }
  @media (min-width: 900px) {
    padding: 40px 40px;
    width: 50%;
    margin-left: 10px;
  }
  @media (min-width: 1100px) {
    padding: 60px 80px;
  }
`

const ImageContainer = styled.div`
  width: 100%;
  margin-top: 40px;

  display: none;

  @media (min-width: 500px) {
    display: block;
    width: 80%;
  }
  @media (min-width: 700px) {
    position: relative;
    width: 550px;
  }
`

const StyledImage = styled.img`
  width: 100%;
  objectfit: contain;
  @media (min-width: 900px) {
    position: absolute;
    width: 110%;
    right: 20px;
    bottom: -280px;
  }
`

const LevelUpSlider = ({ levelUp, levelUpSliderContent }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  return (
    <Section>
      <StyledContainer>
        <h2>{levelUp.levelUpHeading}</h2>
        <h3>{levelUp.levelUpSubHeading}</h3>
        <SliderContainer>
          <Slider {...sliderSettings(levelUpSliderContent, setCurrentSlideIndex, currentSlideIndex)}>
            {levelUpSliderContent.edges.map(slide => (
              <div className="slide-container" key={slide.node.id}>
                <Slide key={slide.node.id}>
                  <Card>
                    <h1>{slide.node.slideHeading}</h1>
                    <p>{slide.node.slideText.slideText}</p>
                    <Link to="/features">{slide.node.slideCta}</Link>
                  </Card>
                  <ImageContainer>
                    <StyledImage alt="siteTitle" src={slide.node.slideImage.file.url} />
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

export default LevelUpSlider
