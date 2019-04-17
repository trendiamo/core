import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import { LeftArrow, RightArrow } from '../components/arrows'

import stepArrowDark from '../images/step-arrow-dark.svg'
import stepArrowOrange from '../images/step-arrow-orange.svg'

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

export const SlideNameContainer = styled.div`
  width: 100px;
`

const getSlideName = ({ sliderContent, index }) => sliderContent.edges[index].node.heading

const chooseIcon = ({ sliderContent, index, currentSlideIndex }) =>
  currentSlideIndex === index ? sliderContent.edges[index].node.activeIcon : sliderContent.edges[index].node.icon

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

const CustomPagingFactory = (sliderContent, currentSlideIndex) => {
  const CustomPaging = index => (
    <SlideLabelContainer isSelected={currentSlideIndex === index}>
      <ImagesContainer>
        <IconContainer isLastElement={index === sliderContent.edges.length - 1}>
          <img alt="" src={chooseIcon({ sliderContent, index, currentSlideIndex }).file.url} />
        </IconContainer>
        {currentSlideIndex === index ? (
          <StepArrowOrange isLastElement={index === sliderContent.edges.length - 1} />
        ) : (
          <StepArrowDark isLastElement={index === sliderContent.edges.length - 1} />
        )}
      </ImagesContainer>
      <SlideNameContainer>
        <p>{getSlideName({ sliderContent, index })}</p>
      </SlideNameContainer>
    </SlideLabelContainer>
  )
  return CustomPaging
}

const DefaultCustomPageing = () => <button type="submit" />

const NextArrow = styled(RightArrow)`
  position: absolute;
  top: 470px;
  right: 0px;
`

const PrevArrow = styled(LeftArrow)`
  position: absolute;
  top: 470px;
  left: 0px;
`

export const DetailsContainer = styled.div`
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

export const StyledContainer = styled(Container)`
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

export const SliderContainer = styled.div`
  .slide-container {
    outline: 0;
  }
`

export const Slide = styled.div`
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

export const ImageContainer = styled.div`
  img {
    width: 440px;
  }
`

export const MobileIcon = styled.div`
  margin-bottom: 30px;

  @media (min-width: 900px) {
    display: none;
  }
`

export const sliderSettings = (sliderContent, setCurrentSlideIndex, currentSlideIndex) => {
  return {
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlideIndex(newIndex)
    },
    appendDots: AppendDotsFactory(),
    customPaging: CustomPagingFactory(sliderContent, currentSlideIndex),
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
