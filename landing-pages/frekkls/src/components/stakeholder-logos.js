import Img from 'gatsby-image'
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
          <div key={stakeholder.node.name}>
            <Img
              alt=""
              fluid={stakeholder.node.logo.fluid}
              imgStyle={{ objectFit: 'contain' }}
              style={{ maxWidth: 160, margin: '0 auto' }}
            />
          </div>
        ))}
      </Slider>
    </FixedWidthContainer>
  )

export default StakeholderLogos
