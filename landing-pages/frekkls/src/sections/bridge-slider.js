import React, { useState } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'
import { LeftArrow, RightArrow } from '../components/arrows'

import stepArrowDark from '../images/step-arrow-dark.svg'
import stepArrowOrange from '../images/step-arrow-orange.svg'

const StepArrowOrange = styled.img.attrs({
  src: stepArrowOrange,
})`
  position: absolute;
  top: 10px;
  left: 110%;
  transform: translateX(-50%);
  margin-top: 50px;
  width: 30px;
  display: ${({ isLastElement }) => (isLastElement ? 'none' : 'block')};
`

const StepArrowDark = styled.img.attrs({
  src: stepArrowDark,
})`
  position: absolute;
  top: 10px;
  left: 110%;
  transform: translateX(-50%);
  margin-top: 50px;
  width: 30px;
  display: ${({ isLastElement }) => (isLastElement ? 'none' : 'block')};
`

const StyledRightArrow = styled(RightArrow)`
  position: absolute;
  top: 470px;
  right: 0px;
`

const StyledLeftArrow = styled(LeftArrow)`
  position: absolute;
  top: 470px;
  left: 0px;
`

const NextArrow = ({ onClick }) => <StyledRightArrow onClick={onClick} />
const PrevArrow = ({ onClick }) => <StyledLeftArrow onClick={onClick} />

const ScrollBarContainer = styled.div`
  position: absolute;
  top: 20px;
  height: 100px;
  width: 100%;
`

const DotsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -10px;

  @media (min-width: 900px) {
    width: 95%;
    left: -20px;
    top: 0px;
    left: 46%;
    transform: translateX(-50%);
    justify-content: space-between;
  }
  @media (min-width: 1150px) {
    width: 100%;
    justify-content: space-around;
  }
`

const AppendDotsFactory = () => {
  const AppendDots = dots => (
    <ScrollBarContainer>
      <DotsContainer>
        {dots.map(dot => (
          <div key={dot.key}>{dot}</div>
        ))}
      </DotsContainer>
    </ScrollBarContainer>
  )
  return AppendDots
}

const SlideLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 130px;
  text-align: left;

  p {
    color: ${({ isSelected }) => (isSelected ? '#ff683f' : 'rgba(0, 0, 0, 0.7)')};
    font-weight: ${({ isSelected }) => (isSelected ? '500;' : 'normal')};
  }
`

const ImagesContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const IconContainer = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  img {
    width: ${({ isLastElement }) => (isLastElement ? '80%' : '90%')};
  }
`

const SlideNameContainer = styled.div`
  width: 100px;
`

const getSlideName = (bridgeSliderContent, index) => {
  return bridgeSliderContent.edges[index].node.heading
}

const CustomPagingFactory = (bridgeSliderContent, currentSlideIndex) => {
  const CustomPaging = index => (
    <SlideLabelContainer isSelected={currentSlideIndex === index}>
      <ImagesContainer>
        <IconContainer isLastElement={index === bridgeSliderContent.edges.length - 1}>
          <img
            alt=""
            src={
              currentSlideIndex === index
                ? bridgeSliderContent.edges[index].node.activeIcon.file.url
                : bridgeSliderContent.edges[index].node.icon.file.url
            }
          />
        </IconContainer>
        {currentSlideIndex === index ? (
          <StepArrowOrange isLastElement={index === bridgeSliderContent.edges.length - 1} />
        ) : (
          <StepArrowDark isLastElement={index === bridgeSliderContent.edges.length - 1} />
        )}
      </ImagesContainer>
      <SlideNameContainer>
        <p>{getSlideName(bridgeSliderContent, index)}</p>
      </SlideNameContainer>
    </SlideLabelContainer>
  )
  return CustomPaging
}

const DefaultCustomPageing = () => <button type="submit" />

const sliderSettings = (bridgeSliderContent, setCurrentSlideIndex, currentSlideIndex) => {
  return {
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlideIndex(newIndex)
    },
    appendDots: AppendDotsFactory(),
    customPaging: CustomPagingFactory(bridgeSliderContent, currentSlideIndex),
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          infinite: true,
          dots: true,
          customPaging: DefaultCustomPageing,
        },
      },
    ],
  }
}

const StyledContainer = styled(Container)`
  text-align: center;

  h3 {
    font-size: 18px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.5);
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  h2 {
    font-size: 32px;
    color: rgba(0, 0, 0, 0.9);
  }
`

const SliderContainer = styled.div`
  .slide-container {
    outline: 0;
  }
`

const Slide = styled.div`
  margin-top: 60px;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: 900px) {
    flex-direction: row;
    margin-top: 200px;
    max-height: 940px;
  }
`

const DetailsContainer = styled.div`
  text-align: left;

  h3 {
    font-size: 18px;
    font-weight: bold;
    color: #ff683f;
    letter-spacing: 1px;
  }

  h2 {
    font-size: 32px;
    color: rgba(0, 0, 0, 0.9);
  }

  p {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.7);
  }

  @media (min-width: 900px) {
    margin-left: 80px;
    padding-right: 100px;
  }
`

const ImageContainer = styled.div`
  img {
    width: 440px;
  }
`

const MobileIcon = styled.div`
  margin-bottom: 30px;

  @media (min-width: 900px) {
    display: none;
  }
`

const BridgeSlider = ({ bridgeSlider, bridgeSliderContent }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  return (
    <Section>
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
                    <img alt="" src={slide.node.image.file.url} />
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

export default BridgeSlider
