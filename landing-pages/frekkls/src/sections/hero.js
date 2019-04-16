import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;

  p {
    margin-bottom: 50px;
  }
`

const ImageContainer = styled.div`
  width: 160%;
  display: flex;
  flex-direction: column;
  margin-top: 80px;

  img {
    width: 100%;
    object-fit: contain;
  }

  @media (min-width: 900px) {
    width: 100%;
  }
`

const Hero = styled(({ className, hero }) => (
  <Section className={className}>
    <StyledContainer>
      <h2>{hero.openerHeading}</h2>
      <p>{hero.openerSubHeading}</p>
      <div
        className="email-input email-input-1"
        data-email-label={hero.openerEmailLabel}
        data-submit-text={hero.openerEmailCta}
      />
      <ImageContainer>
        <Img alt="" fluid={hero.openerImage.fluid} imgStyle={{ objectFit: 'contain', objectPosition: '50% 100%' }} />
      </ImageContainer>
    </StyledContainer>
  </Section>
))`
  padding-top: 0;
  padding-bottom: 0;
  text-align: center;
  @media (min-width: 900px) {
    padding-top: 0;
    padding-bottom: 0;
  }

  ${Container} {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3rem;
    padding-bottom: 0;

    @media (min-width: 900px) {
    }
  }

  .email-input {
    width: 100%;
  }

  h2 {
    width: 100%;
    font-size: 32px;
    line-height: 42px;
  }

  p {
    font-size: 21px;
    line-height: 1.67;
    color: #565656;
    max-width: 945px;
  }

  @media (min-width: 900px) {
    h2 {
      font-size: 36px;
    }
  }
`

export default Hero
