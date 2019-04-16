import React from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'

import { LeftArrow, RightArrow } from '../components/arrows'

const NextArrow = styled(RightArrow)`
  position: absolute;
  top: 170px;
  right: 0px;
`

const PrevArrow = styled(LeftArrow)`
  position: absolute;
  top: 170px;
  left: 0px;
`

const sliderSettings = {
  dots: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 900,
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

const DiscoverProductSlide = styled.div`
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

  @media (min-width: 400px) {
    img {
      width: 350px;
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

const DiscoverProductContainer = styled.div`
  outline: 0;
`

const DiscoverProduct = ({ discoverProductsSliderContent }) => (
  <Section>
    <Container>
      <SliderContainer>
        <SectionLabel>{'Discover Our Product'}</SectionLabel>
        <Slider {...sliderSettings}>
          {discoverProductsSliderContent.edges.map(e => (
            <DiscoverProductContainer key={e.node.id} style={{ outline: 0 }}>
              <DiscoverProductSlide>
                <h2>{e.node.slideMainText}</h2>
                <p>{e.node.slideSecondaryText.slideSecondaryText}</p>
                <div>
                  <img alt="" src={e.node.slideImage.fixed.src} />
                </div>
              </DiscoverProductSlide>
            </DiscoverProductContainer>
          ))}
        </Slider>
      </SliderContainer>
    </Container>
  </Section>
)

export default DiscoverProduct
