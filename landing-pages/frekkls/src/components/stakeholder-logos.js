import React from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'

const sliderSettings = {
  dots: false,
  infinite: false,
  arrows: false,
  speed: 500,
  slidesToShow: 5,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        arrows: false,
        slidesToScroll: 3,
        infinite: false,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        arrows: false,
        slidesToScroll: 2,
        infinite: false,
        dots: true,
      },
    },
  ],
}

const LogoContainer = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  flex: 1;
  height: 3rem;
  margin: 0rem 1rem;
  @media (min-width: 600px) {
    margin: 0rem 3rem;
  }
  @media (min-width: 900px) {
    margin: 0rem 2rem;
  }
`

const Img = styled.img`
  width: 100%;
`

const Logo = ({ src }) => (
  <LogoContainer>
    <Img alt="" src={src} />
  </LogoContainer>
)

const FixedWidthContainer = styled.div`
  @media (min-width: 1200px) {
    width: 1200px;
  }
`

const StakeholderLogos = ({ stakeholders }) =>
  stakeholders.edges.length > 0 && (
    <FixedWidthContainer>
      <Slider {...sliderSettings}>
        {stakeholders.edges.map(stakeholder => (
          <Logo key={stakeholder.node.name} src={stakeholder.node.logo.fixed.src} />
        ))}
      </Slider>
    </FixedWidthContainer>
  )

export default StakeholderLogos
