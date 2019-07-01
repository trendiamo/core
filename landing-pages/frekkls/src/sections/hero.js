import React from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import HeroImg from '../images/hero'
import Section from '../components/section'

const Hero = styled(({ className }) => (
  <Section className={className}>
    <div>
      <div className="left-hero-pad">
        <h2>{'Turn Socials into Sellers.'}</h2>
        <p>{'Integrate people and their content as sellers directly into your shop.'}</p>
        <Button className="js-request-demo" color="#f75c35">
          {'Get Started'}
        </Button>
      </div>
    </div>
    <div>
      <HeroImg />
    </div>
  </Section>
))`
  flex-direction: row;
  background: linear-gradient(to right, #fff 0%, #fff 50%, #f35c39 50%, #f35c39 100%);

  .left-hero-pad {
    padding-left: 4vw;
    padding-right 4vw;
  }

  h2 {
    width: 100%;
    font-size: 6vw;
    font-weight: bold;
    line-height: 1.25;
    margin-bottom: 1.5vh;
  }

  p {
    font-size: 2.1vw;
    line-height: 1.25;
  }

  & > div {
    flex: 1;
  }
`

export default Hero
